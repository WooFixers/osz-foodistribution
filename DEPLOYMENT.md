# Step-by-Step Vercel Deployment Guide for `osz-next`

This guide walks you through deploying your Next.js application (`osz-next`) to Vercel. Since your App uses Supabase (Database/Auth) and Resend (Emails), we will make sure everything is configured properly for the production environment.

---

## 📋 1. Prerequisites

Before you begin, ensure you have the following ready:
- A [Vercel](https://vercel.com/) account.
- A remote Git repository (GitHub, GitLab, or Bitbucket) with your `osz-next` code pushed to it.
- Your project's integration credentials ready:
  - **Supabase:** Dashboard URL, Anon Key, and Service Role Key.
  - **Resend:** API Key and a Verified Domain setup in Resend.
  - **Google Tag Manager:** Your container ID (Optional but recommended).

---

## 🚀 2. Create the Project on Vercel

1. Log into your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click the **`Add New...`** button in the top right corner and select **`Project`**.
3. Locate your Git repository containing the `osz-next` application under *Import Git Repository* and click **`Import`**.
   - *Note: If this project rests inside a subdirectory of a larger mono-repo (e.g., your repo is `osz-foodistribution` and the Next.js app sits in `osz-next`), use the **`Root Directory`** setting to select the `osz-next` folder.*

---

## ⚙️ 3. Configure the Deployment Settings

Vercel will usually auto-detect your Framework. Ensure the settings look like this:
- **Framework Preset:** `Next.js`
- **Build Command:** `next build` (Vercel uses the defaults from your `package.json`)
- **Output Directory:** `.next` (Default)
- **Install Command:** `npm install` (Next.js automatically uses your `package-lock.json`)

---

## 🔐 4. Add Environment Variables

Before clicking Deploy, expand the **`Environment Variables`** section to add the configurations required by your application. Copy the required variables corresponding to your `.env.local.example` file:

| Key | Value (Example/Description) |
| :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.osz-foodistribution.ma` (Your prod URL) |
| `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXXX` (Your Google Tag Manager ID) |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://[YOUR_INSTANCE].supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` (Public Anon Key) |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGc...` (Secret Service Role Key) |
| `RESEND_API_KEY` | `re_xxxx...` (Your live Resend API key) |
| `RESEND_FROM_EMAIL` | `noreply@osz-foodistribution.ma` (Must be verified in Resend) |
| `RESEND_TO_EMAIL` | `commande@osz-foodistribution.ma` |

*Add each variable one by one and click `Add`, or you can copy the contents of your `.env.local` directly into the first key box to bulk-paste them!*

---

## 🛳️ 5. Deploy!

Click the **`Deploy`** button. 

Vercel will now clone your repository, run the `npm install` dependencies phase, build your Next.js application, and deploy it to a `.vercel.app` preview URL. Wait a couple of minutes until you see the success confetti! 🎉

---

## 🌐 6. Post-Deployment Steps (Domains & Integrations)

Once your application is live on a Vercel-generated URL, execute these final setups:

### A. Assign Your Custom Domain
1. In your Vercel Project Dashboard, go to **`Settings` > `Domains`**.
2. Add your custom domain (e.g., `www.osz-foodistribution.ma`).
3. Vercel will give you DNS Records (A and CNAME). Add these records inside your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.).

### B. Configure Supabase Redirect URLs
If you are using Supabase Authentication, Supabase needs to know your production URL to process logins securely.
1. Go to your Supabase Dashboard > **`Authentication`** > **`URL Configuration`**.
2. Set the *Site URL* to your Production Domain (`https://www.osz-foodistribution.ma`).
3. In *Redirect URLs*, add the production domain and any Vercel preview URLs if needed.

### C. Verify Domain in Resend
For `RESEND_FROM_EMAIL` to work correctly in a production environment:
1. Log into [Resend](https://resend.com) > **`Domains`**.
2. Ensure you have added and verified the `osz-foodistribution.ma` domain using DNS records. Without this, your contact/order forms will fail to send emails!
