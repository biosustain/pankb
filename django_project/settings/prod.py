"""
PROD Server specific settings for the Django project
"""
import os

AZURE_WEB_DATA_URL = "https://pankb.blob.core.windows.net/data/PanKB/web_data_v2/"

MONGODB = {
    "conn_string": os.getenv('MONGODB_CONN_STRING'),
    "db_name": os.getenv('MONGODB_NAME'),
}
