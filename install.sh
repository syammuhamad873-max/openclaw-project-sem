#!/bin/bash

echo "Updating system..."
sudo apt update && sudo apt upgrade -y

echo "Installing Git..."
sudo apt install -y git

echo "Installing Docker..."
curl -fsSL https://get.docker.com | sh

echo "Installing Docker Compose..."
sudo apt install -y docker-compose-plugin

echo "Done!"
echo "Now clone your OpenClaw project and continue the setup."
