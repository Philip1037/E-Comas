# Maison Lumière Boutique - Live Hosting & Client Handoff Manual

This guide covers how to deploy the **Maison Lumière Boutique** web platform live for free using **Vercel** or **Render**, connect a cloud database (Supabase), set up WhatsApp & email automation, and transfer complete ownership to a client when sold.

---

## ⚡ Quick Hosting Options (100% Free Tier)

### Option A: Vercel (Recommended - Fast 1-Click Setup)
1. Push this project code repository to your GitHub / GitLab account.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your `STORE WEBSITE` GitHub repository.
4. Click **Deploy**. Vercel will automatically detect Next.js and build your live site with a free SSL domain (e.g. `https://maison-lumiere.vercel.app`).

### Option B: Render (Web Service)
1. Go to [render.com](https://render.com) and create a free account.
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository.
4. Set Build Command: `npm run build` and Start Command: `npm start`.
5. Click **Create Web Service**. Render will host your live app at `https://maison-lumiere.onrender.com`.

---

## ⚙️ Setting Up Live Backend Database (Supabase)

1. Create a free account at [supabase.com](https://supabase.com) and create a project named `Boutique DB`.
2. Go to **SQL Editor** in your Supabase dashboard.
3. Open `supabase/schema.sql` from this codebase, copy the entire SQL script, and click **RUN**.
4. Go to **Project Settings -> API** in Supabase and copy:
   - `Project URL`
   - `anon / public API key`
5. Add these environment variables in your Vercel or Render project settings:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   RESEND_API_KEY=your-resend-api-key-optional
   ```

---

## 📧 Free 3,000 Monthly Emails Setup (Resend.com)

To send real automated welcome emails and order receipts to customer inboxes for FREE (up to 3,000 emails/month, no credit card required):

1. Go to [resend.com](https://resend.com) and create a free account.
2. Click **API Keys** -> **Create API Key**.
3. Copy your API Key (looks like `re_123456789...`).
4. Paste `RESEND_API_KEY=re_123456789...` into your **Render** or **Vercel** Environment Variables.
5. Save & Redeploy. All VIP welcome emails and admin broadcasts will send live to recipient inboxes!

---

## 🔐 Changing Admin Portal Username & Secret Password

The store owner can update their login credentials anytime directly inside the Admin Portal:

1. Log into the Admin Portal (`/admin`).
2. Go to **Boutique Settings** (`/admin/settings`).
3. Scroll down to **Admin Access Credentials & Security**.
4. Update **Admin Username / Email** and **Admin Secret Password**.
5. Click **Save All Settings**. The new username and password take effect immediately!


## 📲 How the Non-Technical Business Owner Configures the Store (Zero Coding)

When a client purchases the website, transfer the Admin Panel credentials to them:

1. **Access Admin Panel**: Go to `https://your-website-url/admin`
2. **Go to Settings Tab**:
   - Change **Boutique Brand Name** & **Tagline**
   - Update **Admin WhatsApp Direct Order Number**
   - Paste their **Official WhatsApp VIP Group Link** (`https://chat.whatsapp.com/...`)
   - Enter their **Orange Money Merchant Till ID** & Cashout Number
   - Enter their **AfriMoney Merchant Till ID** & Cashout Number
   - Toggle **Demo Mode** off when going live with real transactions.
3. Click **Save All Settings**.

---

## 📣 WhatsApp Broadcasting & VIP Group Automation

- **VIP Member Group Joining**: When customers sign up for VIP access on the homepage, they get an instant button to join the store's official WhatsApp VIP Group.
- **Admin Dual Broadcast Hub** (`/admin/subscribers`):
  - **Option 1**: Launch 1-click promotional announcements to the **WhatsApp VIP Group**.
  - **Option 2**: Send personalized private WhatsApp messages to individual VIP members.
  - **Option 3**: Export subscriber CSV list for WhatsApp Business Broadcast channels.

---

## 🔒 Client Ownership Handoff Checklist

When selling this website to a client:
- [ ] Transfer GitHub repo or Vercel project access to the client.
- [ ] Update Admin login password in `/app/admin/login/page.tsx` or Supabase auth.
- [ ] Help client input their Orange Money & AfriMoney merchant codes in Admin Settings.
- [ ] Paste client's WhatsApp phone number & VIP Group invite link.
- [ ] Disable Demo Banner in Admin Settings.
