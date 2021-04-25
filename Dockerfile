FROM node:current-alpine

WORKDIR /usr/app

COPY . .

ARG REACT_APP_TRIAL_SHOP_API_URL
ENV REACT_APP_TRIAL_SHOP_API_URL=$REACT_APP_TRIAL_SHOP_API_URL

RUN npm install && \
    npm run build && \
    npm install -g serve

EXPOSE 5000

ENTRYPOINT ["serve", "-s", "build"]
