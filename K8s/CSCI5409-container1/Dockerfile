# Use an official Node runtime as a parent image
FROM node:14

ENV PORT ${PORT}
ENV CONTAINER_2_ENDPOINT ${CONTAINER_2_ENDPOINT}
ENV FILE_DIR ${FILE_DIR}

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install dependencies
RUN npm install express body-parser axios

# Make port 6000 available to the world outside this container
EXPOSE 6000

# Run app.js when the container launches
CMD ["node", "app.js"]
