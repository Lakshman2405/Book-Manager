# 📚 Book Manager - Complete Full-Stack Application

## 🎯 Project Overview

A complete full-stack book management application demonstrating REST API development, CRUD operations, error handling, React Router navigation, and modern form handling techniques.


| Topic |
|-------|
| REST API with CRUD operations |
| CRUD + Error handling |
| React Router navigation |
| Forms (Controlled, Uncontrolled, React Hook Form) |


---

## ✨ Key Features

- 📚 Book Management (CRUD operations)
- 🔢 Inventory system (available copies tracking)
- 🔍 Search books by ID
- ✏️ Update book details with modal
- 🗑️ Delete single copy or entire book
- 📋 Copy Book ID to clipboard
- 🔔 Global Alert System (success/error feedback)
- 🧾 Task Management module
- 🧪 Forms Playground (Controlled, Uncontrolled, React Hook Form)
- ⚡ RESTful API with proper error handling

---

## 🛠️ Technologies Used
|Layer |	Technology |
|------|-------------|
|Backend |	Node.js, Express.js |
|Database	|MongoDB, Mongoose |
|Frontend	|React.js, Vite |
|Routing	|React Router DOM |
|HTTP Client |	Axios |
|Styling |	CSS (Custom) |
|Forms |	React Hook Form |

---

## ⚙️ Requirements

- Node.js (v16 or higher)
- MongoDB (local installation OR MongoDB Atlas)
- npm (comes with Node.js)

---

## 📁 Project Structure

```BOOK-MANAGER/
│
├── backend/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── bookController.js
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   └── errorhandler.js
│   │
│   ├── models/
│   │   ├── Book.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── bookRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── components/
│   │   │
│   │   │   ├── v1-no-router/
│   │   │   │   ├── AddBook.jsx
│   │   │   │   ├── BookCard.jsx
│   │   │   │   ├── SearchBook.jsx
│   │   │   │   ├── SearchedBook.jsx
│   │   │   │   └── UpdateBookModal.jsx
│   │   │   │
│   │   │   ├── v2-with-router/
│   │   │   │   ├── AddBookPage.jsx
│   │   │   │   ├── BooksPage.jsx
│   │   │   │   ├── HomePage.jsx
│   │   │   │   ├── NavBar.jsx
│   │   │   │   └── SearchBookPage.jsx
│   │   │   │
│   │   │   ├── v3-forms-demo/
│   │   │   │   ├── ControlledForm.jsx
│   │   │   │   ├── FormsHomePage.jsx
│   │   │   │   ├── ReactHookFormDemo.jsx
│   │   │   │   └── UncontrolledForm.jsx
│   │   │   │
│   │   │   ├── v4-tasks/
│   │   │   │   ├── TasksHomePage.jsx
│   │   │   │   ├── TaskList.jsx
│   │   │   │   ├── TaskCard.jsx
│   │   │   │   └── AddTask.jsx
│   │   │   │
│   │   │   └── AlertBar.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
└── README.md
```

---
## 🚀 Getting Started
### Prerequisites
- Node.js installed
- MongoDB installed locally or MongoDB Atlas account

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/BOOK-MANAGER.git
cd BOOK-MANAGER
```

2. Setup Backend
```bash
cd backend
npm install
node server.js
```

3. Setup Frontend (Open new terminal)
```bash
cd frontend
npm install
npm run dev
```

4. Open browser

```text
http://localhost:5173
```

---

## 🧪 How to Test

1. Add a new book using ISBN
2. Add same ISBN again → increases stock
3. Click "Copy ID" → verify clipboard
4. Search using copied ID
5. Update book → verify changes
6. Delete one copy → count decreases
7. Delete entire book → removed from list


---


## 🔐 Setup Environment Variables

Go to backend folder and create a `.env` file:

cd backend
touch .env

Add this inside `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/bookdb
```
---
## 🗄️ Start MongoDB

Make sure MongoDB is running:

mongod

Or open MongoDB Compass and connect to:

mongodb://127.0.0.1:27017

---
## 🛠️ Troubleshooting

- Backend not working:
  Check MongoDB is running

- API errors:
  Ensure backend runs on port 5000

- Port already in use:
  npx kill-port 5000
  npx kill-port 5173

- If install fails:
  rm -rf node_modules package-lock.json
  npm install



---
## 🔄 Complete Application Flow

### 1. Application Startup

```
Terminal 1: cd backend → node server.js
            ↓
  Backend starts on port 5000
            ↓
    MongoDB connected



