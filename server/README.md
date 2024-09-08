
# Django Project Setup Guide

This guide provides instructions for setting up and running the Django project on a MacBook.

## Prerequisites

- macOS
- Homebrew (for installing Python if not already installed)

## Installation Steps

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

### Step 5: Run the Django Development Server

Start the server by running:

```bash
python manage.py runserver
```

The server will start on `http://127.0.0.1:8000/` by default. You can access your Django application by visiting this URL in a web browser.

## Additional Configuration

- Ensure that all necessary environment variables are set up correctly for your development environment.
- Ensure your database server is running and accessible if your project requires a database.

## Troubleshooting

- **Environment Variables:** Check that all required environment variables are set.
- **Database Connections:** Verify that the database is running and the connection settings in your Django settings are correct.
- **Dependency Issues:** If you encounter errors related to missing packages, ensure all dependencies are correctly installed according to `requirements.txt`.

For more information, refer to the official [Django documentation](https://docs.djangoproject.com/).
