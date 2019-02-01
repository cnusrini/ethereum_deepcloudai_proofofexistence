FROM node:carbon

# Copy the current directory contents into the container at /app
# COPY package*.json ./

# Install any needed packages

#Bundle image
COPY . .
WORKDIR ./client
RUN npm install

# Make port 80 available to the world outside this container
EXPOSE 3007

# Run npm when the container launches
CMD ["npm","run", "start"]
