from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
 
app = Flask(__name__)
 
MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'billionaires'
COLLECTION_NAME = 'stream2'
 
 
@app.route("/")
def index():
    return render_template("index.html")
 
 
@app.route("/billionaires/stream2")
def donor_projects():

    FIELDS = {
        '_id': False, 'funding_status': True, 'school_state': True,
        'resource_type': True, 'poverty_level': True,
        'date_posted': True, 'total_donations': True
    }

    with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
        collection = conn['billionaires']['stream2']
        stream2 = collection.find(projection=FIELDS, limit=55000)
        return json.dumps(list(stream2))
 
 
if __name__ == "__main__":
    app.run(debug=True)