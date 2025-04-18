# Use OpenJDK 21 base image for building the project
FROM openjdk:21-jdk-slim AS build

# Install Maven
RUN apt-get update && apt-get install -y maven

# Copy project files to the container
COPY . .

# Run Maven build
RUN mvn clean package -DskipTests

# Use OpenJDK 21 base image for runtime (or Java 17 if needed)
FROM openjdk:21-jdk-slim

# Copy the built JAR file from the build stage (correct the JAR file name here)
COPY --from=build /target/AuthApplication-0.0.1-SNAPSHOT.jar demo.jar

# Expose the application port
EXPOSE 8080

# Set the entry point to run the JAR file
ENTRYPOINT ["java", "-jar", "demo.jar"]
