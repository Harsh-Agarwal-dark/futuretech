## Railway Deployment Instructions

### Frontend Service Settings

**Start Command:**
```
npx serve -s dist -l $PORT
```

**Note:** The `-s` flag enables Single Page Application (SPA) mode, which is required for React Router to handle virtual routes like `/profile` and `/resumes`. Existing files like `landing.html` will still be served directly.

### Environment Variables
- `VITE_API_URL` - Backend URL (e.g., `https://your-backend.up.railway.app`)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
