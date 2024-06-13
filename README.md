# PanKB
<b>The dynamic Python-based version of the website. The Django framework is used as the back-end. Data about organisms, genes, genomes, locus_tags and KEGG pathways is stored in a database (in a cloud-based Cosmos DB for MongoDB). The Microsoft Azure Blob Storage is still used as a data lake to store static semi-structured data, e.g. plots, bibliome and phylogenetic trees (i.e. data that is not used by search or any other scripts generating dynamic content).</b>

## Development configuration on Ubuntu servers
Tested on Linux Ubuntu 20.04 (may need tweaks for other systems).

Requirements: 
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

### Set up the repository and build the containers
Create the necessary directories and change to the /pankb_web
```
sudo mkdir -p /projects
cd /projects
sudo mkdir -p pankb_web
sudo chown -R $USER pankb_web
cd pankb_web 
mkdir -p pankb_llm
```
First, you must set up and populate the PROD MongoDB instance on a sharded cluster in the Azure cloud as described here: https://github.com/biosustain/pankb_db. 

Second, you must deploy the AI Assistant Web Application (<b>here we need to insert a link to the repo with PanKB LLM, knowledge base creation scripts and streamlit interface. And even before that, the repo must be re-created under the biosustain org</b>).

Finally, in order to deploy the website, clone the PanKB git repo (the <i>develop</i> branch) into the subdirectory /django_project and change to it:
```
git clone --branch pre-prod https://github.com/biosustain/pankb.git django_project
cd django_project
```
Create a file with the name ".env" under the /projects/pankb_web/django_project/ folder in the following format:
```
## Do not put this file under version control!

## Server type, where the web project is located
PROJECT_SERVER = 'prod'   # values = ('dev', 'prod')

## MongoDB type. Only two possible values:
# - 'self_deployed' (standalone, deployed on the DEV server in a docker container)
# or
# - 'cloud' (MongoDB Atlas or Azure CosmosDB for MongoDB)
DB_TYPE = 'cloud'

## Django: The secret key
SECRET_KEY = '<insert any string you choose>'

## Django: Super-User Credentials
SUPER_USER_NAME = 'admin'
SUPER_USER_PASSWORD = '<insert any password you choose>'
SUPER_USER_EMAIL = '<insert your email>'

## Mongo database name - same both for the PROD and DEV servers
MONGODB_NAME = 'pankb'

## MongoDB-PROD (Azure CosmosDB for MongoDB) Connection String
MONGODB_CONN_STRING = '<insert the connection string for Azure Cosmos DB for MongoDB instance (can be obtained by emailing to liupa@dtu.dk)>'
```
Build the containers with Docker Compose:
```
docker compose up -d --build
```
The web-application must now be available in your browser on the address http://(type-your-public-ip-address-here). If you use a virtual machine, your IP address will be the public address of your virtual machine. It will use the standard 80 port. The command `docker ps` should show two docker containers running:
```
>>> docker ps
CONTAINER ID   IMAGE                            COMMAND                  CREATED             STATUS             PORTS                                    NAMES
39787becaeb7   pankb_web:latest     "sh /entrypoint.sh"      57 minutes ago   Up 57 minutes   0.0.0.0:8000->8000/tcp, :::8000->8000/tcp                   pankb-web
730353f2fdde   pankb_nginx:latest   "/docker-entrypoint.…"   57 minutes ago   Up 57 minutes   0.0.0.0:80->80/tcp, :::80->80/tcp                           pankb-nginx
54d89d7c4fad   pankb_llm:latest     "streamlit run strea…"   8 days ago       Up 41 hours     0.0.0.0:8501->8501/tcp, :::8501->8501/tcp                   pankb-llm
```