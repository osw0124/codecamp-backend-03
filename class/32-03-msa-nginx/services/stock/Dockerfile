FROM node:14

WORKDIR /stock-service/

COPY ./package.json /stock-service
COPY ./yarn.lock /stock-service
RUN yarn install

COPY . /stock-service
#CMD로 실행하기 중요!
CMD yarn start:dev