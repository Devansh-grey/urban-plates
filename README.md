#  Urban Plates – Food Delivery Web App

A full-stack food delivery application built with the **MERN stack** that allows users to browse food items, add them to cart, place orders, and complete payments online. The platform also includes an **admin panel for managing food items and orders**.

This project demonstrates modern **full-stack development practices**, including REST APIs, authentication, payment gateway integration, and responsive UI design.

---

#  Features

## User Features
- User authentication (Register / Login)
- Browse available food items
- Add items to cart
- Place orders
- Online payment using Razorpay
- View order history
- Responsive UI for mobile and desktop

## Admin Features
- Add new food items
- Delete food items
- View all customer orders
- Update order status

---

#  Tech Stack

## Frontend
- React.js
- Context API (State Management)
- Axios
- CSS

## Backend
- Node.js
- Express.js

## Database
- MongoDB

## Other Tools
- Razorpay Payment Gateway
- JWT Authentication
- RESTful APIs

---

#  Project Structure

```
food-delivery-app
│
├── frontend
│   ├── components
│   ├── pages
│   ├── context
│   └── assets
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   └── config
│
└── admin
    ├── components
    └── pages
```

---

#  Installation & Setup

## 1. Clone the repository

```bash
git clone https://github.com/yourusername/urban-plates.git
cd urban-plates
```

## 2. Install dependencies

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

### Admin Panel
```bash
cd admin
npm install
```

---

#  Environment Variables

Create a `.env` file in the **backend** folder and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
```

---

#  Running the Application

Start backend server:

```bash
cd backend
npm run server
```

Start frontend:

```bash
cd frontend
npm run dev
```

Start admin panel:

```bash
cd admin
npm run dev
```

---

#  Payment Integration

This application integrates **Razorpay** for secure online payments.

Payment Flow:
1. User places an order
2. Backend creates Razorpay order
3. Razorpay checkout opens on frontend
4. Payment is verified on backend
5. Order status is updated in the database

---

#  UI Design

The UI uses a modern food-delivery inspired theme with:

- Primary Color: `#ff6a00`
- Accent Color: `#7a1c1c`
- Font: **Poppins**

The design focuses on:
- Clean layout
- Card-based UI
- Responsive design
- Smooth user experience

---

#  Authentication

Authentication is implemented using **JWT (JSON Web Tokens)**.

Protected routes include:
- Order placement
- Viewing orders
- Admin operations

Middleware verifies the token before allowing access to protected endpoints.

---

#  Future Improvements

- Real-time order tracking
- Push notifications
- Rating and review system
- Restaurant dashboard
- Image upload optimization (Cloudinary / AWS S3)
- Docker deployment

---



#  Author

**Devansh Vashisht**

- Full Stack Developer
- Security Analyst
- Interested in Web Development & Cybersecurity

---

#  Support

If you like this project, give it a ⭐ on GitHub!
