FROM alpine
RUN apk --no-cache add git openssl ca-certificates sudo py-pip python-dev libffi-dev openssl-dev gcc libc-dev make
RUN wget https://github.com/cdr/code-server/releases/download/2.1523-vsc1.38.1/code-server2.1523-vsc1.38.1-alpine-x86_64.tar.gz -qO /tmp/code-server2.1523-vsc1.38.1-alpine-x86_64.tar.gz
RUN tar -xzf /tmp/code-server2.1523-vsc1.38.1-alpine-x86_64.tar.gz -C /tmp
RUN mv /tmp/code-server2.1523-vsc1.38.1-alpine-x86_64/code-server /usr/local/bin
RUN export DEMYX_DOCKER_BINARY=$(wget -O - https://api.github.com/repos/docker/docker-ce/releases/latest | grep '"name":' | awk -F '[:]' '{print $2}' | sed -e 's/"//g' | sed -e 's/,//g' | sed -e 's/ //g' | sed -e 's/\r//g') && \ 
  wget https://download.docker.com/linux/static/stable/x86_64/docker-"$DEMYX_DOCKER_BINARY".tgz -qO /tmp/docker-"$DEMYX_DOCKER_BINARY".tgz && \
  tar -xzf /tmp/docker-"$DEMYX_DOCKER_BINARY".tgz -C /tmp
RUN mv /tmp/docker/docker /usr/local/bin/docker-bin
RUN echo '#!/bin/sh' >> /usr/local/bin/docker
RUN echo 'sudo /usr/local/bin/docker-bin "$@"' >> /usr/local/bin/docker
RUN chmod +x /usr/local/bin/docker
RUN rm -rf /tmp/*
RUN rm -rf /var/cache/apk/*
RUN pip install docker-compose
FROM mhart/alpine-node:latest

FROM alpine
COPY --from=0 /etc/sudoers /etc/sudoers
COPY --from=1 /usr/lib/libgcc* /usr/lib/libstdc*  /usr/lib/
COPY --from=0 /usr/lib/sudo /usr/lib/sudo 
COPY --from=0 /usr/lib/python2.7 /usr/lib/python2.7
COPY --from=0 /usr/lib/libpcre2* /usr/lib/libcurl.so.4* /usr/lib/libnghttp2* /usr/lib/libpython* /usr/lib/
COPY --from=1 /usr/lib/node_modules /usr/lib/node_modules
COPY --from=1 /usr/bin/node /usr/bin/
COPY --from=0 /usr/bin/git* /usr/bin/openssl /usr/bin/sudo /usr/bin/docker-compose /usr/local/bin/docker /usr/bin/python2 /usr/bin/python2.7 /usr/bin/
COPY --from=0 /usr/local/bin/docker-bin  /usr/local/bin/docker-bin
RUN mv /usr/bin/docker-compose /usr/bin/docker-compose-bin
RUN echo '#!/bin/sh' >> /usr/bin/docker-compose
RUN echo 'sudo /usr/bin/docker-compose-bin "$@"' >> /usr/bin/docker-compose
RUN chmod +x /usr/bin/docker
RUN chmod +x /usr/bin/docker-compose
RUN ln -s /usr/lib/node_modules/npm/bin/npm-cli.js /usr/bin/npm
COPY --from=0 /usr/local/bin/code-server /usr/local/bin/
COPY --from=0 /usr/share/git-core /usr/share/git-core
COPY --from=0 /usr/libexec/git-core /usr/libexec/git-core
COPY --from=0 /etc/ca-certificates /etc/ca-certificates
COPY --from=0  /usr/share/ca-certificates /usr/share/ca-certificates
COPY --from=0 /etc/ssl /etc/ssl


RUN addgroup -g 1000 -S vs-code
RUN adduser -u 1000 -D -S -G vs-code vs-code
RUN echo vs-code:vs-code | chpasswd
RUN sed -i "s|/home/vs-code:/sbin/nologin|/home/vs-code:/bin/sh|g" /etc/passwd
RUN mkdir -p /home/vs-code/.code/data/User
RUN mkdir /home/vs-code/Projects
RUN chown -R vs-code:vs-code /home/vs-code
RUN echo "vs-code ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

EXPOSE 8080
WORKDIR /home/vs-code

USER vs-code

ENV DOCKER_HOST=/var/run/docker.sock

CMD [ "/usr/local/bin/code-server", "/home/vs-code/Projects", "--user-data-dir=/home/vs-code/.code/data", "--extensions-dir=/home/vs-code/.code/extensions" ]