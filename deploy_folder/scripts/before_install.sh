#!/bin/bash
echo "🧹 Limpiando contenido previo..."
if [ -d "/var/www/html" ]; then
  rm -rf /var/www/html/*
fi
