# Use OpenJDK 21 base image
FROM openjdk:21-jdk-slim AS build

# Install Maven
RUN apt-get update && apt-get install -y maven

# Copy project files to the container
COPY . .

# Run Maven build
RUN mvn clean package -DskipTests

# Use OpenJDK 17 for runtime (or you can use OpenJDK 21 if you need that)
FROM openjdk:21-jdk-slim

# Copy the built JAR file from the build stage
COPY --from=build /target/demo-0.0.1-SNAPSHOT.jar demo.jar

# Expose the application port
EXPOSE 8080

# Set the entry point to run the JAR file
ENTRYPOINT ["java", "-jar", "demo.jar"]
