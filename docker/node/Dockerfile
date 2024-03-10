###
# Base stage
###
FROM node:20 AS base

RUN apt-get update && \
    apt-get install -y \
      wget \
      htop \
      procps \
      git \
      build-essential

###
# Development stage
###
FROM base AS develop

WORKDIR /var/www/html

USER node
