# Use OpenJDK 21 base image for building the project
FROM openjdk:21-jdk-slim AS build

# Install Maven and required font libraries
RUN apt-get update && apt-get install -y \
    maven \
    libfreetype6 \
    fontconfig \
    && rm -rf /var/lib/apt/lists/*

# Copy project files to the container
COPY . .

# Run Maven build
RUN mvn clean package -DskipTests

# Use OpenJDK 21 base image for runtime
FROM openjdk:21-jdk-slim

# Install required libraries for font rendering in CAPTCHA
RUN apt-get update && apt-get install -y \
    libfreetype6 \
    fontconfig \
    && rm -rf /var/lib/apt/lists/*

# Copy the built JAR file from the build stage
COPY --from=build /target/AuthApplication-0.0.1-SNAPSHOT.jar demo.jar

# Expose the application port
EXPOSE 8080

# Set the entry point to run the JAR file
ENTRYPOINT ["java", "-jar", "demo.jar"]
