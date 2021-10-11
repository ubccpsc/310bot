FROM node:16-alpine

ENV LOG_LEVEL=INFO

WORKDIR /tmp

RUN apk add --no-cache \
        sudo \
        curl \
        build-base \
        g++ \
        libpng \
        libpng-dev \
        jpeg-dev \
        pango-dev \
        cairo-dev \
        giflib-dev \
        py-pip

COPY ./src          ./src
COPY ./test         ./test
COPY ./package.json ./package.json
COPY tsconfig.json  ./
COPY yarn.lock      ./

RUN yarn install
RUN yarn tsc

# Simplest way I can think of to keep a single
# Dockerfile and run the tests from in the container
# is to just leave to ts files in the prod image

CMD ["node", "dist/App.js"]
