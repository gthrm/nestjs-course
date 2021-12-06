FROM node:14-alpine
WORKDIR /opt/app

# add package.json only and install
RUN npm i -g @nestjs/cli
ADD package.json package.json
RUN npm install

# copy other and build
ADD . .
RUN npm run build

# clear dev dep
RUN npm prune --production

# prod
CMD ["node", "./dist/main.js"]

# next run: docker build --tag my_api ./Dockerfile