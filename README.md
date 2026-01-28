#  BiteBuddy – Full Stack Food Ordering System

BiteBuddy ek **full-stack food ordering web application** hai jisme **User Panel** aur **Admin Panel** dono alag-alag hain.  
Project real-world concepts jaise **JWT Authentication, Role-based Access, Razorpay Payment Gateway, CORS handling** ko follow karta hai.

---

##  Features

###  User Panel
- Food list view (public access)
- Category & search filter
- Add to cart & order place
- Razorpay payment integration
- Order create after successful payment

###  Admin Panel
- Secure admin login (JWT based)
- Dashboard with live stats
- Add / delete / update food items
- Accept / reject orders
- View & manage customer messages

---

##  Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router
- Razorpay Checkout

### Backend
- Spring Boot
- Java
- JWT (JSON Web Token)
- REST APIs
- Maven

### Database
- MySQL

---

##  Authentication & Authorization

- Admin login JWT based hai
- JWT token browser ke **localStorage** me store hota hai
- Protected APIs ke liye header me token bheja jata hai:

