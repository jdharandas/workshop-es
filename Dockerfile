FROM node:10.15-jessie
ARG NODE_ENV
EXPOSE 8080

RUN apt-get update && \
    apt-get install --assume-yes mysql-client gzip unzip zip

# Install kubectl
ADD https://storage.googleapis.com/kubernetes-release/release/v1.8.1/bin/linux/amd64/kubectl /usr/local/bin/kubectl
RUN chmod +x /usr/local/bin/kubectl

# Install and cache node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install --quiet \
    && mkdir -p /usr/src/app/ \
    && mv /tmp/node_modules /usr/src/app/

COPY . /usr/src/app/

WORKDIR /usr/src/app

ENV NODE_ENV ${NODE_ENV:-production}
CMD ["npm", "start"]

