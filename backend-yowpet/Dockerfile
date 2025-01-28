# Etapa 1: Construir la aplicación con Maven y Java 17
FROM maven:3.8.4-openjdk-17-slim AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY . .

# Ejecutar Maven para construir la aplicación (sin ejecutar tests)
RUN mvn clean install -DskipTests

# Etapa 2: Crear la imagen de producción usando OpenJDK 17 JDK
FROM openjdk:17-jdk-slim

# Establecer el directorio de trabajo en la imagen de producción
WORKDIR /app

# Copiar el archivo JAR generado desde la etapa de construcción
COPY --from=builder /app/target/*.jar app.jar

# Exponer el puerto 8080 en el que Spring Boot escucha
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]