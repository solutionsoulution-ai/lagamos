
import { defineType, defineField } from 'sanity'

// 1. Schéma des Traductions
export const translation = defineType({
  name: 'translation',
  title: 'Textes du Site (FR)',
  type: 'document',
  fields: [
    defineField({ name: 'lang', title: 'Code Langue', type: 'string', initialValue: 'fr', readOnly: true }),
    defineField({ 
      name: 'content', 
      title: 'Contenu JSON des textes', 
      type: 'text', 
      description: 'Gère tous les textes statiques du site (boutons, titres, etc.)' 
    }),
  ],
})

// 2. Schéma des Prêts (Fonctionnalité centrale)
export const loan = defineType({
  name: 'loan',
  title: 'Produits de Prêt',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Nom du Prêt', type: 'string' }),
    defineField({ name: 'slug', title: 'ID Unique (Slug)', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'language', title: 'Langue', type: 'string', initialValue: 'fr' }),
    defineField({ name: 'description', title: 'Résumé accrocheur', type: 'text' }),
    defineField({ name: 'longDescription', title: 'Description complète', type: 'text' }),
    defineField({ name: 'rate', title: 'Taux (%)', type: 'number', initialValue: 2 }),
    defineField({ name: 'maxAmount', title: 'Montant Max (€)', type: 'number' }),
    defineField({ name: 'maxDuration', title: 'Durée Max (mois)', type: 'number' }),
    defineField({ name: 'image', title: 'Image Cover', type: 'image' }),
    defineField({ 
      name: 'iconType', 
      title: 'Type d\'Icône', 
      type: 'string', 
      description: 'User, HomeIcon, Car, Briefcase, RefreshCcw' 
    }),
    defineField({
      name: 'features',
      title: 'Points Forts',
      type: 'array',
      of: [{ type: 'string' }]
    })
  ],
})

// 3. Schéma du Blog
export const post = defineType({
  name: 'post',
  title: 'Blog / Actualités',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titre', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'language', title: 'Langue', type: 'string', initialValue: 'fr' }),
    defineField({ name: 'image', title: 'Image', type: 'image' }),
    defineField({ name: 'category', title: 'Catégorie', type: 'string' }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'readTime', title: 'Temps de lecture', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Résumé', type: 'text' }),
    defineField({ name: 'content', title: 'Corps de l\'article', type: 'text' }),
  ],
})
