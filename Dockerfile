FROM node:20
WORKDIR /usr/scr/app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=3000;
ENV MODEL_URL=https://storage.googleapis.com/submision-bucket/%20model-in-prod/model.json
CMD ["npm","start"]