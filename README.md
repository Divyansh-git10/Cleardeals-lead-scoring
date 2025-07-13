\# Cleardeals Lead Scoring 🔍



This is a full-stack AI-powered Lead Scoring Engine built for Cleardeals AI Internship Assignment.



\## 🔧 Tech Stack

\- \*\*Backend:\*\* FastAPI + Scikit-learn + Joblib

\- \*\*Frontend:\*\* React + Axios

\- \*\*Model:\*\* GradientBoostingClassifier

\- \*\*Data:\*\* Custom lead dataset with fields like age group, credit score, family status, income \& comments.



\## 🚀 Features

\- Predicts lead intent score (0–100) using ML.

\- Reranks score based on comments using keyword-based rules.

\- Shows results in real-time on a frontend table.



\## 📁 Folder Structure



```



Cleardeals-lead-scoring/

├── main.py

├── retrain\\\_model.py

├── lead\\\_data.csv

├── lead\\\_intent\\\_model.pkl

├── requirements.txt

├── frontend/           # React frontend

│   ├── public/

│   └── src/



````



\## ⚙️ Setup Instructions



\### 1. Backend (FastAPI)

```bash

pip install -r requirements.txt

python -m uvicorn main:app --reload

````



\### 2. Frontend (React)



```bash

cd frontend

npm install

npm start

```



\## 📡 API Endpoint



`POST /score`



\*\*Request JSON:\*\*



```json

{

&nbsp; "email": "user@example.com",

&nbsp; "credit\_score": 750,

&nbsp; "age\_group": "26-35",

&nbsp; "family\_status": "Single",

&nbsp; "income": 55000,

&nbsp; "comments": "ready to proceed urgently"

}

```



\*\*Response JSON:\*\*



```json

{

&nbsp; "email": "user@example.com",

&nbsp; "initial\_score": 68,

&nbsp; "reranked\_score": 88

}

```



\## 👨‍💻 Author



\*\*Divyansh Gautam\*\*

\[GitHub Profile](https://github.com/Divyansh-git10)



---



