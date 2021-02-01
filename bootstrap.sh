#!/usr/bin/env bash

PROJECTFOLDER='lolgamez'
ASSETSFOLDER='assets'

## CLEAR PAST CONTENTS (IF EXIST):
sudo rm -rf "/var/www/html/${PROJECTFOLDER}/"

sudo mkdir "/var/www/html/${PROJECTFOLDER}/"

sudo cp -r "/tmp/assets/${PROJECTFOLDER}/" "/var/www/html/"

# update / upgrade
sudo do-release-upgrade
sudo dpkg --configure -a
sudo apt-get update
sudo apt-get -y upgrade

# install apache 2 and php
sudo apt-get install -y vim
sudo apt-get install -y apache2
sudo apt-get install -y php
sudo apt-get install -y vsftpd
sudo apt-get install -y sqlite3

sudo cp "/tmp/assets/vsftpd.conf" "/etc/vsftpd.conf"
mkdir "/var/ftp/pub/"
sudo chown nobody:nogroup "/var/ftp/pub/"
sudo cp "/tmp/assets/ftp/lolgamez_notice.txt" "/var/ftp/pub/"

systemctl start vsftpd
systemctl enable vsftpd

PASSWORD='notonalist'

# install mysql and give password to installer
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password $PASSWORD"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password $PASSWORD"
sudo apt-get -y install mysql-server
sudo apt-get -y install php-mysql

username="BadBaneCat"
password="Darth_Vader"

#sudo adduser --quiet --disabled-password ${usernmae}
sudo useradd -m "${username}"
echo "$username:$password" | chpasswd
sudo usermod -a -G www-data "${username}"

sudo mysql -h "localhost" -u "root" -p"${PASSWORD}" -e "source /tmp/assets/setup.sql;"

#setup hosts file
VHOST=$(cat <<EOF
    <VirtualHost *:80>
    DocumentRoot "/var/www/html/${PROJECTFOLDER}"
    <Directory "/var/www/html/${PROJECTFOLDER}">
        AllowOverride None
        Options FollowSymLinks
        Require all granted
    </Directory>
    <Directory "/var/www/html/${PROJECTFOLDER}/secret">
        DirectoryIndex safe.html
    </Directory>
    <Directory "/var/www/html/${PROJECTFOLDER}/games">
        DirectoryIndex games.html
    </Directory>
    </VirtualHost>
EOF
)

mkdir "/home/${username}/Desktop"
mkdir "/home/${username}/Documents"
mkdir "/home/${username}/Downloads"
mkdir "/home/${username}/Videos"
mkdir "/home/${username}/Images"

sudo cp -r "/tmp/assets/other/flags/d1/.logs/" "/home/${username}/Documents/"
sudo cp "/tmp/assets/other/flags/d1/flag.txt" "/var/www/html/"

sudo cp "/tmp/assets/other/flags/user.txt" "/home/${username}/user.txt"
sudo cp "/tmp/assets/other/flags/root.txt" "/root/root.txt"

echo "${VHOST}" > /etc/apache2/sites-available/000-default.conf

# enable mod_rewrite
sudo a2enmod rewrite
sudo phpenmod mysqli

### Fix store permissions:
sudo chmod -R 775 "/var/www/html/${PROJECTFOLDER}/secret/"
sudo chgrp -R www-data "/var/www/html/${PROJECTFOLDER}/"


sudo echo "${username} ALL=(ALL) NOPASSWD: /usr/bin/vim" >> "/etc/sudoers"

sudo apt-get -y install docker
sudo apt-get -y install docker-compose
#sudo apt-get -y install nodejs npm

sudo mkdir "/var/apps"
sudo rm -rf "/var/apps/CTFd/"
sudo cp -r "/tmp/assets/CTFd/" "/var/apps/CTFd"
sudo chgrp -R vagrant "/var/apps/"
sudo apt-get install -y python3-pip

cd "/var/apps/CTFd" && docker-compose up -d
#cd "/var/apps/CTFd" && docker-compose up -d -build
#cd "/var/apps/CTFd" && pip3 install -r requirements.txt
#cd "/var/apps/CTFd/" && sudo npm install pm2 -g
#sudo pm2 startup
#cd "/var/apps/CTFd/" && export FLASK_APP="serve.py"
#cd "/var/apps/CTFd/" && sudo -u vagrant pm2 -f start "flask run" 

sudo service apache2 restart