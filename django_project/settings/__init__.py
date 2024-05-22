from .base import *
# The project_server variable needs to be set up as the environment variable in the OS (on which the web project is hosted)
#

if os.environ['DB_SERVER'] == 'dev':
   from .dev import *
if os.environ['DB_SERVER'] == 'prod':
   from .prod import *