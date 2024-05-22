"""
PROD Server specific settings for the Django project
"""
import os

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases
DATABASES = {
    # Azure CosmosDB for MongoDB PROD configuration: ----
    'default': {
        'ENGINE': 'djongo',
        'NAME': os.getenv('MONGODB_NAME'),
        'CLIENT': {
            'host': os.getenv('PROD_MONGODB_CONN_STRING')
        }
    }
}