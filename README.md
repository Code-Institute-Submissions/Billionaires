# Billionaires
**Interactive Data visualisation Web Application**

This Web App was built as the second project for the Code Institute's classroom bootcamp. 
It is a Data Visualisation project using Pythons Flask framework and Javascript libraries
such as D3.js & DC.js.


## Live Demo

**Follow this link to view deployed version of the web app https://arcane-fjord-14490.herokuapp.com/**


## Components

#### D3.js
A JavaScript based visualisation engine that renders interactive charts 
and graphs in svg format when given data, which are then passed in to divs in index.html

#### DC.js
A Javascript based wrapper library for D3.js - this made plotting the charts easier

#### Crossfilter.js
A Javascript based data manipulation library that enables two way data binding - 
you will see this in action when a section of a graph is clicked, all the other graphs filter

#### Queue.js
An asynchronour helper library for JavaScript

#### Flask
A Python micro-framework that was used to serve the data and render the HTML pages for this Application

#### Python
A Python file name dashboard.py renders a graphs.html template and builds a web server to interact with MongoDB

#### MongoDB
NoSQL database that converts and presents data in JSON format. 

#### Dataset
The dataset used can be obtained [here](https://think.cs.vt.edu/corgis/csv/billionaires/billionaires.html)


## Deployment / Hosting

This Application was deployed and is hosted on Heroku - gunicorn Python package runs the http server for the app, 
the Procfile gives Heroku the information to run the app and requirements.txt is a file that conains all the Python 
packages (pip installs) required to run the app. mLab MongoDB was chosen to host the dataset on the server.


## Installation

Follow the below instructions to get this project up & running on Mac (commands will be slightly different for Windows)

1. Download MongoDB & Robo3T
2. Go to folder you want to put the cloned project in your terminal & type:
    `$ git clone https://github.com/conorc470/Billionaires`
3. Create & Activate a new Virtual Environment in terminal:
    Create: `$ python3 -m venv ~/virtualenvs/name_of_environment`
    Activate: `$ source ~/virtualenvs/name_of_environment/bin/activate`
4. Install the project dependancies:
    `$ pip install -r requirements.txt`
5. Get Mongod running
    `$ mongod --config config/mongoConfig.conf`
6. Open the folder in vscode and use the internal Terminal 
7. Navigate to the 'dashboard.py', right click and select 'Run python file in terminal'
8. You should see it running below - go to your browser and type '127.0.0.1:5000' into the address bar and the application should appear


## Testing
This Application was tested across a range of browsers





