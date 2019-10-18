FROM mhart/alpine-node:12
WORKDIR /app
RUN apk add --no-cache python \
        make \
        g++ \ 
		&& npm_config_user=root npm i -g renovate

FROM alpine:3.9
ENV NODE_ENV=production
RUN apk add git
COPY --from=0 /usr/bin/node /usr/bin/
COPY --from=0 /usr/lib/node_modules/ /usr/lib/node_modules/
COPY --from=0 /usr/lib/libgcc* /usr/lib/libstdc* /usr/lib/
ENTRYPOINT [ "/usr/lib/node_modules/renovate/dist/renovate.js" ]