# TaskManager

A responsive web-based Task Management System built with **Angular 17** that allows users to create, update, delete, and track their personal or team tasks efficiently.

## 🚀 Features

- 🔐 JWT-based User Authentication (Login & Registration)
- 📝 Create, Update, Delete Tasks
- 🎯 Task Filtering by Priority (High, Medium, Low)
- 📊 Task Status: Pending, In Progress, Completed
- 📁 User-Specific Task Dashboard
- 🌐 Angular Material UI for modern and responsive design

---

## 🛠️ Tech Stack

| Layer      | Technology         |
|------------|--------------------|
| Frontend   | Angular 17, TypeScript, HTML, CSS |
| Backend    | .NET Core (not included in this repo) |
| Database   | SQLite (assumed for backend) |
| Auth       | JWT (JSON Web Token) |
| UI Library | Angular Material   |

---

## 📦 Project Structure

```
taskmanager-ui/
├── src/
│   ├── app/
│   │   ├── auth/             # Login and Register Components
│   │   ├── tasks/            # Task Components (Add, Edit, List)
│   │   ├── dashboard/        # Task Status Overview
│   │   ├── services/         # Auth & Task Services
│   │   ├── guards/           # Auth Route Guard
│   │   └── app.module.ts     # Root Module
│   ├── assets/
│   └── index.html
├── angular.json
├── package.json
└── README.md
```

---

## 🔧 Setup & Installation

### 1. Clone the Repository

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The app will auto-reload on file changes.

---

## 🔐 Authentication

This project uses **JWT (JSON Web Token)** authentication. You can integrate it with any backend that supports JWT (e.g., ASP.NET Core, Node.js).

> 🔗 Note: Update `proxy.conf.json` to route requests to your backend API.



## 📈 Future Improvements

- ✅ Admin Panel
- 🔔 Notifications and Reminders
- 📱 PWA / Mobile App using Ionic
- 📂 File attachments for tasks
- 📅 Calendar Integration

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---



## 📚 References

- [Angular Documentation](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [JWT Guide](https://jwt.io/)

