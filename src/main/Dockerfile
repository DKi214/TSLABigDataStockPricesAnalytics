FROM openjdk:17
WORKDIR /app
EXPOSE 8080
COPY src/build/*.jar ./app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
