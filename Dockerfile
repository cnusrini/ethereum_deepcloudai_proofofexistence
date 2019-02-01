FROM node:carbon

# Install any needed packages

#Bundle image
COPY . .
WORKDIR ./ethereum_proofofExistence
RUN npm install

# Make port 80 available to the world outside this container
EXPOSE 3009

# Run npm when the container launches
CMD ["npm","run", "dev"]
