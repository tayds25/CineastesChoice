# Cineaste's Choice

This project is a Personalized Movie Recommendation Application that uses Google's Gemini API to suggest movies tailored to individual user preferences. The application analyzes movie attributes such as genre, cast, director, and plot to provide recommendations based on user input.

This project is developed as part of our Application Development and Emerging Technologies Course.


## Creators

- DE AUSTRIA, Mars Andrei
- DELOS SANTOS, Tayshaun
- GUZMAN, Neil Brags
- TUASON, Paul Leonard
- YDIO, Riel Andrei


## Documentation

[Planning Deliverables](https://docs.google.com/document/d/1fTf7k4W9xQbLRtqovgkYg1ge-_qTpJ0l1CPcjB897LY/edit?usp=sharing)


## Development

1. Clone the repository
```bash
git clone [repo-url]
cd CineastesChoice
```

2. Create and activate the virtual environment
```bash
cd back-end
python -m venv venv
.\venv\Scripts\activate
```

3. Install the required dependencies
```bash
pip install -r requirements.txt
```

4. Start the Flask server
```bash
python app.py
```

5. Open new terminal and navigate to back-end
```bash
cd back-end
python movies.py
```

The server will run at `http://localhost:5000`

- SQLite database will be created at `back-end\instance\users.db`

6. Open a new terminal and navigate to the front end

```bash
  cd front-end
```

7. Open the website

```bash
  npm run dev
```