Terminal 2: cd frontend → npm run dev
            ↓
Frontend starts on port 5173
            ↓
Browser opens http://localhost:5173
```






### 2. Navigation Flow (React Router)

```
User clicks Navbar link
        ↓
React Router changes URL
        ↓
App.jsx renders matching component
        ↓
Navbar highlights active link


```


| URL | Component | Page |
|-----|-----------|------|
| `/` | `HomePage` | Welcome page |
| `/books` | `BooksPage` | All books list |
| `/add-book` | `AddBookPage` | Add new book form |
| `/search-book` | `SearchBookPage` | Search by ID |
| `/forms` | `FormsHomePage` | Form demos |
| `/forms/controlled` | `ControlledForm` | Controlled form demo |
| `/forms/uncontrolled` | `UncontrolledForm` | Uncontrolled form demo |
| `/forms/react-hook-form` | `ReactHookFormDemo` | React Hook Form demo |




### 3. View All Books Flow

```
User clicks "All Books" (Navbar)
          ↓
URL changes to /books
          ↓
BooksPage component loads
          ↓
useEffect calls fetchBooks()
          ↓
axios.get('http://localhost:5000/api/books')
          ↓
Backend receives GET request
          ↓
bookController.getBooks() runs
          ↓
Book.find() fetches from MongoDB
          ↓
Returns JSON: { success: true, data: [...] }
          ↓
BooksPage saves to books state
          ↓
Maps books array to BookCard components
          ↓
User sees all books in grid layout
```





### 4. Add New Book Flow

```

User clicks "Add Book" (Navbar)
          ↓
URL changes to /add-book
          ↓
AddBookPage component loads
          ↓
Renders AddBook component (from v1-no-router)
          ↓
User fills form → types title, author, ISBN, etc.
          ↓
Form state updates via onChange (Controlled Component)
          ↓
User clicks "Add / Increase Stock"
          ↓
handleSubmit calls axios.post('http://localhost:5000/api/books', formData)
          ↓
Backend receives POST request
          ↓
bookController.createBook() runs
          ↓
Book.create() saves to MongoDB
          ↓
Returns JSON: { success: true, data: {...} }
          ↓
AddBook calls onBookUpdated with new book data
          ↓
Alert messsage shows " Book added successfully!"
          ↓
Redirects to /books page after 1.5 seconds
          ↓
New book appears in list

```



### 5. Update Book Flow


```
User clicks "Update" button on any BookCard
            ↓
setSelectedBook(book) is called
            ↓
    UpdateBookModal opens
            ↓
Modal pre-fills with current book data
            ↓
    User edits fields
            ↓
  User clicks "Save Changes"
            ↓
handleSubmit calls axios.put(/api/books/${book._id}, formData)
            ↓
    Backend receives PUT request
            ↓
bookController.updateBook() runs
            ↓
Book.findByIdAndUpdate() updates MongoDB
            ↓
Returns JSON with updated book data
            ↓
BooksPage updates books state
            ↓
      Modal closes
            ↓
Alert message appears "✅ Book updated successfully!"
            ↓
    Updated book reflects in list
```





### 6. Delete Copy Flow

```

User clicks "Delete Copy" button on any BookCard
              ↓
handleDeleteCopy(book._id) is called
              ↓
axios.delete(/api/books/${id}/copy)
              ↓
Backend receives DELETE request
              ↓
bookController.deleteCopy() runs
              ↓
Book.findById() finds the book
              ↓
book.available -= 1 (decreases by 1)
              ↓
      Saves updated book
              ↓
Returns JSON with updated book data
              ↓
BooksPage updates that specific book in state
              ↓
 Alert message appears " One copy deleted successfully!"
              ↓
Available copies count decreases by 1

```

### 7. Delete Entire Book Flow

```
User clicks "Delete Entire Book" button
            ↓
window.confirm() asks for confirmation
            ↓
If confirmed, handleDeleteBook(book._id) is called
            ↓
axios.delete(/api/books/${id})
            ↓
Backend receives DELETE request
            ↓
