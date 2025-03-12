#!/bin/bash
echo "🚀 Ejecutando before_install.sh"
if [ -d /var/www/html ]; then
  echo "🧹 Limpiando contenido antiguo"
  sudo rm -rf /var/www/html/*
else
  echo "📁 Creando carpeta /var/www/html"
  sudo mkdir -p /var/www/html
fi

# Asegurar que el directorio pertenece a ec2-user
sudo chown -R ec2-user:ec2-user /var/www/html