FROM alpine:3.10
RUN apk add curl

FROM alpine:3.10
COPY --from=0 ["/usr/bin/curl", "/usr/bin/"]
COPY --from=0 ["/usr/lib/libpcre*", "/usr/lib/libnghttp2*", "/usr/lib/libcurl*", "/usr/lib/"]
COPY --from=0 ["/etc/ssl", "/etc/ssl"]