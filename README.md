# daMerzougStore

## To run use : 
`$ npm install`
`$ npm run dev`

## Documentation DaMerzougStore
Ce projet est une **API RESTful** servant de backend pour une application de gestion d'objets ("things") avec système d'authentification.

Il est construit avec **Node.js**, **Express**, **MongoDB** et utilise des technologies comme **JWT**, **bcrypt** et **multer**.

## BackEnd

### **1. Installation**

1. **Prérequis** :
    - Node.js,
    - Nodemon `npm install --save-dev nodemon`
    - Express `npm install Express`
    - Mangoose `npm install mangoose`
    - bcrypt`npm install bcrypt`
    - Jsonwebtoken `npm install jsonwebtoken`
    - Multer`npm install multer`
    - Fichier `.env` à la racine avec : `npm install dotenv`

```
MONGO_URI=mongodb://votre_uri_mongodb
```


### **2. Architecture du Projet**

backend/
├── app.js            
├── server.js         
├── controllers/      
│   ├── user.js       
│   └── stuff.js      
├── routes/          
│   ├── user.js

│   └── stuff.js

├── models/           
│   ├── User.js

│   └── Thing.js

├── middleware/       

│   ├── auth.js

│   └── multer-config.js

└── images/          

### **3. Endpoints API**

### **Authentification**
| **Méthode** | **Endpoint** | **Description** | **Body Requis** |
| --- | --- | --- | --- |
| POST | `/api/auth/signup` | Crée un utilisateur | `{ "email": "test@test.com", "password": "test" }` |
| POST | `/api/auth/login` | Génère un token JWT | `{ "email": "test@test.com", "password": "test" }` |


### **Objets (Protégés par JWT)**

| **Méthode** | **Endpoint** | **Description** | **Headers Requis** |
| --- | --- | --- | --- |
| GET | `/api/stuff` | Liste tous les objets | `Authorization: Bearer <token>` |
| POST | `/api/stuff` | Crée un objet (avec image) | `Authorization: Bearer <token>` + `multipart/form-data` |
| GET | `/api/stuff/:id` | Détails d'un objet | `Authorization: Bearer <token>` |
| PUT | `/api/stuff/:id` | Modifie un objet | `Authorization: Bearer <token>` (+ image si modification) |
| DELETE | `/api/stuff/:id` | Supprime un objet | `Authorization: Bearer <token>` |

### **4. Modèles de Données**

### **Utilisateur (`User`)**

| **Champ** | **Type** | **Validation** |
| --- | --- | --- |
| `email` | String | Unique, requis |
| `password` | String | Requis |

### **Objet (`Thing`)**

| **Champ** | **Type** | **Validation** |
| --- | --- | --- |
| `title` | String | Requis |
| `description` | String | Requis |
| `imageUrl` | String | Requis (URL de l'image) |
| `price` | Number | Requis |
| `userId` | String | Requis (ID utilisateur) |

---

### **5. Sécurité**

- **JWT** : Les routes `/api/stuff/*` nécessitent un token valide dans le header.
- **Hachage** : Les mots de passe sont hachés avec `bcrypt` (10 tours de salage).
- **CORS** : Configuré pour autoriser toutes les origines ().
- **Fichiers** : Les images sont stockées dans le dossier `images/` avec des noms uniques.

---

### **6. Middleware**

### **`auth.js`**

- **Fonction** : Vérifie la validité du token JWT.
- **Utilisation** : Ajouté aux routes protégées.
- **Exemple** :
    
    
    ```
    router.get("/api/stuff", auth, stuffController.getAllThings);
    ```
    

### **`multer-config.js`**

- **Fonction** : Gère l'upload des images.
- **Configuration** :
    - Stocke les images dans `images/`.
    - Renomme les fichiers pour éviter les conflits (ex: `image_1625148891234.jpg`).

---

### **7. Gestion des Erreurs**

| **Code** | **Scénario** | **Exemple de Réponse** |
| --- | --- | --- |
| 400 | Requête invalide (ex: email déjà utilisé) | `{ "error": "Erreur de validation" }` |
| 401 | Token manquant/invalide | `{ "error": "Authentification requise" }` |
| 403 | Action non autorisée | `{ "message": "Non autorisé" }` |
| 404 | Objet non trouvé | `{ "error": "Objet introuvable" }` |
| 500 | Erreur serveur | `{ "error": "Erreur interne" }` |

### **10. Améliorations Possibles**

- Utiliser HTTPS en production.
- Ajouter une validation des données (ex: format d'email, complexité du mot de passe).
- Implémenter un système de rate-limiting pour les tentatives de connexion.
- Utiliser des variables d'environnement pour la configuration de multer

