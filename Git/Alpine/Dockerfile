FROM alpine:3.10
RUN apk add --no-cache git

FROM alpine:3.10
COPY --from=0 ["/usr/bin/git*", "/usr/bin/"]
COPY --from=0 ["/usr/lib/libpcre*", "/usr/lib/libnghttp2*", "/usr/lib/libexpat*", "/usr/lib/libcurl.so.*", "/usr/lib/"]
COPY --from=0 ["/usr/share/git-core", "/usr/share/git-core"]
COPY --from=0 ["/usr/libexec/git-core", "/usr/libexec/git-core"]
COPY --from=0 ["/etc/ssl", "/etc/ssl"]