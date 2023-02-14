from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'b983d2!h)@x+jjp4l*72phwv&%e1sf=+%59rwujf9!axbir!)v'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': "instar",
        'PASSWORD': "instar1234!",
        'USER': "instar",
        'HOST': "db",
        'PORT': "5432",
    }
}
