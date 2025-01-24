FROM node:18
COPY /backend app
RUN npm install
RUN chmod +x /app/start.sh
CMD [ "/start.sh" ]