bookController.deleteBook() runs
            ↓
Book.findByIdAndDelete() removes from MongoDB
            ↓
  Returns success message
            ↓
BooksPage removes book from books state (filter)
            ↓
Alert message appears "Book deleted successfully!"
            ↓
  Book disappears from list
```

### 8. Search Book Flow

```
User clicks "Search Book" (Navbar)
          ↓
URL changes to /search-book
          ↓
SearchBookPage component loads
          ↓
Renders SearchBook component
          ↓
User pastes a Book ID and clicks "Search Book"
          ↓
handleSearch calls axios.get(/api/books/${searchId})
          ↓
Backend receives GET request
          ↓
bookController.getBook() runs
          ↓
Book.findById() finds book in MongoDB
          ↓
Returns JSON with book data
          ↓
SearchBook calls onBookFound(book)
          ↓
SearchedBook component displays book details
          ↓
User can Update, Delete Copy, or Delete Entire Book from here

```

### 9. Copy ID Flow

```
User clicks "📋 Copy" button on any BookCard
            ↓
copyToClipboard() function runs
            ↓
navigator.clipboard.writeText(book._id) - copies to clipboard
            ↓
setCopied(true) - shows green ✓ mark next to ID
            ↓
setTimeout hides ✓ mark after 1.5 seconds
            ↓
onCopy(showToast) triggers toast notification
            ↓
Alert message appears: "ID copied to clipboard"
            ↓
Alert auto-dismisses after 3 seconds
```

### 10. Error Handling Flow

```
Any API request fails
        ↓
Backend errorHandler middleware catches error
        ↓
Checks error type:
- CastError (invalid ID) → 404 "Resource not found"
- Duplicate key (same ISBN) → 400 "Duplicate ISBN entered"
- ValidationError → 400 with specific messages
- Other errors → 500 "Server Error"
          ↓
Frontend catch block receives error
          ↓
showToast(errorMessage, 'error')
          ↓
Error Alert message appears
          ↓
