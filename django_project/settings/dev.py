"""
DEV Server specific settings for the Django project
"""

import os

AZURE_WEB_DATA_URL = "https://pankb.blob.core.windows.net/data/PanKB/web_data_v2/"

MONGODB = {
    "host": os.getenv('MONGODB_HOST'),
    "port": 27017,
    "username": os.getenv('MONGODB_USERNAME'),
    "password": os.getenv('MONGODB_PASSWORD'),
    "db_name": os.getenv('MONGODB_NAME'),
    "auth_mechanism": os.getenv('MONGODB_AUTH_MECHANISM'),
    "auth_source": os.getenv('MONGODB_AUTH_SOURCE'),
}
