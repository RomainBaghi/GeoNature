#!/bin/bash

. ./config/settings.ini

BASE_DIR=$(readlink -e "${0%/*}")
cd backend

echo "Création du fichier de configuration ..."
if [ ! -f custom_config.py ]; then
  cp custom_config.py.sample custom_config.py
fi


echo "préparation du fichier config.py..."
my_url="${my_url//\//\\/}"
sed -i "s/SQLALCHEMY_DATABASE_URI = .*$/SQLALCHEMY_DATABASE_URI = \"postgresql:\/\/$user_pg:$user_pg_pass@$db_host:$db_port\/$db_name\"/" custom_config.py
sed -i "s/URL_APPLICATION = .*$/URL_APPLICATION = '${my_url}geonature' /g" custom_config.py
sed -i "s/API_ENDPOINT = .*$/API_ENDPOINT = '${my_url}geonature\/api'/g" custom_config.py
nano custom_config.py

#Virtual env Installation
echo "Installation du virtual env..."



if [[ $python_path ]]; then
  virtualenv -p $python_path venv
else
  virtualenv venv
fi

source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
python ${BASE_DIR}/geonature_cmd.py install_command
deactivate

#Lancement de l'application
cd backend
DIR=$(readlink -e "${0%/*}")
cp gunicorn_start.sh.sample gunicorn_start.sh
sudo -s sed -i "s%APP_PATH%${BASE_DIR}%" gunicorn_start.sh
sudo -s cp geonature-service.conf /etc/supervisor/conf.d/
sudo -s sed -i "s%APP_PATH%${DIR}%" /etc/supervisor/conf.d/geonature-service.conf

sudo -s supervisorctl reread
sudo -s supervisorctl reload


#Frontend installation
#Node and npm instalation
cd ../frontend
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
export NVM_DIR="$HOME/.nvm"
 [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm install 8.1.1

echo " ############"
echo "instalation des paquets npm"
npm install
npm rebuild node-sass

if [ ! -f geonature/conf/app.config.ts ]; then
  cp geonature/conf/app.config.sample.ts geonature/conf/app.config.ts
fi

if [ ! -f geonature/custom/custom.scss ]; then
  cp geonature/custom/custom.scss.sample geonature/custom/custom.scss
fi

# copy the custom components
if [ ! -f geonature/custom/components/footer/footer.component.ts ]; then
  cp geonature/custom/components/footer/footer.component.ts.sample geonature/custom/components/footer/footer.component.ts
fi
if [ ! -f geonature/custom/components/footer/footer.component.html ]; then
  cp geonature/custom/components/footer/footer.component.html.sample geonature/custom/components/footer/footer.component.html
fi
if [ ! -f geonature/custom/components/introduction/introduction.component.ts ]; then
  cp geonature/custom/components/introduction/introduction.component.ts.sample geonature/custom/components/introduction/introduction.component.ts
fi
if [ ! -f geonature/custom/components/introduction/introduction.component.html ]; then
  cp geonature/custom/components/introduction/introduction.component.html.sample geonature/custom/components/introduction/introduction.component.html
fi


sed -i "s/URL_APPLICATION: .*$/URL_APPLICATION: '${my_url}geonature\/',/g" geonature/conf/app.config.ts
sed -i "s/API_ENDPOINT: .*$/API_ENDPOINT: '${my_url}geonature\/api\/',/g" geonature/conf/app.config.ts
sed -i "s/API_TAXHUB: .*$/API_TAXHUB: '${my_url}taxhub\/api\/',/g" geonature/conf/app.config.ts

nano geonature/conf/app.config.ts

ng build --prod --aot=false --base-href=/geonature/