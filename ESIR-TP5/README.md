## ESIR-TP5 - Authentification


# Objectifs :

 réalisation d'un serveur d'authentification qui servira pour la suite du projet.


# Pour lancer l'api :

1. npm install 
2. npm start


# Pour lancer les tests :

 .  npm test
 
 
# Pour les éléments de configuration, voir dans le dossier config : 
 
 - les informations sur la base de données
 - les informations sur les ports
 - d'autres informations utiles
 


# Extention du TP :

 NB: Pour ce TP, on avait pas besoin d'utiliser une base de données. 
     Mais pour plus de d'interactivité et pour une question d persistance,
     j'ai utilisé une base de données.
     
# Pour enregistrer un user dans la base de données :  

 - Aller dans postman
 
 - Faire un post: POST http://127.0.0.1:3000/v1/users

    {
        "name": "Pedro Ramirez",
        "login": "pedro",
        "age": 44,
        "password": "$2b$10$wXazfEicMcPDX7DpAMwwzeXJhSYlIxTF9tmiMgoEFawikP0ljXq7e",
    }
    
    
  NB: l'id sera générer automatiquement, ce password est la version hachée de: 'pass' 
  
# Pour tester l'authentification :  

 - Aller dans dans postman
 
 - Activer l'option authenticate
 
 - Se logger: POST http://127.0.0.1:3000/v1/auth

 
    {
        "login": "pedro",
        "password": "pass"
    }
 
 
 Resultat:
 
 {
    "mesage": "OK",
    "access_token": "le token généré"
}

# Autre commandes:  

 - GET http://127.0.0.1:3000/v1/users  => récupère tous les users
 - GET http://127.0.0.1:3000/v1/users/userId  => récupère le user qui a pour id = userId
 - DELETE http://127.0.0.1:3000/v1/users/userId  => supprime le user qui a pour id = userId
 - PUT http://127.0.0.1:3000/v1/users/userId  => met à jour le user qui a pour id = userId

 
 
     