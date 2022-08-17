npm run build
scp -r /chemin/vers/le/fichier/build  userName@ipVPS:/home/userName/build
ssh userName@ipVPS
sudo cp -r /home/userName/build/* /var/www/ucollect.fun/html
sudo systemctl reload nginx