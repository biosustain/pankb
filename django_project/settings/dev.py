"""
DEV Server specific settings for the Django project
"""

import os

# Database settings
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases
DATABASES = {
    # Self-deployed MongoDB DEV configuration: ----
    'default': {
        'ENGINE': 'djongo',
        'NAME': os.getenv('MONGODB_NAME'),
        'CLIENT': {
            'host': os.getenv('MONGODB_HOST'),
            'username': os.getenv('MONGODB_USERNAME'),
            'password': os.getenv('MONGODB_PASSWORD'),
            'authSource': os.getenv('MONGODB_AUTH_SOURCE'),
            'authMechanism': os.getenv('MONGODB_AUTH_MECHANISM')
        }
    }
}