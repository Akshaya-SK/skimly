# Skimly - AI PDF Summarizer

Skimly is a web application that allows users to upload PDFs and get instant AI-generated summaries. It provides a secure login system, stores your upload history, and helps you stay productive by condensing lengthy documents in seconds.

## Features

Fast AI Summaries – Get concise, accurate summaries from any PDF.

Secure Authentication – Sign up, login, and protect your files.

Upload History – Access your past uploads anytime.

Responsive Design – Works smoothly on desktop and mobile.

## Tech Stack

Frontend: React, Bootstrap, AOS (Animate on Scroll), Lucide Icons

Backend: Python, Flask, JWT Authentication

Database: SQLite/PostgreSQL (your choice in backend)

API Requests: Axios

## Installation

### Clone the repository:
```bash
git clone https://github.com/your-username/skimly.git
cd skimly
```

### Setup Backend:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
python -m backend.app
```

### Setup Frontend:

```bash
cd frontend
npm install
npm start
```

The frontend will run on http://localhost:3000
the backend on http://localhost:5000


### Usage

Open the app in your browser.

Sign up / login to create an account.

Click Upload PDF in your account page or homepage (if logged in).

Add a title (optional) and select a PDF file to upload.

View your PDF summaries and history in My Account.

#### Authentication

Protected routes are available only for logged-in users.

JWT token (skimly_token) is stored in localStorage.

### Deployment

This project can be deployed using platforms like Vercel or Netlify (frontend) and Heroku or Railway (backend).

## Live Demo: [Add your deployment link here]

Made by Akshaya S K