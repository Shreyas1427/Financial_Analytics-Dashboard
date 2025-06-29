
# 💰 Financial Analytics Dashboard

A **full-stack financial dashboard** built using **React**, **Node.js**, **Express**, and **MongoDB**, with a **JWT-authenticated login system**, **interactive data visualization**, **advanced filters**, and **CSV export functionality**.

> 🔐 Authenticated users can view and analyze revenue, expenses, and transactions in real-time.

---

## 📌 Table of Contents

1. [📦 Features](#-features)  
2. [🚀 Tech Stack](#-tech-stack)  
3. [🧰 Setup Instructions](#-setup-instructions)  
4. [📡 API Documentation](#-api-documentation)  
5. [📊 Charts and Visuals](#-charts-and-visuals)  
6. [📤 CSV Export Modal](#-csv-export-modal)  
7. [📄 Project Structure](#-project-structure)  
8. [🙌 Contributors & Acknowledgments](#-contributors--acknowledgments)

---

## 📦 Features

### ✅ Core Features

| Area              | Features                                                      |
|-------------------|---------------------------------------------------------------|
| 🔐 Authentication | JWT-based Login/Register, Protected Routes                    |
| 📈 Dashboard      | Summary cards for revenue, expenses, profit, loss             |
| 📊 Charts         | Line Chart (monthly trend), Pie Chart, Calendar Heatmap       |
| 📃 Table          | Searchable, scrollable, paginated, filterable transaction list|
| 🔎 Filters        | Date Range, Category (Revenue/Expense), Status (Paid/Pending) |
| 📤 Export         | CSV export modal with configurable columns                    |
| 📄 Profile Page   | View user name and email, logout button                       |
| 📫 Message Page   | Placeholder for messaging with "No new message" text          |

---

## 🚀 Tech Stack

### 🔧 Backend
- Node.js + Express  
- MongoDB + Mongoose  
- JWT Authentication  
- CSV generation (`json2csv`)

### 🎨 Frontend
- React + TypeScript  
- React Router DOM  
- MUI (Material UI)  
- Axios  
- Recharts  
- React Calendar Heatmap  
- Day.js

---

## 🧰 Setup Instructions

### 🗄️ Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance_dashboard
JWT_SECRET=your_super_secret_jwt_key
```

Start the server:

```bash
npm run dev
```

### 🖥️ Frontend

```bash
cd frontend
npm install
npm start
```

App runs at: http://localhost:3000

### 🔐 Credentials Example

```txt
email: admin@example.com
password: password123
```

---

## 📡 API Documentation

### 🔐 Auth Routes

Method | Endpoint           | Description
-------|--------------------|---------------------------------------------
POST   | /api/auth/register | Register with name, email, password
POST   | /api/auth/login    | Login with email and password (returns JWT)

### 📄 Transactions API

Method | Endpoint                  | Description
-------|---------------------------|--------------------------------------------
GET    | /api/transactions         | Fetch transactions (supports filters)
GET    | /api/transactions/export  | Export filtered data to CSV

### 🔎 Query Parameters for /api/transactions

Param      | Type    | Description
-----------|---------|-----------------------------
search     | string  | Search user ID, status, or category
category   | string  | Revenue or Expense
status     | string  | Paid, Pending, or Failed
page       | number  | Pagination page number
limit      | number  | Items per page
startDate  | string  | ISO start date
endDate    | string  | ISO end date

---

## 📊 Charts and Visuals

### 📈 Line Chart
- Shows revenue and expense by month
- Responsive
- Reacts to filter changes (date, category, status)

### 🗓️ Calendar Heatmap
- Displays transaction activity per day
- Tooltip shows total transactions and amount

### 🥧 Pie Chart
- Paid vs Pending (Revenue & Expense)
- 4 categories:
  - Revenue - Paid
  - Revenue - Pending
  - Expense - Paid
  - Expense - Pending

---

## 📤 CSV Export Modal

- Modal UI with “Export CSV” button
- Exports currently filtered data
- CSV contains headers and formats fields cleanly
- Backend handles export using query filters

---

## 📄 Project Structure

```bash
Financial_Analytics-Dashboard/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── server.ts
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/api.ts
│   └── App.tsx
```

---

## 🧠 Extra Features Added

- 🔐 Persistent JWT auth using localStorage
- 🔒 Protected routes using <ProtectedRoute />
- 🧠 Advanced filtering (search + category + status + date)
- 🎨 Modern UI using MUI and custom theming
- 📄 Profile page with logout
- 📫 Message page placeholder
- ❌ Cancel Date Filter Button
- 📥 CSV export with real-time filters

---

## 🙌 Contributors & Acknowledgments

Created with by Shreyas Kempwade  
Figma design inspiration and open-source packages used with appreciation.
