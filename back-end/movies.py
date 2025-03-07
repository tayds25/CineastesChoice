from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from ast import literal_eval

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load dataset
md = pd.read_csv('dataset/movies_metadata.csv', low_memory=False)
md = md.drop([19730, 29503, 35587])  # Drop corrupted rows
md['id'] = md['id'].astype('int')

# Process genres
md['genres'] = md['genres'].fillna('[]').apply(literal_eval).apply(lambda x: [i['name'] for i in x] if isinstance(x, list) else [])

# Extract unique genres
all_genres = sorted(set(genre for sublist in md['genres'] for genre in sublist))

@app.route('/genres', methods=['GET'])
def get_genres():
    return jsonify(all_genres)

@app.route('/movies', methods=['GET'])
def get_movies_by_genre():
    """Returns a list of movies based on the selected genre."""
    genre = request.args.get('genre', '')

    if not genre:
        return jsonify({"error": "No genre provided"}), 400

    # Filter movies based on the genre
    filtered_movies = md[md['genres'].apply(lambda x: genre in x)][['title', 'vote_average', 'vote_count']].dropna().to_dict(orient='records')

    return jsonify(filtered_movies)

if __name__ == '__main__':
    app.run(port=5001, debug=True)
