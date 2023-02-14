import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "instar.settings.prod")

bind = '0.0.0.0:8000'
workers = 2
worker_class = 'gevent'
worker_connections = 1000
timeout = 30
accesslog = '/log/access.log'
errorlog = '/log/error.log'
loglevel = 'info'
