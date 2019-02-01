FROM node:carbon

# Install any needed packages

#Bundle image
COPY . .

RUN npm rebuild

# Make port 80 available to the world outside this container
EXPOSE 3016

# Run npm when the container launches
CMD ["npm","run","dev"]
