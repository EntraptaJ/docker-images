FROM alpine:3.10

ENV NGINX_VERSION=1.16.1

ENV BUILD_PKGS="build-base linux-headers openssl-dev pcre-dev wget zlib-dev cmake perl go gcc musl-dev curl"
ENV RUNTIME_PKGS="ca-certificates openssl pcre zlib tzdata git" 

RUN apk --no-cache add ${BUILD_PKGS} ${RUNTIME_PKGS}
RUN curl https://sh.rustup.rs -sSf | \
  sh -s -- --default-toolchain nightly -y
ENV PATH=/root/.cargo/bin:$PATH
WORKDIR /tmp
RUN wget https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz
RUN tar xzf nginx-${NGINX_VERSION}.tar.gz
RUN git clone --recursive https://github.com/cloudflare/quiche
WORKDIR /tmp/nginx-${NGINX_VERSION}  
RUN patch -p01 < ../quiche/extras/nginx/nginx-1.16.patch
RUN ./configure \
  --prefix=/etc/nginx \
  --sbin-path=/usr/sbin/nginx \
  --conf-path=/etc/nginx/nginx.conf \
  --error-log-path=/var/log/nginx/error.log \
  --http-log-path=/var/log/nginx/access.log \
  --pid-path=/var/run/nginx.pid \
  --lock-path=/var/run/nginx.lock \
  --http-client-body-temp-path=/var/cache/nginx/client_temp \
  --http-proxy-temp-path=/var/cache/nginx/proxy_temp \
  --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp \
  --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp \
  --http-scgi-temp-path=/var/cache/nginx/scgi_temp \
  --user=nginx \
  --group=nginx \
  --with-http_ssl_module \
  --with-http_realip_module \
  --with-http_addition_module \
  --with-http_sub_module \
  --with-http_dav_module \
  --with-http_flv_module \
  --with-http_mp4_module \
  --with-http_gunzip_module \
  --with-http_gzip_static_module \
  --with-http_random_index_module \
  --with-http_secure_link_module \
  --with-http_stub_status_module \
  --with-http_auth_request_module \
  --with-mail \
  --with-mail_ssl_module \
  --with-file-aio \
  --with-threads \
  --with-stream \
  --with-stream_ssl_module \
  --with-stream_realip_module \
  --with-http_slice_module \
  --with-http_v3_module \
  --with-openssl=../quiche/deps/boringssl \
  --with-quiche=../quiche \
  --with-http_v2_module
RUN  make && make install

RUN  sed -i -e 's/#access_log  logs\/access.log  main;/access_log \/dev\/stdout;/' -e 's/#error_log  logs\/error.log  notice;/error_log stderr notice;/' /etc/nginx/nginx.conf
RUN addgroup -S nginx
RUN adduser -D -S -h /var/cache/nginx -s /sbin/nologin -G nginx nginx
RUN  rm -rf /tmp/*
RUN  apk del ${BUILD_PKGS}
RUN  rm -rf /var/cache/apk/*

FROM alpine:3.10
COPY --from=0 /etc/nginx /etc/nginx
COPY --from=0 /usr/sbin/nginx /usr/sbin/nginx
COPY --from=0 /usr/lib/libpcre.so.1 /usr/lib/libpcre.so.1
RUN addgroup -S nginx
RUN adduser -D -S -h /var/cache/nginx -s /sbin/nologin -G nginx nginx
COPY files/index.html /etc/nginx/html/
COPY files/nginx.conf /etc/nginx/nginx.conf
VOLUME ["/var/cache/nginx", "/var/log/nginx"]

EXPOSE 80 443

CMD ["nginx"]