User sees friendly error message
```



---
## 🗄️ Database Schema (MongoDB)

```javascript
{
    _id: ObjectId,
    title: String (required),
    author: String (required),
    isbn: String (required, unique),
    publishedYear: Number,
    genre: String,
    available: Number (default: 1),
    createdAt: Date,
    updatedAt: Date
}
```


---
## 🔗 API Endpoints Summary

| Method | Endpoint | Purpose | Request Body | Response |
|--------|----------|---------|--------------|----------|
| **GET** | `/api/books` | Get all books | None | `{ success: true, count: number, data: [books] }` |
| **GET** | `/api/books/:id` | Get single book by ID | None | `{ success: true, data: book }` |
| **POST** | `/api/books` | Create new book | `{ title, author, isbn, publishedYear, genre }` | `{ success: true, data: book }` |
| **PUT** | `/api/books/:id` | Update book by ID | `{ title, author, isbn, publishedYear, genre, available }` | `{ success: true, data: book }` |
| **DELETE** | `/api/books/:id` | Delete entire book | None | `{ success: true, message: "Book deleted successfully" }` |
| **DELETE** | `/api/books/:id/copy` | Delete one copy (decrease available count) | None | `{ success: true, message: "One copy deleted successfully", data: book }` |

---

## 🔔 Alert System (UI Feedback)

The application uses a global AlertBar component for user feedback instead of toast notifications.

- Displays success and error messages
- Appears at top of UI
- Auto-dismisses after a few seconds
- Triggered via `showAlert(message, type)`

Types:
- success
- error
- info

---
## 📋 Sample API Responses

### GET /api/books (Success)
```json
{
    "success": true,
    "count": 3,
    "data": [
        {
            "_id": "69b91063789917635952b4dd",
            "title": "1984",
            "author": "George Orwell",
            "isbn": "978-0-452-28423-4",
            "publishedYear": 1949,
            "genre": "Dystopian",
            "available": 9,
            "createdAt": "2026-03-17T08:27:15.969Z",
            "updatedAt": "2026-04-07T08:42:23.065Z"
        }
    ]
}
```
### GET /api/books/:id (Book Not Found - Error)
```json
{
    "success": false,
    "message": "Book not found"
}
```
### GET /api/books/invalidID (CastError - Error)

```json
{
    "success": false,
    "message": "Resource not found"
}
```
### POST /api/books (Validation Error)

```json
{
    "success": false,
    "message": "Book title is required, Author name is required, ISBN is required"
}
```
### POST /api/books (Duplicate ISBN - Error)
```json
{
    "success": false,
    "message": "Duplicate ISBN entered"
}
```
### POST /api/books (Success)
```json
{
    "success": true,
    "data": {
        "_id": "69d4c7af23a25947db288b26",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "isbn": "9780743273565",
        "publishedYear": 1925,
        "genre": "Fiction",
        "available": 1,
        "createdAt": "2026-04-07T09:00:31.047Z",
        "updatedAt": "2026-04-07T09:00:31.047Z"
    }
}
```
### PUT /api/books/:id (Success)
```json
{
    "success": true,
    "data": {
        "_id": "69d4c7af23a25947db288b26",
        "title": "Life of Dinosaurs",
        "author": "F. Ronald Fitzgerald",
        "isbn": "9780743273566",
        "publishedYear": 1925,
        "genre": "Science Fiction",
        "available": 1,
        "createdAt": "2026-04-07T09:00:31.047Z",
        "updatedAt": "2026-04-07T09:08:18.550Z"
    }
}
```
### DELETE /api/books/:id (Success)
```json
{
    "success": true,
    "message": "Book deleted successfully"
}
```
### DELETE /api/books/:id/copy (Success)
```json
{
    "success": true,
    "message": "One copy deleted successfully",
    "data": {
        "_id": "69b91063789917635952b4dd",
        "title": "1984",
        "author": "George Orwell",
        "isbn": "978-0-452-28423-4",
        "publishedYear": 1949,
        "genre": "Dystopian",
        "available": 8,
        "createdAt": "2026-03-17T08:27:15.969Z",
        "updatedAt": "2026-04-18T10:30:00.000Z"
    }
}
```
### DELETE /api/books/:id/copy (No Copies Available - Error)
```json
{
    "success": false,
    "message": "No copies available to delete"
}
```

---

## 🚦 HTTP Status Codes Used
|Status Code |	Meaning	| When Used |
|------------|----------|-----------|
|200 |  OK |	GET, PUT, DELETE successful |
|201 |	Created	| POST successful (new book created) |
|400 |	Bad Request |	Validation error, Duplicate ISBN |
|404 |	Not Found	| Book not found, Invalid ID (CastError) |
|500 |	Internal Server Error |	Unexpected server error |


---
## 📝 Request Body Formats
### POST /api/books (Create New Book)
```json
{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "isbn": "9780743273565",
    "publishedYear": 1925,
    "genre": "Fiction"
}
```
### PUT /api/books/:id (Update Book)
```json
{
    "title": "Updated Title",
    "author": "Updated Author",
    "isbn": "9781234567890",
    "publishedYear": 2024,
    "genre": "Updated Genre",
    "available": 5
}
```
Note: All fields are optional in PUT request. Only send the fields you want to update.



---
## Dependencies
### Backend Dependencies
```json
{
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "nodemon": "^3.0.1"
}
```

### Frontend Dependencies
```json
{
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "axios": "^1.6.0",
    "react-hook-form": "^7.48.0"
}
```


---
## 🧠 Design Decisions

- Instead of storing duplicate books, the system uses an **inventory-based model**:
  - Each book is unique (by ISBN)
  - `available` field tracks number of copies

- Modular frontend structure:
  - v1 → core components
  - v2 → routing pages
  - v3 → forms demo
  - v4 → tasks module

- Global Alert System replaces toast notifications:
  - Avoids UI overlap issues
  - Centralized feedback mechanism

---
## ⚠️ Limitations & Future Improvements

- No authentication (any user can modify data)
- No pagination for large datasets
- Search only by ID (can be extended to title/author)
- No role-based access control

### Future Enhancements:
- 🔐 Add JWT Authentication
- 🔍 Advanced search (title, author, ISBN)
- 📊 Dashboard analytics (total books, tasks)
- 📦 Pagination & filtering
- ☁️ Deploy to cloud (Render / Vercel / MongoDB Atlas)



---

## 👨‍💻 Author
Lakshman Guru Sai(Lakshman2405)


---

## 📄 License
This project is created for educational purposes as part of course assignments.

























