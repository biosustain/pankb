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
```
sudo mkdir -p /projects
cd /projects
sudo mkdir -p pankb_web
sudo chown -R $USER pankb_web
cd pankb_web 
mkdir -p pankb_llm
```
First of all, you must set up and populate the PROD MongoDB instance on a sharded cluster in the Azure cloud following the instructions from the respective repo: https://github.com/biosustain/pankb_db.

<<<<<<< HEAD
Every time when one pushes to the `prod` repo (usually from the DEV server), the changes in PanKB site and Assistant Web Applications will be AUTOMATICALLY deployed to the PROD server. The automation (CI/CD) is achieved with the help of Github Actions enabled for the repository. The respective config file is `.github/workflows/deploy-prod-to-azurevm.yml`. In order for the automated deployment to work, you must set up the values of the following Github Actions secrets:
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
```
Additionally, you must set up the values of the following Github Actions variables:
```
PANKB_PROD_AI_ASSISTANT_APP_URL - the URL address of the separately deployed AI Assistant Web Application
```
The Github Actions secrets are encrypted and safely stored on Github in the "Settings - Secrets and Variables - Actions - Secrets - Repository secrets" section. In this section, you can also add new Github Actions secrets and edit the existing ones. However, in order to change a secret name, you have to remove the existing secret and add the new one instead of the old one. The Github Actions variables are not encrypted. Similarly, they are stored on Github in the "Settings - Secrets and Variables - Actions - Variables - Repository variables" section.

If this is the first time when the PanKB website is deployed to the PROD server, we must manually create SSL certificates in order to enable HTTPS on the PROD server. We use <a href="https://letsencrypt.org" target="_blank">Let's Encrypt</a> free SSL certificates and the dockerized <a href="https://certbot.eff.org" target="_blank">certbot</a> to generate and renew them. After the website app is deployed on the PROD server, run the certbot in a docker container with the following command:
```
cd /projects/pankb_web/django_project
docker compose run --rm certbot certonly --webroot --webroot-path /var/www/certbot/ -d pankb.org
```
When prompted, enter your email for notices from Let's Encrypt. This step is optional, and you can skip it by typing <b>c</b> and pressing <b>Enter</b>. Agree to the <b>Terms of Service</b> by typing <b>y</b> and pressing <b>Enter</b>. Wait for the procedure to finish. If Docker reports no errors, the generated SSL certificate `fullchain.pem` and private key `privkey.pem` should be found under `/projects/pankb_web/django_project/certbot/conf/live/pankb.org/` folder.

Let's Encrypt certificates last for three months. After that, they must be renewed. To renew certificates, execute the following command:
```
docker compose run --rm certbot renew
```
Alternatively, if you want to renew the SSL certificates at 5 am on the first day every 2nd month, add the following line to the `crontab` file with `sudo crontab -e` command:
```
0 5 1 */2 * docker compose -f /projects/pankb_web/django_project/docker-compose.yml run --rm certbot renew
```
Once created, the certificates and private keys generated will be safely stored and unmodified under the same folder after each re-deployment to the PROD server automatically triggered by Github Actions.
=======
Second, you must deploy (manually or automatically with Github Actions) the AI Assistant Web Application following the instructions from the respective repo: https://github.com/biosustain/pankb_llm.

Every time when one pushes to the `pre-prod` repo (usually from the DEV server), the changes in PanKB site and Assistant Web Applications will be AUTOMATICALLY deployed to the PRE-PROD server. The automation (CI/CD) is achieved with the help of Github Actions enabled for the repository. The respective config file is `.github/workflows/deploy-preprod-to-azurevm.yml`. In order for the automated deployment to work, you must set up the values of the following Github Actions secrets:
```
PANKB_PREPROD_HOST - the PRE-PROD server IP address
PANKB_PREPROD_SSH_USERNAME - the ssh user name to connect to the PRE-PROD server
PANKB_PREPROD_PRIVATE_SSH_KEY - the ssh key that is used to connect to the PRE-PROD server
PANKB_PREPROD_DJANGO_SECRET_KEY - Django secret key (set to any string you like)
PANKB_PREPROD_DJANGO_SUPER_USER_NAME - Django admin name (set to any string you like)
PANKB_PREPROD_DJANGO_SUPER_USER_PASSWORD - Django admin password (set to any string you like)
PANKB_PREPROD_DJANGO_SUPER_USER_EMAIL - Django admin email
PANKB_PREPROD_MONGODB_NAME - the name of the MongoDB PRE-PROD database on the Azure sharded cluster
PANKB_PREPROD_MONGODB_CONN_STRING - MongoDB PRE-PROD (Azure CosmosDB for MongoDB) Connection String
```
Additionally, you must set up the values of the following Github Actions variables:
```
PANKB_PREPROD_AI_ASSISTANT_APP_URL - the URL address of the separately deployed AI Assistant Web Application
```
The Github Actions secrets are encrypted and safely stored on Github in the "Settings - Secrets and Variables - Actions - Secrets - Repository secrets" section. In this section, you can also add new Github Actions secrets and edit the existing ones. However, in order to change a secret name, you have to remove the existing secret and add the new one instead of the old one. The Github Actions variables are not encrypted. Similarly, they are stored on Github in the "Settings - Secrets and Variables - Actions - Variables - Repository variables" section.
>>>>>>> origin/pre-prod

Finally, you must deploy (manually or automatically with Github Actions) the AI Assistant Web Application following the instructions from the respective repo: https://github.com/biosustain/pankb_llm.

The command `docker ps` should show several containers (one with the django web app and wsgi server inside, one with the nginx web server, one with the AI Assistant web app and one with the DEV database if you deploy it locally) up and running if the automatic deployment was successful:
```
docker ps
CONTAINER ID   IMAGE                COMMAND                  CREATED             STATUS             PORTS                                                                      NAMES
4dd23652d5b0   pankb_web:latest     "sh /entrypoint.sh"      About an hour ago   Up About an hour   0.0.0.0:8000->8000/tcp, :::8000->8000/tcp                                  pankb-web
6523c2afddd3   pankb_nginx:latest   "/docker-entrypoint.…"   About an hour ago   Up About an hour   0.0.0.0:80->80/tcp, :::80->80/tcp, 0.0.0.0:443->443/tcp, :::443->443/tcp   pankb-nginx
c3bbd55e070d   pankb_llm:latest     "streamlit run strea…"   2 hours ago         Up 2 hours         0.0.0.0:8501->8501/tcp, :::8501->8501/tcp                                  pankb-llm
```
After the Github Actions deployment job has successfully run, the web-application must be available at <a href="pankb.org" target="_blank">pankb.org</a>.