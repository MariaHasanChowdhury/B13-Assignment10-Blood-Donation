# 🩸 BloodBridge - Blood Donation Application

## Purpose
BloodBridge is a full-stack blood donation platform that connects blood donors with those in need. Users can register as donors, create blood donation requests, search for donors by blood group and location, and contribute funds to support the organization. The platform supports three user roles: Admin, Volunteer, and Donor, each with different access levels and permissions.

## Live URL
🌐 https://b13-assignment10-blood-donation-hi6y86r8b.vercel.app/

## Admin Credentials
- 📧 Email: admin@bloodbridge.com
- 🔑 Password: Admin@1234

## Client Side GitHub Repository
🔗 https://github.com/MariaHasanChowdhury/B13-Assignment10-Blood-Donation/tree/main/client

## Server Side GitHub Repository
🔗 https://github.com/MariaHasanChowdhury/B13-Assignment10-Blood-Donation/tree/main/server

---

## Key Features
- User registration with ImageBB avatar upload
- JWT based authentication and authorization
- Role based dashboard for Admin, Volunteer and Donor
- Create, edit, delete and manage blood donation requests
- Filter and pagination for donation requests
- Admin can block, unblock users and change user roles
- Donor search by blood group, district and upazila
- Stripe payment integration for community funding
- Fully responsive design for mobile, tablet and desktop
- Framer Motion animations throughout the website

---

## NPM Packages Used

### Client Side
| Package | Purpose |
|---------|---------|
| react-router-dom | Page routing and navigation |
| axios | HTTP requests to server |
| react-hook-form | Form handling and validation |
| react-hot-toast | Success and error notifications |
| @stripe/react-stripe-js | Stripe payment UI components |
| @stripe/stripe-js | Stripe payment integration |
| recharts | Data visualization charts |
| react-icons | Icons throughout the app |
| framer-motion | Animations and transitions |
| tailwindcss | Utility first CSS styling |

### Server Side
| Package | Purpose |
|---------|---------|
| express | Web server framework |
| mongoose | MongoDB object modeling |
| jsonwebtoken | JWT authentication |
| bcryptjs | Password hashing |
| stripe | Payment gateway integration |
| cors | Cross origin resource sharing |
| dotenv | Environment variable management |
| nodemon | Auto restart during development |