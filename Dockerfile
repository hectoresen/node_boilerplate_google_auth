# Install dependencies and build
FROM public.ecr.aws/docker/library/node:18.13.0-buster-slim AS dist

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./.npmrc ./

RUN npm install

COPY ./pi/ ./

RUN npm run build
RUN npm run serve

# Install dependencies
FROM public.ecr.aws/docker/library/node:18.13.0-buster-slim AS node_modules

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./.npmrc ./

RUN npm install

# Copy dist and node_modules from previous steps
FROM public.ecr.aws/docker/library/node:18.13.0-buster-slim

ARG PORT

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --from=dist /usr/src/app/dist /usr/src/app/dist
COPY --from=dist /usr/src/app/package*.json /usr/src/app/
COPY --from=node_modules /usr/src/app/node_modules /usr/src/app/node_modules

EXPOSE $PORT

CMD [ "npm", "run", "start:prod" ]
