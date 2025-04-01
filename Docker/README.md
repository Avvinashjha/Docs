# What is Docker?

Docker is a platform that enables developers to automate the deployment, scaling, and management of applications inside lightweight, portable containers. Containers are isolated environments that package an application and its dependencies, ensuring consistency across different environments (e.g., development, testing, production).

`Docker is like a lightweight virtual machine that allows you to package your application with all its dependencies, ensuring it runs consistently across different environments.`



**Key benefits of Docker:**

- **Portability:** Applications run the same way regardless of the host system.
- **Isolation:** Containers are isolated from each other and the host system.
- **Efficiency:** Containers share the host OS kernel, making them lightweight and fast.
- **Scalability:** Easily scale applications by running multiple container instances.

Note: Install Docker Desktop on your machine to get started.

**Understand Basic Docker Concepts**    

- **Image:** A read-only template with instructions for creating a container (e.g., nginx, ubuntu).
- **Container:** A runnable instance of an image.
- **Dockerfile:** A text file with instructions to build a custom image.
- **Registry:** A repository for Docker images (e.g., Docker Hub).

## Run First Container

```bash
docker run hello-world
```

**Docker Commands**

- `docker run`: Run a container from an image.
- `docker build`: Build an image from a Dockerfile.
- `docker pull`: Pull an image from a registry.
- `docker push`: Push an image to a registry.
- `docker images`: List all images.
- `docker ps`: List all running containers.
- `docker stop`: Stop a running container.
- `docker rm`: Remove a container.
- `docker rmi`: Remove an image.


**Dockerfile Commands**

- `FROM`: Specify the base image.
- `RUN`: Execute a command in the container.
- `CMD`: Specify the command to run when the container starts.
- `EXPOSE`: Specify the port(s) that the container will listen on.
- `COPY`: Copy files from the host to the container.
- `VOLUME`: Create a mount point for the container.
- `ENV`: Set environment variables.
- `ENTRYPOINT`: Specify the entry point for the container.


**Dockerfile Best Practices**

- Use multi-stage builds to keep the image size small.
- Minimize the number of layers in the image.
- Use build arguments to pass configuration to the Dockerfile.
- Use a `.dockerignore` file to exclude files from the build context.



## 1. Crreate a Custom Image

- Create a Dockerfile
    ```bash
    mkdir my-flask-app
    cd my-flask-app
    ```

- Create a Dockerfile

    ```bash
    touch Dockerfile
    ```

- Add the following code to the Dockerfile

    ```bash
    #Use Python 3.9-slim as the base image
    FROM python:3.9-slim

    #Set the working directory to /app
    WORKDIR /app

    #Copy the current directory contents into the container at /app
    COPY . .

    #Run the command to start the Flask application
    CMD ["python", "app.py"]
    ```

- Ceate a simple Flask application

    ```bash
    touch app.py
    ```

- Add the following code to the app.py file

    ```bash
    from flask import Flask
    app = Flask(__name__)

    @app.route('/')
    def hello_world():
        return 'Hello, World!'
    ```

- Create a requirements.txt file

    ```bash
    touch requirements.txt
    ```

- Add the following code to the requirements.txt file

    ```bash
    Flask==2.3.2
    ```

- Build the image

    ```bash
    docker build -t my-flask-app .
    ```

- Run the container

    ```bash
    docker run -p 5000:5000 my-flask-app
    ```

- Access the application

    ```bash
    http://localhost:5000
    ```


## Example 2: Create a node js application

- Create a Dockerfile

    ```bash
    mkdir my-node-app
    cd my-node-app
    ```

- Create a Dockerfile

    ```bash
    touch Dockerfile
    ```

- Add the following code to the Dockerfile

    ```bash
    FROM node:18-slim
    WORKDIR /app
    COPY . .
    CMD ["node", "index.js"]
    ```

- Create a simple node js application

    ```bash
    touch index.js
    ```


- Add the following code to the index.js file

    ```bash
    console.log('Hello, World!');
    ```


- Build the image

    ```bash
    docker build -t my-node-app .
    ```


- Run the container

    ```bash
    docker run -p 3000:3000 my-node-app
    ```


- Access the application

    ```bash
    http://localhost:3000
    ```


