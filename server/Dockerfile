# Use Ubuntu as the base image
FROM ubuntu:latest
LABEL authors="idanlevian"

# Install dependencies
# Install dependencies
RUN apt-get update && apt-get install -y \
    python3-pip \
    python3-dev \
    build-essential \
    libpq-dev \
    python3-venv \
    curl \
    && apt-get clean

# Set the work directory
WORKDIR /code

# Create and activate a virtual environment
RUN python3 -m venv /code/venv
ENV PATH="/code/venv/bin:$PATH"

# Install pipenv inside the virtual environment
RUN pip install pipenv

# Copy Pipfile and Pipfile.lock and install dependencies using pipenv
COPY Pipfile Pipfile.lock /code/
RUN pipenv install --system --deploy

# Copy the rest of the project files
COPY . /code/

# Expose port 8000 for the Django app
EXPOSE 8000

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Run migrations and start the application with Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:8000", "pokedexServer.wsgi:application"]