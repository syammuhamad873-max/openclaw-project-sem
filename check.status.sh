#!/bin/bash

echo "Docker containers:"
docker ps

echo ""
echo "Docker services:"
if [ -f "docker-compose.yml" ] || [ -f "docker-compose.yaml" ]; then
    docker compose ps
else
    echo "No docker-compose.yml or docker-compose.yaml found in the current directory."
    echo "Listing active Docker Compose projects:"
    docker compose ls
fi
