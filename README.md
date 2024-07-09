# PanKB Website (PROD)
<b>The dynamic Python-based version of the website. The Django framework is used as the back-end. Data about organisms, genes, genomes, locus_tags and KEGG pathways are stored in a database (in a cloud-based Azure Cosmos DB for MongoDB). The Microsoft Azure Blob Storage is still used as a data lake to store static unstructured or semi-structured data, e.g., plots, bibliome and phylogenetic trees (i.e., data that are not used by search or any other scripts generating dynamic content).</b>

## Contributors
- Front-end, analytics, LLM, data processing via a bioinformatics pipeline: Binhuan Sun, binsun@biosustain.dtu.dk
- Back-end, ETL pipeline, the website and vector databases, CI/CD pipeline, the github repo maintenance, versioning and backup systems, infrastructure, DevOps: Liubov Pashkova, liupa@dtu.dk

## Server Configuration
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
mkdir -p pankb_llm
```
First, you must set up and populate the PROD MongoDB instance on a sharded cluster in the Azure cloud following the instructions from the respective repo: https://github.com/biosustain/pankb_db.

Second, you must deploy (manually or automatically with Github Actions) the AI Assistant Web Application following the instructions from the respective repo: https://github.com/biosustain/pankb_db.

Every time when one pushes to the `prod` repo (usually from the DEV server), the changes in PanKB site and Assistant Web Applications will be AUTOMATICALLY deployed to the PROD server. The automation (CI/CD) is achieved with the help of Github Actions enabled for the repository. The respective config file is `.github/workflows/deploy-prod-to-azurevm.yml`. In order for the automated deployment to work, you should set up the values of the following secret Github Actions secrets:
```
PANKB_PROD_HOST - the PROD server IP address
PANKB_PROD_SSH_USERNAME - the ssh user name to connect to the PROD server
PANKB_PROD_PRIVATE_SSH_KEY - the ssh key that is used to connect to the PROD server
PANKB_PROD_DJANGO_SECRET_KEY - Django secret key (set to any string you like)
PANKB_PROD_DJANGO_SUPER_USER_NAME - Django admin name (set to any string you like)
PANKB_PROD_DJANGO_SUPER_USER_PASSWORD - Django admin password (set to any string you like)
PANKB_PROD_DJANGO_SUPER_USER_EMAIL - Django admin email
PANKB_PROD_MONGODB_NAME - the name of the MongoDB PROD database on the Azure sharded cluster
PANKB_PROD_MONGODB_CONN_STRING - MongoDB PROD (Azure CosmosDB for MongoDB) Connection String
PANKB_PROD_AI_ASSISTANT_APP_URL - the URL address of the separately deployed AI Assistant Web Application
```
These secrets are encrypted and safely stored on Github in the "Settings - Secrets and Variables - Actions - Repository secrets" section. In this section, you can also add new Github Actions secrets and edit the existing ones. However, in order to change a secret name, you have to remove the existing secret and add the new one instead of the old one.

After the Github Actions deployment job has successfully run, the web-application must be available at <a href="pankb.org" target="_blank">pankb.org</a>. 

The command `docker ps` should show several containers (one with the django web app and wsgi server inside, one with the nginx web server, one with the AI Assistant web app and one with the DEV database if you deploy it locally) up and running if the automatic deployment was successful:
```
docker ps
CONTAINER ID   IMAGE                            COMMAND                  CREATED             STATUS             PORTS                                    NAMES
39787becaeb7   pankb_web:latest     "sh /entrypoint.sh"      23 seconds ago   Up 12 seconds   0.0.0.0:8000->8000/tcp, :::8000->8000/tcp                   pankb-web
730353f2fdde   pankb_nginx:latest   "/docker-entrypoint.…"   23 seconds ago   Up 12 seconds   0.0.0.0:80->80/tcp, :::80->80/tcp                           pankb-nginx
54d89d7c4fad   pankb_llm:latest     "streamlit run strea…"   8 days ago       Up 41 hours     0.0.0.0:8501->8501/tcp, :::8501->8501/tcp                   pankb-llm
```