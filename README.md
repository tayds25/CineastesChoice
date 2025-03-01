# Movie Recommendation Application using a Content-Based Filtering AI System

This project is a Personalized Movie Recommendation Application that uses a Content-Based Filtering AI System to suggest movies tailored to individual user preferences. The application analyzes movie attributes such as genre, cast, director, and plot to provide recommendations based on user input or viewing history.

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

2. Create and activate virtual environment
```bash
python -m venv venv
.\venv\Scripts\activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Start the Flask server
```bash
cd backend
python app.py
```

The server will run at `http://localhost:5000`

- SQLite database will be created at `backend/instance/users.db`

5. Open a new terminal and start the front end:

```bash
  cd front-end
```

6. Open the website:

```bash
  npm run dev
```
