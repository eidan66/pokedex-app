
# Django Project Setup Guide

This guide provides instructions for setting up and running the Django project on a MacBook using either **Pipenv** or **Docker**.

## Prerequisites

- macOS
- Homebrew (for installing Python if not already installed)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (for running the project with Docker)

## Setup Options

You can set up the project using **Pipenv** or **Docker**. Choose the method that best fits your development workflow.

---

## Option 1: Set Up Using Pipenv

### Step 1: Install Python via Homebrew

If Python is not installed or you need a newer version, you can install it using Homebrew:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

brew install python
```

This installs Python and `pip`, Python’s package manager.

### Step 2: Install Dependencies and Setup Environment with Pipenv

If pipenv is not already installed, you can install it using pip. This tool helps manage dependencies and virtual environments:

```bash
pip install pipenv
```

Navigate to your project directory and install all necessary dependencies using Pipenv:

```bash
pipenv install
```

### Step 3: Activate the Virtual Environment

Activate the virtual environment managed by Pipenv:

```bash
pipenv shell
```

### Step 4: Run the Django Development Server

Start the server by running:

```bash
python manage.py runserver
```

The server will start on `http://127.0.0.1:8000/` by default. You can access your Django application by visiting this URL in a web browser.

---

## Option 2: Set Up Using Docker (Recommended)

Docker allows you to run the project inside containers, ensuring a consistent development environment without needing to install Python or other dependencies locally.

### Step 1: Install Docker

Download and install Docker Desktop from the [official Docker website](https://www.docker.com/products/docker-desktop).

### Step 2: Build the Docker Image

Navigate to the project directory and run the following command to build the Docker image:

```bash
docker build -t pokedex-server .
```

This command will build the Docker image based on the provided `Dockerfile`.

### Step 3: Run the Docker Container

After building the image, run the container using this command:

```bash
docker run -p 8000:8000 pokedex-server
```

This will start the Django server inside the Docker container, and you can access the application at `http://127.0.0.1:8000/`.

### Step 4: Stopping the Docker Container

To stop the Docker container, press `CTRL + C` in the terminal where the container is running.

---

## Additional Configuration

- Ensure that all necessary environment variables are set up correctly for your development environment.
- Ensure your database server is running and accessible if your project requires a database.
  
For Docker, you can also configure your `docker-compose.yml` file to include a database service.

---

## Troubleshooting

- **Docker Issues:** If you're new to Docker and encounter issues, ensure that Docker Desktop is running and that the ports are not already in use.
- **Environment Variables:** Check that all required environment variables are set.
- **Database Connections:** Verify that the database is running and the connection settings in your Django settings are correct.
- **Dependency Issues:** If you encounter errors related to missing packages, ensure all dependencies are correctly installed using `pipenv install` (for Pipenv) or the Docker image builds successfully.

For more information, refer to the official [Django documentation](https://docs.djangoproject.com/).
