# LitSpots 📍

LitSpots is a real-time social discovery web app that helps people find and join live social hangouts nearby. Whether it’s a casual sutta session, night outs, gaming meetups, music jams, or spontaneous get-togethers, LitSpots shows the hottest spots happening right now.

---


https://github.com/user-attachments/assets/874d1e14-1e5a-4fc8-a4e4-1199d63b0297


---
## Introduction

Social plans don’t need weeks of planning. **LitSpots** is built for spontaneity, helping users discover live hangouts in real time and connect with people nearby. Users can explore ongoing spots, join instantly, or host their own hangout for others to discover.

---

## Features

-  Real-time hangout discovery  
-  Location-based social spots  
-  Join or host spontaneous meetups  
-  Secure authentication using JWT  
-  Email notifications via Nodemailer  
-  Fast, modern UI with Next.js & React  
-  Styled using Tailwind CSS  

---

## Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- 
### Database
- MongoDB

### Authentication & Utilities
- JWT (jsonwebtoken)
- Password hashing (bcryptjs)
- Email service (nodemailer)
- Environment management (dotenv)

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/litspots.git
cd litspots
npm install
```

## Configuration
Create a .env file in the root directory with the following variables:
```
MONGO_URI=
TOKEN_SECRET=
DOMAIN=
MAILER_USER=
MAILER_PASS=
JWT_SECRET=
```
---

## Running the App
Start the development server
```bash
npm run dev
```
Open your browser and navigate to:
```bash
http://localhost:3000
```
