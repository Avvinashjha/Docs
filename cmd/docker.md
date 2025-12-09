Docker Setup

which docker #Viewing the path of where docker is being placed.
systemctl status docker #To view the status of docker.
systemctl enable docker #To enable docker.
systemctl start docker #Starting up docker and viewing logs.

Running Containers

docker run <container name> #To run a container.
usermod -aG docker #Adding a user to the docker group.
docker images #Lists out all the images that have been download.
docker search <container> #Searching up a container.
docker pull <image> #To download an image.
docker ps #List all the docker containers taht are currently running.
docker ps -a #List all containers that were running and ones that exited.
-it #Interactive container.
docker run -it <container> /bin/bash #A command shell attached to the system.
docker run -it <container> #An alternative to the /bin/bash command.
CTRL + D #To disconnect from the container.

Making Containers Persist

docker run -it -d <container> #Puts the container running in the background and activates daemon mode.
docker attach <container ID> #To attach the specific container.
docker attach <container ID, first character> #An alternative to attach a container without pasting the full ID.
CTRL + P + Q #Container is stll running and works like an escape key. Back to the local command shell.

Accessing Containerized Applications

docker run -it -d -p <port number> <container> #Accessing the specific container using a port.
docker run -it -d --restart unless-stopped -p <port number> <container> #Run the specified docker iamge in the background, exposing a port on the host, and ensure it automatically restarts unless manually stopped.
ip addr show #Display ip address details.
ip a #An alternative to displaying ip address details.
docker stop dc #Initiate a graceful shutdown for the running container ID.
docker stop <container ID> #Stops the container using ID.
docker stop db #Stops the container.
docker attach db #Look at the running process's output and potentially interact with it.

Creating Images

/etc/init.d/<web server> status #To check the running status of a specific service or daemon. 
docker commit <container ID> <name/calling the image>:<version:wq number> #Creates a docker image and returns a sha256 key.
docker commit --change='ENTRYPOINT ["webserverctl", "-DFOREGROUND"]' <container ID> <name/calling the image>:<version number> #Changing the entrypoint to the designated webserver.
docker build -t <tag/name>:<version number> . #To build a new image in the local directory and label it with a specific name and version.
docker rm <container ID> #To delete a container.
docker rmi <container ID> #To remove the image.

Inside the Dockerfile

Dockerfile #Creating a docker file.
FROM <container image> #Base Image for the image you're building with.
MAINTAINER <name, email address> #To specify the author or maintainer of the Dockerfile.
ARG <distro_FRONTEND=noninteractive> #To skip prompts.
RUN #Execute any commands while the image is being built.
ENTRYPOINT #To run as an executable or a specific application.
