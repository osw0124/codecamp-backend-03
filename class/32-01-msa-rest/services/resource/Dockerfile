FROM node:14

WORKDIR /resource-service/

COPY ./package.json /resource-service
COPY ./yarn.lock /resource-service
RUN yarn install

COPY . /resource-service
#CMD로 실행하기 중요!
CMD yarn start:dev