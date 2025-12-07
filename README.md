# 🤖 Miracle - AI-Powered File Management Assistant

Un assistant IA interactif qui permet de gérer vos fichiers de manière conversationnelle. Basé sur Claude AI et Bun, ce projet offre une expérience de chat intuitive pour créer, modifier, supprimer et explorer vos fichiers.

## ✨ Caractéristiques principales

- **Chat interactif** : Discutez avec Claude pour accomplir vos tâches de gestion de fichiers
- **Outils de fichiers intégrés** :
  - 📖 **Lecture de fichiers** : Consultez le contenu de n'importe quel fichier
  - 📋 **Listage récursif** : Explorez votre arborescence avec des patterns glob
  - ✏️ **Édition intelligente** : Créez ou modifiez des fichiers facilement
  - 🗑️ **Suppression sécurisée** : Supprimez des fichiers en toute confiance
- **Protocoles de sécurité** : Confirmation visuelle avant modification/suppression de fichiers
- **Support multilingue** : Répondez dans la langue de votre choix

## 🚀 Démarrage rapide

### Prérequis

- [Bun](https://bun.sh) (runtime JavaScript moderne)
- Une clé API Anthropic

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/miracle.git
cd miracle

# Installer les dépendances
bun install
```

### Configuration

Définissez votre clé API Anthropic :

```bash
export ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx
```

### Utilisation

```bash
# Démarrer l'assistant
bun run dev
# ou
bun start
```

Vous verrez apparaître le prompt `You:` - commencez à converser !

## 💬 Exemples d'utilisation

```
You: Lis le fichier package.json et résume-moi les dépendances

Claude: J'ai lu votre package.json. Voici un résumé des dépendances...
```

```
You: Crée un fichier config.ts avec une configuration TypeScript

Claude: Je vais créer le fichier pour vous...
Tool: edit_file ...
File created successfully
```

```
You: Liste tous les fichiers TypeScript du projet

Claude: Je vais utiliser le pattern glob pour trouver tous les fichiers .ts...
Tool: list_files ...
```

```
You: Modifie le fichier main.ts pour ajouter un commentaire au début

Claude: Je vais d'abord vérifier le fichier, puis effectuer la modification...
Tool: read_file ...
Tool: edit_file ...
File edited successfully
```

## 🏗️ Architecture

### Structure du projet

```
miracle/
├── main.ts          # Point d'entrée principal - loop de chat
├── tools.ts         # Définition des outils de gestion de fichiers
├── package.json     # Configuration et dépendances
└── README.md        # Ce fichier
```

### Composants clés

#### `main.ts`
- Gère la boucle de conversation interactive
- Communique avec l'API Claude via l'SDK Anthropic
- Exécute les outils demandés par Claude
- Affiche les réponses formatées en couleur

#### `tools.ts`
- **read_file** : Lit et retourne le contenu d'un fichier
- **list_files** : Liste les fichiers selon un pattern glob
- **edit_file** : Crée ou modifie un fichier
- **delete_file** : Supprime un fichier avec gestion d'erreurs

## 🔧 Technologie

| Technologie | Version | Rôle |
|-------------|---------|------|
| **Bun** | latest | Runtime JavaScript/TypeScript |
| **TypeScript** | ^5.9.3 | Langage de programmation |
| **Claude (Haiku)** | 4.5 | Modèle d'IA conversationnel |
| **Anthropic SDK** | ^0.71.0 | Client API pour Claude |
| **Zod** | ^4.1.13 | Validation de schéma |

## 🛡️ Protocoles de sécurité

L'assistant implémente des mesures de sécurité strictes :

1. **Avant toute modification/suppression**, Claude doit :
   - Lister les fichiers pour vérifier les chemins exacts
   - Demander une confirmation visuelle
   - Procéder uniquement après validation

2. **Gestion des erreurs** :
   - Messages d'erreur clairs pour les fichiers introuvables
   - Traitement sécurisé des exceptions

3. **Transparence** :
   - Affichage des outils utilisés
   - Retour explicite des résultats

## 📝 Commandes spéciales

- `exit` : Quitter la conversation
- `debug` : Afficher le contenu des messages et des outils (développement)
- `CTRL + C` : Quitter l'application

## 🎨 Interface utilisateur

L'application utilise des codes ANSI pour une meilleure lisibilité :

```
You: (bleu)
Claude: (jaune)
Tool: (vert)
```

## 🔄 Flux de fonctionnement

```
1. Utilisateur pose une question
2. Claude analyse la demande
3. Si besoin, Claude utilise les outils
4. Résultats retournés à Claude
5. Claude formule sa réponse
6. Réponse affichée à l'utilisateur
7. Retour à l'étape 1
```

## 📦 Dépendances

### Production
- `@anthropic-ai/sdk` : Client officiel Anthropic pour accéder à Claude
- `zod` : Validation de schémas TypeScript (implicite via le SDK)

### Développement
- `@types/bun` : Types TypeScript pour Bun
- `typescript` : Compilateur TypeScript

## 🤝 Contribution

Les contributions sont bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Améliorer la documentation
- Soumettre des pull requests

## 📄 Licence

Ce projet est sous licence ISC. Voir le fichier LICENSE pour plus de détails.

## 🎯 Cas d'usage

- 📚 Exploration rapide de codebases
- 🔧 Génération et édition de fichiers de configuration
- 📖 Assistance à la documentation
- 🧹 Refactoring et nettoyage de code
- 🤖 Automatisation de tâches récurrentes

## 🚦 Statut du projet

✅ **Production-ready** - Stable et utilisable pour des tâches réelles

## 📞 Support

Pour toute question ou problème, ouvrez une issue sur GitHub.

---

**Miracle** - Votre assistant IA pour la gestion intelligente de fichiers 🎯