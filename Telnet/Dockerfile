FROM alpine:3.10
RUN apk add --no-cache busybox-extras

FROM alpine:3.10
COPY --from=0 /usr/bin/telnet /usr/bin/telnet