# 📚 Skimly

_A lightweight AI-powered tool to summarize, store, and manage articles & PDFs._

---

## 🚀 Features
- 🔐 User authentication (Sign up / Login)
- 📑 Upload & summarize articles/PDFs
- 🗂️ Personal dashboard to view summaries
- 🔍 Keyword extraction for quick insights
- 🌐 Deployed backend + frontend

---

## 🛠️ Tech Stack
**Frontend:** React, VanillaCSS  
**Backend:** Flask, SQLAlchemy  
**Database:** SQLite / PostgreSQL (switchable)  
**Deployment:** Vercel / Render  

---

## 📸 Screenshots

### 🔐 Authentication


### 📑 Dashboard


### 📄 Article Summaries


---

## ⚙️ Installation

### 1. Clone repo
```bash
git clone https://github.com/your-username/skimly.git
cd skimly
```

### 2. Backend Setup
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate   # On Windows
source .venv/bin/activate  # On Mac/Linux

pip install -r requirements.txt

# Run Flask app
flask --app app run
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 API Routes

### Health Check
```
GET /ping
```

### Create User
```
POST /api/users
{
  "email": "test@example.com",
  "password": "123456"
}
```

### Create Article
```
POST /api/articles
{
  "email": "test@example.com",
  "title": "AI Revolution",
  "summary": "AI is changing the world...",
  "keywords": ["AI", "tech", "future"]
}
```





## 📌 Roadmap
- [ ] User profile page  
- [ ] Advanced search filters  
- [ ] Export summaries to PDF  
- [ ] Team collaboration  



## Made by 
Akshaya S K
akshayask176@gmail.com
