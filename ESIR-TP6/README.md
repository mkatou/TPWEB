## ESIR-TP6 - API alerte


# Objectifs :

 réalisation d'une api pour les alertes.


# Pour lancer l'api :

1. npm install 
2. npm start


# Pour lancer les tests :

 .  npm test
 
# Pour les éléments de configuration, voir dans le dossier config :

 - les informations sur la base de données
 - les informations sur les ports
 - d'autres informations utiles
 

# Pour enregistrer une alerte:

 - Aller dans postman:
 - Demarrer l'API alert (TP6)
 - Faire un post: POST http://127.0.0.1:3000/v1/alerts
 

    {
        "type": "weather",
        "label": "label2",
        "status": "danger",
        "from": "donzelot",
        "to": "mirabeau"
    }
 
 