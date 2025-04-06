# Build Stage
FROM maven:3.8-openjdk-18-slim AS build
WORKDIR /app
COPY . .
RUN mvn clean package

# Run Stage
FROM openjdk:17-jdk-slim
WORKDIR /app

COPY --from=build /app/target/redisPro-0.0.1-SNAPSHOT.jar todoList.jar
COPY wait-for-it.sh .
RUN chmod +x wait-for-it.sh

EXPOSE 9000

ENTRYPOINT ["./wait-for-it.sh", "redis:6379", "--", "java", "-jar", "todoList.jar"]