#!/usr/bin/env bash

dockerize -wait tcp://db:5432 -timeout 20s

python3 manage.py migrate --settings instar.settings.prod
gunicorn -c config/gunicorn.prod.py instar.wsgi:application