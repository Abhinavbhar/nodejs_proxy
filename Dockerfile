FROM node:18-alpine

# Expose application ports (documentation only - use -p with docker run)
EXPOSE 8080 3000

WORKDIR /app

# Copy package files first for optimal caching
COPY ./backend/package*.json ./
RUN npm install --production

# Copy start.sh and set permissions
COPY ./backend/start.sh .
RUN chmod +x start.sh

# Copy remaining application files
COPY ./backend .

# Run the script using sh explicitly (Alpine doesn't have bash by default)
CMD ["sh", "./start.sh"]