from flask import Flask, jsonify
from flask_cors import CORS
from predict import predict_with_randomforest,predict_with_poisson,predict_goalfor_with_poisson

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return jsonify({"language": "python"})


@app.route('/<int:match_id>')
def poisson(match_id):
    return jsonify(dict(zip(["randomforest","poisson","goalfor"],[predict_with_randomforest(match_id),predict_with_poisson(match_id),predict_goalfor_with_poisson(match_id)])))


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8889, debug=True)
