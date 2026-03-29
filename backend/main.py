from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StudentProfile(BaseModel):
    exam: str
    target_score: str
    current_score: str
    weak_subjects: List[str]
    learning_style: str
    time_left_weeks: int
    is_retaker: bool

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/recommend")
def recommend(profile: StudentProfile):
    recommendations = []

    if profile.is_retaker:
        recommendations.append({
            "title": f"{profile.exam} Retaker Strategy Guide",
            "type": "Guide",
            "reason": "Built for students who already attempted the exam and need a focused comeback plan."
        })

    for subject in profile.weak_subjects:
        recommendations.append({
            "title": f"Top resources for {subject}",
            "type": "Resource Bundle",
            "reason": f"Focused on improving your weak area: {subject}."
        })

    recommendations.append({
        "title": "7-Day Study Plan",
        "type": "Plan",
        "reason": "Gives you a clear weekly structure so you know what to do next."
    })

    return {
        "profile_summary": {
            "exam": profile.exam,
            "target_score": profile.target_score,
            "current_score": profile.current_score
        },
        "recommendations": recommendations
    }