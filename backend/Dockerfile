FROM openjdk:17-jdk

WORKDIR /app
COPY target/backend-*.jar app.jar
EXPOSE 8080

CMD ["java", "-jar", "app.jar", "--server.address=0.0.0.0"]