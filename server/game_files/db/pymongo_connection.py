from bson import ObjectId
from pymongo import MongoClient
import pymongo
import urllib.parse
from .db_keys import user, password, clusterId, dbId, dbName, collectionName

CONNECTION_STRING = f"mongodb+srv://{urllib.parse.quote_plus(user)}:{urllib.parse.quote_plus(password)}@{clusterId}/{dbId}"
client = MongoClient(CONNECTION_STRING)
db = client[dbName]
collection = db[collectionName]


def test():

    # python -c 'import pymongo_insert; pymongo_insert.test()'

    # to insert stuff:
    # document = {"_id": ObjectId(), "user_name": "hi", "score": 2000}
    # collection.insert_one(document)

    # to query top scores:

    scores = list(collection.find({}, {'_id': 0}).sort(
        'score', pymongo.DESCENDING).limit(2))

    print(scores)


def insert_high_score(name, score):
    document = {"_id": ObjectId(), "user_name": name, "score": score}
    collection.insert_one(document)
    return

# retrieve number of scores as indicated
# find all records, use a projection to exclude the _id field from return
# query results come back as a pymongo.cursor.Cursor and we will turn it into a list of dictionaries with list


def retrieve_high_scores(number_of_scores):
    scores = list(collection.find({}, {'_id': 0}).sort(
        'score', pymongo.DESCENDING).limit(number_of_scores))
    return scores


def check_high_score(score):
    # check if current score > the number 10 high score. if there are not 10 scores any score will count as high score.

    scores = list(collection.find({}, {'_id': 0}).sort(
        'score', pymongo.DESCENDING).limit(10))

    number_of_scores = len(scores)

    if number_of_scores < 10:
        return True

    if number_of_scores >= 10:
        cutoff_score = scores[9]['score']

    if score > cutoff_score:
        return True
    else:
        return False
