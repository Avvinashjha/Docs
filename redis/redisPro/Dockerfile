# Build stage
FROM maven:3.8-openjdk-18-slim AS build
WORKDIR /app
COPY . .
RUN mvn clean package

# Run stage
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/redisPro-0.0.1-SNAPSHOT.jar  todoList.jar
EXPOSE 9000
ENTRYPOINT ["java", "-jar", "todoList.jar"]