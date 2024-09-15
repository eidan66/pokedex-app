#!/bin/bash

# Start Redis server in the background
redis-server &

# Start Django server
pipenv run python manage.py runserver