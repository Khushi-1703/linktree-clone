# 🌳 Bittree — Linktree Clone (Next.js + MongoDB)

A modern **Linktree clone** built with **Next.js, MongoDB, and Tailwind CSS** that lets users create a personalized page to showcase all their important links in one place.

---

## 🚀 Features

* 🔗 Create a custom handle (e.g. `/khushi`)
* 🧩 Add multiple links with custom titles
* 🖼️ Add profile picture and description
* 🌐 Dynamic public profile pages
* ⚡ Fast and responsive UI
* 🔒 Backend validation & error handling
* 📦 MongoDB integration for data storage

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router), React
* **Styling:** Tailwind CSS
* **Backend:** Next.js API Routes
* **Database:** MongoDB
* **Notifications:** React Toastify

---

## 📂 Project Structure

```
/app
  ├── page.js              # Homepage
  ├── generate/page.js     # Create Bittree page
  ├── [handle]/page.js     # Dynamic user page

/api
  └── add/route.js         # API to create Bittree

/lib
  └── mongodb.js           # MongoDB connection

/components
  └── Navbar.js           # Navbar component
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/bittree.git
cd bittree
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Setup environment variables

Create a `.env.local` file in the root:

```env
MONGODB_URI=your_mongodb_connection_string
```

---

### 4️⃣ Run the development server

```bash
npm run dev
```

Now open 👉 http://localhost:3000

---

## 🧠 How it works

1. User enters a handle on homepage
2. Redirects to `/generate`
3. User adds:

   * Links
   * Profile picture
   * Description
4. Data is sent to `/api/add`
5. Stored in MongoDB
6. Public page generated at:

```
/your-handle
```

---

## ⚠️ Important Notes

* Handles must be **unique**
* Links are validated before saving
* Empty or invalid data is rejected
* Uses optimized Next.js Image component

---

## 🔮 Future Improvements

* 🔐 Authentication (Login/Signup)
* 🎨 Theme customization
* 📊 Analytics (click tracking)
* ✏️ Edit/Delete links
* 🌍 Custom domains
* 📱 Mobile UI enhancements

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 💡 Inspiration

Inspired by **Linktree**, built as a learning + portfolio project.

---

## 👨‍💻 Author

Made with ❤️ by **Khushi**

---

⭐ If you like this project, give it a star!
