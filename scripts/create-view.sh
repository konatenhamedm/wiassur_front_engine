#!/bin/bash

# Script pour créer rapidement une vue placeholder
# Usage: ./scripts/create-view.sh Accounting/Operations

if [ -z "$1" ]; then
  echo "Usage: ./scripts/create-view.sh <ViewPath>"
  echo "Example: ./scripts/create-view.sh Accounting/Operations"
  exit 1
fi

VIEW_PATH="$1"
FILE_PATH="src/views/${VIEW_PATH}.vue"
DIR_PATH=$(dirname "$FILE_PATH")

# Créer le dossier si nécessaire
mkdir -p "$DIR_PATH"

# Extraire le nom du composant
COMPONENT_NAME=$(basename "$VIEW_PATH")

# Créer le fichier Vue
cat > "$FILE_PATH" << 'EOF'
<script setup lang="ts">
import PlaceholderView from '@/components/PlaceholderView.vue'
</script>

<template>
  <PlaceholderView />
</template>
EOF

echo "✅ Vue créée: $FILE_PATH"
echo "📝 Vous pouvez maintenant remplacer le contenu par votre implémentation"
