## Flea Market
Based on the TI-83+ game 'Drug Wars'. Try to get a high score!

**Tech stuff:**  
Front end is React using Redux Toolkit for state management.  
Server is running a Flask app using Flask-Session to support server side sessions.
The client and server communicate via a simple REST api using fetch() method on client side.
High Scores DB is a MongoDB Atlas cluster. 
  
In production (via Heroku) the whole app runs on a Gunicorn server where Flask serves the static React side and the server routes.

All the game logic is on the server side with the UI as un-opinionated as possible. Every player gets their own server side session on connect that stores their game progress.

**Install Instructions**  
Client:  
$ cd client   
$ npm install  
  
Server:  
$ cd server  
$ python3 -m venv <name_of_virtualenv>  
in venv -> $pip install -r requirements.txt  
  
**Development Instructions**  
Client:  
$ cd client  
$ npm start  
  
Server:  
$ cd server  
$ source <name_of_virtualenv>/bin/activate  
$ export FLASK_ENV=development (_to enable reload on code change_)  
$ flask run  
  
**Troubleshooting: delete files in flask_session after updating object model**
