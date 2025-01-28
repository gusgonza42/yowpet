# Use OpenJDK as the base image
FROM openjdk:21-jdk-slim

#Copy the built Jar File from the target directory to the container
COPY target/backend-yowpet-0.0.1-SNAPSHOT.jar backend-yowpet-0.0.1-SNAPSHOT.jar

#Expose the desired port
EXPOSE 3000

# Run the HAR file
ENTRYPOINT ["java", "-jar", "/backend-yowpet-0.0.1-SNAPSHOT.jar"]