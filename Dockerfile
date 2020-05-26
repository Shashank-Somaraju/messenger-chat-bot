# My first docker file.
#BASE IMAGE
FROM node:11-alpine

# RUN commands inside BASE IMAGE
RUN mkdir -p /var/www 
RUN apk add --no-cache git
RUN apk add --no-cache openssh

#CLONE git repo inside BASE IMAGE
#RUN git clone https://github.com/Alakazam03/demo-app-nodejs.git /myapp/
ADD . /var/www


#COPY cloned repo inside BASE IMAGE to another directory at BASE IMAGE
#RUN cp -R /myapp/* /var/www

RUN echo "Tryin to build demo application"
# COPY . /var/www 
WORKDIR /var/www
RUN npm install

ENTRYPOINT ["node","index.js"]
