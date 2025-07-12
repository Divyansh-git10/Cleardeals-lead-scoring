import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import GradientBoostingClassifier
import joblib

# Load dataset
df = pd.read_csv("lead_data.csv")

# Target: convert intent_score > 50 => 1 (high intent), else 0
y = (df["intent_score"] > 50).astype(int)

# Features
categorical_features = ["age_group", "family_status"]
numerical_features = ["credit_score", "income"]
feature_columns = categorical_features + numerical_features

X = df[feature_columns]

# Preprocessing
preprocessor = ColumnTransformer([
    ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features)
], remainder="passthrough")

# Pipeline
clf = Pipeline(steps=[
    ("pre", preprocessor),
    ("model", GradientBoostingClassifier())
])

# Train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
clf.fit(X_train, y_train)

# Save model
joblib.dump(clf, "lead_intent_model.pkl")
print("✅ Model saved as lead_intent_model.pkl")
