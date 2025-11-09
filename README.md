# Movie Project (Django + React)

A simple full-stack Movie Management app using Django REST API & React.

---

##  Quick Start (Development)

### 1) Backend — Django API

```bash
cd movie_project/backend
Create and activate virtual environment:
```

```bash
python3 -m venv venv
source venv/bin/activate
```
Install dependencies:

```bash
pip install -r requirements.txt
```
Apply migrations:
```bash
python3 manage.py makemigrations
python3 manage.py migrate
```
(Optional) Create admin user:
```bash
python3 manage.py createsuperuser
```
Run backend:
```bash
python3 manage.py runserver
```

2) Frontend — React App

```bash
cd movie_project/frontend
```
Install dependencies:
```bash
npm install
```

Run frontend:

```bash
npm start
```
Run with Docker (optional)
```bash
```docker-compose up --build

Done!
Backend → http://127.0.0.1:8000
Frontend → http://localhost:3000# django-react-movie-app
