FROM node:13.10-alpine3.11

ENV PATH "/root/.local/bin:$PATH"
WORKDIR /src/app

COPY ./ /src
RUN cd /src && npm install

CMD ["npm", "start"]