FROM node:16-alpine

WORKDIR /app
# COPY next.config.js ./next.config.js
# COPY pages ./pages
# COPY public ./public
# COPY styles ./styles
# COPY components ./components

COPY . /app

RUN npm install









EXPOSE 9999

ENV PORT 9999

CMD npm run dev
