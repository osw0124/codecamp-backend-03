FROM node:14

WORKDIR /api-gateway/

COPY ./package.json /api-gateway
COPY ./yarn.lock /api-gateway
RUN yarn install

COPY . /api-gateway
#CMD로 실행하기 중요!
CMD yarn start:dev