# PanKB Website
<b>The dynamic Python-based version of the website. The Django framework is used as the back-end. Data about organisms, genes, genomes, locus_tags and KEGG pathways is stored in a database (locally in a self-deployed MongoDB instance or in a cloud-based Cosmos DB for MongoDB). The Microsoft Azure Blob Storage is still used as a data lake to store static semi-structured data, e.g. plots, bibliome and phylogenetic trees (i.e. data that is not used by search or any other scripts generating dynamic content).</b>

## Development Server Configuration
Tested on Linux Ubuntu 20.04 (may need tweaks for other systems).

Min hardware requirements solely for the PanKB website deployment (excl. the PanKB DB, ETL and AI Assistant app):
- 4GB RAM
- 8GB disk space
- 4 CPU cores (e.g. for PyCharm Remote IDE development)

System requirements:
- Docker & Docker Compose
- Git

### Install Docker & Docker Compose (if it is not installed on your system)
Update your existing list of packages:
```
sudo apt update
```
Next, install some packages that will let `apt` use packages over HTTPS:
```
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```
Add the official Docker repo GPG key to your system:
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
Add the Docker repo to the `apt` sources and update the packages with the newly added ones:
```
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"
```
Check that you are installing from the proper repo:
```
apt-cache policy docker-ce
```
Finally, install Docker:
```
sudo apt install docker-ce
```
Now Docker should be installed. The respective daemon is running and will start automatically on boot. We can check that it is up and running with the following command:
```
sudo systemctl status docker
```
Finally, change docker.sock to new permissions:
```
sudo chmod 666 /var/run/docker.sock
```
and restart the docker daemon:
```
sudo systemctl restart docker
```
### Set up an ability to execute the `docker` command without `sudo`
By default, the `docker` command can only be run by <b>root</b> (if you type `sudo` afront of it) or by a user included into the <b>docker</b> group (this is a group that Docker creates during the installation). If you want to avoid typing `sudo` every time you run the `docker` command, add yourself to the <b>docker</b> group:
```
sudo usermod -aG docker ${USER}
```
In order for the new group membership to take effect, log out of the server and back in. After logging back in, check that your username was added to the <b>docker</b> group:
```
groups
```
The rest of the instructions assumes that you are running the `docker` command as a user in the <b>docker</b> group. If you choose not to it, please prepend every `docker` command with `sudo`.

### Install Git (if it is not installed on your system)
Update your existing list of packages:
```
sudo apt update
```
Install Git:
```
sudo apt install git
```

### Set up the repositories and build the containers
Create the necessary directories and change to the /pankb_web:
```
sudo mkdir -p /projects
cd /projects
sudo mkdir -p pankb_web
sudo chown -R $USER pankb_web
cd pankb_web 
mkdir -p docker_volumes/mongodb pankb_db pankb_llm
```
First, you must set up and populate your own DEV MongoDB instance as described here: https://github.com/biosustain/pankb_db. The instructions in this document consider only self-deployed (or locally deployed) MongoDB instances. However, a DEV DB can also be deployed on a Cosmos DB cluster or with any other IaaS cloud service. 

Second, you must deploy the AI Assistant Web Application as described here: https://github.com/biosustain/pankb_llm.

Finally, in order to deploy the website, clone the PanKB git repo (the <i>develop</i> branch) into the subdirectory /django_project and change to it:
```
git clone --branch develop https://github.com/biosustain/pankb.git django_project
cd django_project
```
Create a file with the name ".env" under the /projects/pankb_web/django_project/ folder in the following format (do not forget to choose your own SECRET_KEY, SUPER_USER_PASSWORD, SUPER_USER_EMAIL, MONGO_INITDB_ROOT_PASSWORD, MONGODB_PASSWORD, POSTGRES_PASSWORD, AI_ASSISTANT_APP_URL and optionally other fields):
```
## Do not put this file under version control!

## Server type, where the web project is located
PROJECT_SERVER = 'dev' 

## MongoDB type. Only two possible values:
# - 'self_deployed' (standalone, deployed on the DEV server in a docker container)
# or
# - 'cloud' (MongoDB Atlas or Azure CosmosDB for MongoDB)
DB_TYPE = 'self_deployed'

## Django: The secret key
SECRET_KEY = '<insert any string you choose>'

## Django: Super-User Credentials
SUPER_USER_NAME = 'admin'
SUPER_USER_PASSWORD = '<insert any password you choose>'
SUPER_USER_EMAIL = '<insert your email>'

## Mongo database name - same both for the PROD and DEV servers
MONGODB_NAME = 'pankb'

## Django: MongoDB-DEV (self-deployed) connection parameters
MONGODB_HOST = 'mongodb://mongodb:27017'
MONGODB_AUTH_MECHANISM = 'SCRAM-SHA-1'

## MongoDB: Docker Compose Env Variables
MONGO_INITDB_ROOT_USERNAME = 'allDbAdmin'         
MONGO_INITDB_ROOT_PASSWORD = '<insert any password you choose>'   
MONGODB_USERNAME = 'pankbDbOwner'
MONGODB_PASSWORD = '<insert any password you choose>'
MONGODB_AUTH_SOURCE = 'pankb'

## URL address of the separately deployed AI Assistant Web Application
AI_ASSISTANT_APP_URL = '<insert the url here>'
```
Build or (re-build) the containers with Docker Compose:
```
docker compose up -d --build --force-recreate
```
The web-application must now be available in your browser on http://127.0.0.1 (local development) or http://(type-your-public-ip-address-here) (remote server development). If you use a virtual machine, your IP address will be the public address of your virtual machine. It will use the standard 80 port. The command `docker ps` should show several containers (one with the django web app and wsgi server inside, one with the nginx web server, one with the AI Assistant web app and one with the DEV database if you deploy it locally) up and running:
```
>>> docker ps
CONTAINER ID   IMAGE                            COMMAND                  CREATED             STATUS             PORTS                                    NAMES
39787becaeb7   pankb_web:latest     "sh /entrypoint.sh"      57 minutes ago   Up 57 minutes   0.0.0.0:8000->8000/tcp, :::8000->8000/tcp                   pankb-web
730353f2fdde   pankb_nginx:latest   "/docker-entrypoint.…"   57 minutes ago   Up 57 minutes   0.0.0.0:80->80/tcp, :::80->80/tcp                           pankb-nginx
54d89d7c4fad   pankb_llm:latest     "streamlit run strea…"   8 days ago       Up 41 hours     0.0.0.0:8501->8501/tcp, :::8501->8501/tcp                   pankb-llm
b3197b7ed6cb   mongo:6.0-rc         "docker-entrypoint.s…"   About an hour ago   Up About an hour   0.0.0.0:27017->27017/tcp, :::27017->27017/tcp         pankb-mongodb
```
In case you do Python remote server development via SSH (e.g., using PyCharm IDE), you should use the remote Python interpreter from the django_unicorn Docker Compose.