FROM node:12.19.0

# Create app directory
RUN mkdir -p /usr/src/dome-api
WORKDIR /usr/src/dome-api

# Install app dependencies
COPY package.json /usr/src/dome-api/
RUN npm install

# Bundle app source
COPY . /usr/src/dome-api

EXPOSE 9000
CMD [ "npm", "start" ]

