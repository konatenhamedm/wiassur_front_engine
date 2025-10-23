#!/usr/bin/env node

/**
 * Script pour générer automatiquement des stubs pour toutes les vues manquantes
 * Lit les fichiers de routes et crée les fichiers Vue manquants
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')

// Template pour les vues stub
const STUB_TEMPLATE = `<script setup lang="ts">
// TODO: Implémenter cette vue
</script>

<template>
  <div class="container py-4">
    <div class="alert alert-warning">
      <i class="fas fa-exclamation-triangle me-2"></i>
      <strong>Vue en développement</strong>
      <p class="mb-0 mt-2">Cette vue sera implémentée prochainement.</p>
    </div>
  </div>
</template>
`

// Fichiers de routes à scanner
const routeFiles = [
  'src/router/accounting.ts',
  'src/router/admin.ts',
  'src/router/comparator.ts',
  'src/router/configuration.ts',
  'src/router/crm.ts',
  'src/router/income.ts',
  'src/router/partner.ts'
]

// Services API à créer
const apiServices = [
  { path: 'src/services/api/auth.ts', module: 'auth' }
]

function extractViewPaths(content) {
  // Regex pour trouver les imports de vues
  const regex = /import\(['"]@\/views\/([^'"]+\.vue)['"]\)/g
  const paths = []
  let match

  while ((match = regex.exec(content)) !== null) {
    paths.push(match[1])
  }

  return paths
}

function createStubFile(relativePath) {
  const fullPath = join(projectRoot, 'src/views', relativePath)

  // Vérifier si le fichier existe déjà
  if (existsSync(fullPath)) {
    console.log(`✓ Existe déjà: ${relativePath}`)
    return false
  }

  // Créer le dossier si nécessaire
  const dir = dirname(fullPath)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }

  // Créer le fichier stub
  writeFileSync(fullPath, STUB_TEMPLATE)
  console.log(`✨ Créé: ${relativePath}`)
  return true
}

function createApiStub(config) {
  const fullPath = join(projectRoot, config.path)

  if (existsSync(fullPath)) {
    console.log(`✓ Existe déjà: ${config.path}`)
    return false
  }

  const dir = dirname(fullPath)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }

  const template = `// TODO: Implémenter l'API ${config.module}
import type { LoginCredentials, LoginResponse } from '@/types/auth'

export const authApi = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    throw new Error('API not implemented')
  },

  async logout(): Promise<void> {
    throw new Error('API not implemented')
  },

  async refresh(refreshToken: string): Promise<{ token: string }> {
    throw new Error('API not implemented')
  }
}
`

  writeFileSync(fullPath, template)
  console.log(`✨ Créé: ${config.path}`)
  return true
}

// Main
console.log('🔍 Scanning route files...\n')

let totalCreated = 0
const allViewPaths = new Set()

// Scanner tous les fichiers de routes
for (const routeFile of routeFiles) {
  const fullPath = join(projectRoot, routeFile)

  if (!existsSync(fullPath)) {
    console.log(`⚠️  Fichier de route introuvable: ${routeFile}`)
    continue
  }

  const content = readFileSync(fullPath, 'utf-8')
  const viewPaths = extractViewPaths(content)

  console.log(`📄 ${routeFile}: ${viewPaths.length} vues trouvées`)

  viewPaths.forEach(path => allViewPaths.add(path))
}

console.log(`\n📝 Création des stubs pour ${allViewPaths.size} vues...\n`)

// Créer les stubs
for (const viewPath of allViewPaths) {
  if (createStubFile(viewPath)) {
    totalCreated++
  }
}

// Créer les services API
console.log('\n📡 Création des services API...\n')
for (const apiConfig of apiServices) {
  if (createApiStub(apiConfig)) {
    totalCreated++
  }
}

console.log(`\n✅ Terminé! ${totalCreated} fichiers créés.`)
