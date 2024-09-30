#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

NPM_DEP_NAME="codewrangler"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install Node.js
install_node() {
    echo -e "${YELLOW}Node.js is not installed. Installing...${NC}"
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
        sudo apt-get install -y nodejs
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install node
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
        # Windows (Git Bash / Cygwin)
        echo -e "${RED}Please install Node.js manually from https://nodejs.org/${NC}"
        exit 1
    else
        echo -e "${RED}Unsupported operating system${NC}"
        exit 1
    fi
}

# Check if Node.js is installed
if command_exists node; then
    node_version=$(node --version)
    echo -e "${GREEN}Node.js ${node_version} is already installed${NC}"
else
    install_node
fi

# Check if npm is installed
if ! command_exists npm; then
    echo -e "${RED}npm is not installed. Please install it manually${NC}"
    exit 1
fi

# Install CodeWrangler
echo -e "${YELLOW}Installing CodeWrangler...${NC}"
npm install -g $NPM_DEP_NAME

# Check if installation was successful
if command_exists codewrangler && command_exists cw; then
    echo -e "${GREEN}CodeWrangler has been successfully installed!${NC}"
    echo -e "You can now use ${YELLOW}codewrangler${NC} or ${YELLOW}cw${NC} command."
else
    echo -e "${RED}Installation failed. Please try installing manually:${NC}"
    echo -e "${YELLOW}npm install -g codewrangler${NC}"
    exit 1
fi