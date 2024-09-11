FROM ubuntu:latest
LABEL authors="idanlevian"

RUN apt-get update && apt-get install -y \
    python3-pip \
    python3-dev \
    build-essential \
    libpq-dev \
    python3-venv \
    curl \
    && apt-get clean

WORKDIR /code

RUN python3 -m venv /code/venv
ENV PATH="/code/venv/bin:$PATH"

RUN pip install pipenv

COPY Pipfile Pipfile.lock /code/
RUN pipenv install --system --deploy

COPY . /code/

EXPOSE 8000

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

CMD ["gunicorn", "-b", "0.0.0.0:8000", "pokedexServer.wsgi:application"]