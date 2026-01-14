# PayQuick Frontend Demo

A React + TypeScript frontend demo for **PayQuick**, a mock app for sending and receiving money securely.  

This demo focuses on:  

- User login and authentication  
- Viewing transaction history grouped by month  
- Pagination (Next/Previous)  
- Search and filtering (client-side)  
- Loading skeletons and error states  
- Responsive UI using **Tailwind CSS** and **ShadCN UI**  

> **Note:** This is a frontend demo only. The backend endpoints are assumed to be available from the fe_challenge_api repo.

---

## Features

- **Login page** with authentication  
- **Transactions table** with month grouping  
- **Pagination** and client-side **search**  
- **Skeleton loading** and **error handling**  
- **Navbar** and basic mock dashboard layout  
- Built with **React + TypeScript**, **Redux Toolkit**, **Tailwind CSS**, **ShadCN UI**, and **React Router**  

---

## Prerequisites

- Node.js v18+  
- npm or yarn  

---

## Getting Started

1. **Clone the repository**

```bash
git clone git@github.com:maki019/payquick-fe.git
cd payquick-fe
```

**or**
```bash
git clone https://github.com/maki019/payquick-fe.git
cd payquick-fe
```


1. **Run the app**

```bash
npm run dev
```

---

## Additional notes
***In the fe_challenge_api backend repo, please install cors and the following code in the root index.ts file:***
```bash
npm i cors
```
***and then add***
```bash
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

This will remove the cors issue if encountered.

