FROM mhart/alpine-node:latest
WORKDIR /app
COPY tsconfig.json package.json package-lock.json index.ts ./
RUN npm ci && NODE_ENV=production npm run build

FROM mhart/alpine-node:latest
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --prod

FROM alpine:3.10
ENV NODE_ENV=production
COPY --from=1 /app/node_modules/ /app/node_modules/
COPY --from=1 /usr/bin/node /usr/bin/
COPY --from=1 /usr/lib/node_modules/ /usr/lib/node_modules/
COPY --from=1 /usr/lib/libgcc* /usr/lib/libstdc* /usr/lib/
WORKDIR /app
COPY --from=0 /app/index.js ./index.js
CMD NODE_ENV=production node /app/index.js
