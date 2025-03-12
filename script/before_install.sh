#!/bin/bash
echo "🚀 Ejecutando before_install.sh"
if [ -d /var/www/html ]; then
  echo "🧹 Limpiando contenido antiguo"
  rm -rf /var/www/html/*
else
  echo "📁 Creando carpeta /var/www/html"
  mkdir -p /var/www/html
fi
