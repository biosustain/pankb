"""
DEV Server specific settings for the Django project
"""

import os

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases
DATABASES = {
    # Self-deployed MongoDB DEV configuration: ----
    'default': {
        'ENGINE': 'djongo',
        'NAME': os.getenv('MONGODB_NAME'),
        'CLIENT': {
            'host': os.getenv('DEV_MONGODB_HOST'),
            'username': os.getenv('DEV_MONGODB_USERNAME'),
            'password': os.getenv('DEV_MONGODB_PASSWORD'),
            'authSource': os.getenv('DEV_MONGODB_AUTH_SOURCE'),
            'authMechanism': os.getenv('DEV_MONGODB_AUTH_MECHANISM')
        }
    }
}