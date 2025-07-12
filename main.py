from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel, EmailStr, Field
import joblib
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = joblib.load("lead_intent_model.pkl")
lead_store = {}

keyword_adjustments = {
    "urgent": 10,
    "quick": 10,
    "ready": 10,
    "not interested": -20,
    "no interest": -20,
    "just exploring": -5,
}

class LeadInput(BaseModel):
    email: EmailStr
    credit_score: int = Field(..., ge=300, le=850)
    age_group: str
    family_status: str
    income: int = Field(..., ge=0)
    comments: str

@app.post("/score")
def score_lead(lead: LeadInput):
    input_df = pd.DataFrame([{
        "credit_score": lead.credit_score,
        "age_group": lead.age_group,
        "family_status": lead.family_status,
        "income": lead.income,
        "comments": lead.comments
    }])

    score = model.predict_proba(input_df)[0][1]
    initial_score = round(score * 100)

    reranked_score = initial_score
    comment_text = lead.comments.lower()
    for keyword, impact in keyword_adjustments.items():
        if keyword in comment_text:
            reranked_score += impact

    reranked_score = min(max(reranked_score, 0), 100)

    lead_store[lead.email] = {
        "initial_score": initial_score,
        "reranked_score": reranked_score,
        "comment": lead.comments
    }

    return {
        "email": lead.email,
        "initial_score": initial_score,
        "reranked_score": reranked_score
    }

