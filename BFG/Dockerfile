FROM docker.pkg.github.com/kristianfjones/docker-images/java:alpine
RUN wget -O  bfg.jar https://repo1.maven.org/maven2/com/madgag/bfg/1.13.0/bfg-1.13.0.jar
ENTRYPOINT ["java", "-jar", "bfg.jar"]