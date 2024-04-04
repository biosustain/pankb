# PanKB
The dynamic Python-based version of the website. The Django framework is used as the back-end. Currently, it has not yet been connected to any databases (Microsoft Azure Blob Storage is used as a data lake).

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
Create /pankb_web directory and change to it:
```
sudo mkdir /projects
cd /projects
sudo mkdir pankb_web
sudo chown -R $USER pankb_web
cd pankb_web 
```
Clone the PanKB git repo (the <i>develop</i> branch) into the subdirectory /django_project and change to it:
```
git clone --branch develop https://github.com/biosustain/pankb.git django_project
cd django_project
```
Create a file with the name ".env" under the /projects/pankb_web/django_project/ folder in the following format (do not forget to choose your own SECRET_KEY, SUPER_USER_PASSWORD, SUPER_USER_EMAIL and optionally other fields):
```
## Do not put this file under version control!

## Django: The secret key
SECRET_KEY='<any string you choose>'

## Django: Super-User Credentials
SUPER_USER_NAME = 'admin'
SUPER_USER_PASSWORD = '<any password you choose>'
SUPER_USER_EMAIL = '<your email>'
```
Build the containers with Docker Compose:
```
docker compose up -d --build
```
The web-application must now be available in your browser on http://127.0.0.1 (local development) or http://(type-your-public-ip-address-here) (remote server development). If you use a virtual machine, your IP address will be the public address of your virtual machine. It will use the standard 80 port. The command `docker ps` should show two docker containers running:
```
>>> docker ps
CONTAINER ID   IMAGE                            COMMAND                  CREATED          STATUS         PORTS                                       NAMES
d262e9064c87   django_project-nginx             "/docker-entrypoint.…"   8 seconds ago    Up 7 seconds   0.0.0.0:80->80/tcp, :::80->80/tcp           pankb-nginx
927a8c3c63e1   django_project-django_gunicorn   "sh /entrypoint.sh"      18 seconds ago   Up 7 seconds   0.0.0.0:8000->8000/tcp, :::8000->8000/tcp   pankb-web
```
In case you do Python remote server development via SSH (e.g., using PyCharm IDE), you should use the remote Python interpreter from the django_unicorn Docker Compose. 
