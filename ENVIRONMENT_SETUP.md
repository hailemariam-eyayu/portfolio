# Environment Setup Guide

## Local Development

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Update the password in `.env.local`:
   ```env
   NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here
   ```

## Production Deployment (Vercel)

To set up the environment variable in Vercel:

1. Go to your Vercel dashboard
2. Select your portfolio project
3. Go to Settings → Environment Variables
4. Add a new environment variable:
   - **Name**: `NEXT_PUBLIC_ADMIN_PASSWORD`
   - **Value**: Your secure admin password
   - **Environment**: Production (and Preview if needed)

5. Redeploy your application for the changes to take effect

## Security Notes

- Use a strong password in production
- The `NEXT_PUBLIC_` prefix makes this variable available in the browser
- For enhanced security, consider implementing server-side authentication
- Never commit the `.env.local` file to version control

## Features Protected by Password

- ✅ Add new projects
- ✅ Edit existing projects  
- ✅ Delete projects

All operations now require admin password authentication for security.