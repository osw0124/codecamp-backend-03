FROM node:14

WORKDIR /myfolder/

COPY ./package.json /myfolder
COPY ./yarn.lock /myfolder
RUN yarn install

COPY . /myfolder
#CMD로 실행하기 중요!
# CMD yarn start:dev
RUN yarn build
CMD yarn start:prod