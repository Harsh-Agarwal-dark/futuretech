import os
from dotenv import load_dotenv
from typing import Optional

# Load .env file
load_dotenv()

class Settings:
    # Google Cloud Storage Settings
    GCS_BUCKET_NAME = os.getenv("GCS_BUCKET_NAME", "user-resumes-storage-01")
    GOOGLE_CLOUD_PROJECT = os.getenv("GOOGLE_CLOUD_PROJECT", "project-353fe44f-aa79-48fc-91d")
    GCS_SERVICE_ACCOUNT_EMAIL = os.getenv("GCS_SERVICE_ACCOUNT_EMAIL")
    
    # Google Auth Settings (Railway/Production)
    GOOGLE_APPLICATION_CREDENTIALS_JSON = os.getenv("GOOGLE_APPLICATION_CREDENTIALS_JSON")
    RAILWAY_OIDC_TOKEN = os.getenv("RAILWAY_OIDC_TOKEN")
    
    # Supabase Settings
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    
    # Google Sheets Settings
    GOOGLE_SHEET_NAME = os.getenv("GOOGLE_SHEET_NAME", "FutureTech_Data")
    
    # AI Configuration
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Create a singleton instance
settings = Settings()
