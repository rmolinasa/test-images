cd ~/test-images

cp -r front public

#Verificar que queda así public/front/

rm -r front

npm i

node app

#introducimos la siguiente url en el navegador: localhost:3003/downloadImages

#Una vez que se han descargado las imágenes en public/front/src/static paramos el servidor node con CTRL + C

cd public/front

npm i

npm start

#En este punto se abrirá una pestaña en el navegador cargando las imágenes descargadas previamente
