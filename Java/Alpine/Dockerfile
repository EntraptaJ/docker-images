FROM alpine:3.10
RUN apk add --no-cache  openjdk8-jre

FROM alpine:3.10
COPY --from=0 ["/usr/lib", "/usr/lib"]
COPY --from=0 ["/usr/lib/jvm/java-1.8-openjdk/jre/lib/amd64/jli/libjli.so", "/lib/"]
RUN ln -s /usr/lib/jvm/default-jvm/jre/bin/java /usr/bin/java