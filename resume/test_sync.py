
import os
import sys
# Add current directory to path so we can import src
sys.path.append(os.getcwd())

from src.utils.sheets_sync import sync_lead_to_sheets
from src.config import settings

# Placeholder lead data
test_lead = {
    "full_name": "Test User",
    "whatsapp_number": "+919999999999",
    "highest_qualification": "B.Tech",
    "native_state": "Maharashtra",
    "created_at": "2023-10-27T10:00:00Z"
}

print(f"🚀 Testing Google Sheets Sync...")
print(f"Sheet ID configured: {settings.GOOGLE_SHEET_ID}")

try:
    sync_lead_to_sheets(test_lead)
    print("\n✅ Sync function executed successfully (check logs above for details).")
except Exception as e:
    print(f"\n❌ Sync function failed with exception: {e}")
