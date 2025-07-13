# 🚀 Lead Scoring App

A simple yet effective AI-powered Lead Scoring Web App that combines **machine learning** and **rule-based logic** for smarter lead prioritization. Built using **FastAPI**, **React**, and **Scikit-learn**.

---

## 🌟 Features

- 🎯 Predicts lead conversion probability using a trained ML model
- 🧠 Applies LLM-style *rule-based reranking* for better business decisions
- ⚡ FastAPI backend + React frontend
- 🖥️ Real-time feedback with dynamic scoring display

---

## 🗂️ Project Structure

```

lead-scoring/
├── backend/
│   ├── app.py               # FastAPI app
│   ├── lead\_score.pkl       # Trained ML model
│   ├── utils.py             # Reranker logic
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
└── README.md

````

---

## 🛠️ Setup Instructions

### 🔹 Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
````

### 🔹 Frontend (React)

```bash
cd frontend
npm install
npm start
```

---

## 🔍 How It Works

1. User submits lead form via frontend
2. Backend `/score-lead` endpoint:

   * Predicts lead score using `lead_score.pkl`
   * Applies `utils.py` reranker (e.g., reject blacklisted emails, boost high budgets)
3. Final score returned with remarks

---

## 🚫 Render Deployment Note

> ❌ Deployment on Render failed due to `scikit-learn==1.1.3` being incompatible with Render's default Python `3.13`.

✅ All code, API, and ML logic are fully working **locally**.

---

## 📬 Feedback & Ideas

This demo app is part of a lead scoring challenge — feel free to extend it with:

* OpenAI/GPT-based reranking
* Pinecone memory for past leads
* Scoring history database

---

**Made with ❤️ by Divyansh Gautam**

```

---