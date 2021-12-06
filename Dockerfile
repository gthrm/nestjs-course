FROM node:14-alpine
WORKDIR /opt/app

# add package.json only and install
ADD package.json package.json
RUN npm install

# copy other and build
ADD . .
RUN npm run build

# clear dev dep
RUN npm prune --production

# prod
CMD ["node", "./dist/main.js"]