# 📚 Book Manager - Full-Stack Application

A complete full-stack book management system built with Node.js, Express, MongoDB, React, and Vite. Demonstrates REST API development, CRUD operations, React Router navigation, and three different form-handling approaches (Controlled, Uncontrolled, React Hook Form).

**Repository:** [https://github.com/Lakshman2405/Book-Manager](https://github.com/Lakshman2405/Book-Manager)

---

## Quick Overview

**What It Does:**
- Manage book inventory with add, view, update, delete functionality
- Search books by unique ID
- Smart ISBN-based stock tracking (adding same ISBN increases count, not creates duplicate)
- Three form handling demonstrations
- Task management module
- Global alert notification system

**Tech Stack:**
- Backend: Node.js + Express.js + MongoDB + Mongoose
- Frontend: React 19 + React Router + Vite + Axios
- Styling: CSS (dark theme)

---

## Features & How They Work

### 1. Book Management (CRUD)

**View All Books:**
- Click "All Books" → fetches GET `/api/books` → displays grid of book cards
- Each card shows: title, author, ISBN, year, genre, available copies, ID

**Add New Book:**
- Fill form (title, author, ISBN, year, genre) → Submit
- Backend checks: Does ISBN already exist?
  - **Yes**: Increase `available` count by 1, return success
  - **No**: Create new book with `available: 1`
- Auto-redirect to `/books` on success
- Alert shows: "Book added" or "Stock increased to 2"

**Update Book:**
- Click "Update" button on any book → Modal opens with pre-filled fields
- Edit fields → Click "Save Changes"
- Sends PUT `/api/books/{id}` with updated data
- Book updates in list and modal closes
- Alert: "Book updated successfully"

**Delete One Copy:**
- Click "Delete Copy" → Confirms with dialog
- Sends DELETE `/api/books/{id}/copy`
- Backend decreases `available` by 1
- Stock count decreases in UI
- Alert: "One copy deleted"

**Delete Entire Book:**
- Click "Delete Entire Book" → Confirms with dialog
- Sends DELETE `/api/books/{id}`
- Backend removes book completely
- Book disappears from list
- Alert: "Book deleted successfully"

**Search by ID:**
- Click "Search Book" → Navigate to `/search-book`
- Paste copied ID → Click "Search"
- Sends GET `/api/books/{id}`
- Shows found book or error message
- Can update/delete from search results too

**Copy ID to Clipboard:**
- Click "Copy" button → ID copied to clipboard
- Shows green checkmark for 1.5 seconds
- Alert: "ID copied to clipboard"

### 2. Smart ISBN-Based Inventory

**How It Works:**
- Each book is uniquely identified by ISBN
- Adding a book with ISBN "123" and available=1
- Adding another book with ISBN "123" → doesn't create new entry
- Instead: finds existing book and increases `available` from 1 to 2
- This prevents duplicate books in database

**User Experience:**
1. Add book: "The Great Gatsby" with ISBN "9780743273565" → created with available=1
2. Add same book with ISBN "9780743273565" → "Stock increased to 2"
3. Add again → "Stock increased to 3"
4. Now there's only 1 book entry with available=3 copies

### 3. Forms Playground

**Three Different Approaches to Form Handling:**

**Controlled Form:**
- React state controls every input value
- `onChange` event updates state on every keystroke
- Can validate, show errors in real-time
- Best for: complex forms needing validation

**Uncontrolled Form:**
- HTML form manages its own state
- Use `useRef` to access values when needed
- Minimal re-renders
- Best for: simple forms, file inputs

**React Hook Form:**
- Library handles form state and validation
- Minimal re-renders (only on submit)
- Complex validation rules built-in
- Best for: production apps, performance-critical forms

---

## Database Schema

### Book Model
```
{
  title: String (required, max 200 chars)
  author: String (required)
  isbn: String (required, unique)
  publishedYear: Number (optional)
  genre: String (optional)
  available: Number (default 1, min 0)
  timestamps: createdAt, updatedAt (auto)
}
```

**Why `isbn` is unique:** Prevents duplicate book entries. If ISBN exists, stock count increases instead of creating new entry.

**Why `available` field:** Tracks quantity/stock count. Replaces duplicate book entries (don't store 3 separate entries for 3 copies).

### Task Model
```
{
  title: String
  description: String
  completed: Boolean (default false)
  createdAt: Date (auto)
}
```

---

## Project Structure

```
BOOK-MANAGER/
├── backend/
│   ├── config/database.js              ← MongoDB connection
│   ├── controllers/bookController.js   ← CRUD business logic
│   ├── controllers/taskController.js   ← Task CRUD logic
│   ├── middleware/errorhandler.js      ← Error handling
│   ├── models/Book.js                  ← Book schema & validation
│   ├── models/Task.js                  ← Task schema
│   ├── routes/bookRoutes.js            ← Book endpoints
│   ├── routes/taskRoutes.js            ← Task endpoints
│   ├── .env                            ← Environment variables
│   ├── package.json
│   └── server.js                       ← Express app
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── v1-no-router/           ← Older non-Router version (reference)
│   │   │   ├── v2-with-router/         ← Current main version
│   │   │   │   ├── HomePage.jsx
│   │   │   │   ├── BooksPage.jsx
│   │   │   │   ├── AddBookPage.jsx
│   │   │   │   ├── SearchBookPage.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   ├── v3-forms-demo/          ← Forms learning module
│   │   │   │   ├── ControlledForm.jsx
│   │   │   │   ├── UncontrolledForm.jsx
│   │   │   │   ├── ReactHookFormDemo.jsx
│   │   │   │   ├── FormsHomePage.jsx
│   │   │   ├── v4-tasks/               ← Task management
│   │   │   │   ├── TasksHomePage.jsx
│   │   │   │   ├── TaskList.jsx
│   │   │   │   ├── TaskCard.jsx
│   │   │   │   ├── AddTask.jsx
│   │   │   └── AlertBar.jsx            ← Global notifications
│   │   ├── App.jsx                     ← Router configuration
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Purpose | Request Body | Response |
|--------|----------|---------|--------------|----------|
| GET | `/api/books` | Get all books | None | `{ success, count, data: [...] }` |
| GET | `/api/books/:id` | Get single book | None | `{ success, data: {...} }` |
| POST | `/api/books` | Add book or increase stock | `{ title, author, isbn, publishedYear, genre }` | `{ success, message, data: {...} }` |
| PUT | `/api/books/:id` | Update book | `{ title, author, isbn, genre, available, ... }` | `{ success, data: {...} }` |
| DELETE | `/api/books/:id` | Delete entire book | None | `{ success, message }` |
| DELETE | `/api/books/:id/copy` | Delete one copy (decrease available) | None | `{ success, message, data: {...} }` |

**Example Responses:**

**GET /api/books** (Success):
```json
{
    "success": true,
    "count": 2,
    "data": [
        {
            "_id": "507f1f77bcf86cd799439011",
            "title": "1984",
            "author": "George Orwell",
            "isbn": "978-0451524935",
            "publishedYear": 1949,
            "genre": "Dystopian",
            "available": 3,
            "createdAt": "2024-04-18T10:00:00Z",
            "updatedAt": "2024-04-18T10:00:00Z"
        }
    ]
}
```

**POST /api/books** (New Book):
```json
{
    "success": true,
    "message": "New book added successfully",
    "data": { /* book object */ }
}
```

**POST /api/books** (Existing ISBN):
```json
{
    "success": true,
    "message": "Stock increased. Now 2 copies available.",
    "data": { /* updated book with available: 2 */ }
}
```

**DELETE /api/books/:id/copy** (Success):
```json
{
    "success": true,
    "message": "One copy deleted successfully",
    "data": { /* book with available count decreased */ }
}
```

**Error Response:**
```json
{
    "success": false,
    "message": "Book not found"
}
```

---

## User Flows

### Flow 1: Adding a Book
```
User enters: Title="1984", Author="Orwell", ISBN="123", Year=1949
       ↓
Click "Add / Increase Stock"
       ↓
Frontend: POST /api/books with data
       ↓
Backend: Check if ISBN "123" exists?
       ├─ YES → Increase available by 1 → Return "Stock increased to 2"
       └─ NO → Create new book with available=1 → Return "New book added"
       ↓
Frontend: Show alert and reset form
       ↓
Auto-redirect to /books page after 1.5 seconds
       ↓
User sees new/updated book in list
```

### Flow 2: Updating a Book
```
User clicks "Update" button on book card
       ↓
Modal opens with pre-filled current book data
       ↓
User edits fields (e.g., change genre to "Fiction")
       ↓
Clicks "Save Changes"
       ↓
Frontend: PUT /api/books/{id} with updated data
       ↓
Backend: Find book by ID → Update fields → Return updated book
       ↓
Frontend: Update that book in books array → Modal closes
       ↓
Show alert: "Book updated successfully"
```

### Flow 3: Deleting One Copy
```
User clicks "Delete Copy" button
       ↓
Confirmation dialog: "Delete one copy?"
       ↓
If NO → Do nothing
If YES:
       ↓
Frontend: DELETE /api/books/{id}/copy
       ↓
Backend: Find book → available > 0? → Yes: decrease by 1, save
       ↓
Return updated book with available decreased
       ↓
Frontend: Update that book in list
       ↓
Show alert: "One copy deleted successfully"
```

### Flow 4: Searching by ID
```
User copies ID using "Copy" button
       ↓
Navigate to /search-book page
       ↓
Paste ID in input field
       ↓
Click "Search"
       ↓
Frontend: GET /api/books/{id}
       ↓
Backend: Find book by ID → Return it (or error if not found)
       ↓
Frontend: Display book details
       ↓
User can Update/Delete this book from search results
```

---

## Setup & Installation

### Prerequisites
- Node.js 16+ 
- MongoDB (local: `mongod` command, or use MongoDB Atlas cloud)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
```

**Create `.env` file:**
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/bookdb
```

**Start MongoDB** (if running locally):
```bash
mongod
```

**Start Backend:**
```bash
node server.js
```

Expected output:
```
✅ Server running on port 5000
📚 API: http://localhost:5000/api/books
✅ Tasks API: http://localhost:5000/api/tasks
```

### Frontend Setup (New Terminal)

```bash
cd frontend
npm install
npm run dev
```

Expected output:
```
  VITE v8.0.4  ready in 234 ms

  ➜  Local:   http://localhost:5173/
```

### Access Application

Open browser and visit: **http://localhost:5173/**

You should see:
- Navigation bar with links (All Books, Add Book, Search, Forms, Tasks)
- Home page with feature cards
- Fully functional book management system

---

## Frontend Routes

| URL | Component | What It Shows |
|-----|-----------|---------------|
| `/` | HomePage | Welcome page with feature cards |
| `/books` | BooksPage | Grid of all books with CRUD buttons |
| `/add-book` | AddBookPage | Form to add new book or increase stock |
| `/search-book` | SearchBookPage | Input to search book by ID |
| `/forms` | FormsHomePage | Forms playground menu |
| `/forms/controlled` | ControlledForm | Demo: React state controls input |
| `/forms/uncontrolled` | UncontrolledForm | Demo: useRef accesses DOM values |
| `/forms/react-hook-form` | ReactHookFormDemo | Demo: Library handles form state |
| `/tasks` | TasksHomePage | Create, view, complete, delete tasks |

---

## Implementation Details

### How Smart ISBN Deduplication Works

**BookController - createBook() function:**

When user submits form to add book:

1. Extract ISBN from request body: `isbn = "9780451524935"`
2. Query database: `Book.findOne({ isbn: "9780451524935" })`
3. If found:
   - Existing book already has `available: 1`
   - Increase: `existingBook.available += 1` → now `available: 2`
   - Save to database
   - Return: "Stock increased. Now 2 copies available"
4. If not found:
   - Create new book document
   - Set `available: 1` (default)
   - Save to database
   - Return: "New book added successfully"

**Result:** Multiple copies tracked in single document instead of duplicate entries.

### How Alerts Work

**App.jsx (root component):**
- Creates alert state: `{ message: "", type: "success/error" }`
- Creates `showAlert()` function
- Passes to child pages via props: `<BooksPage showAlert={showAlert} />`

**AlertBar.jsx:**
- Receives message, type, onClose
- Renders if message exists
- Auto-closes after 2.5 seconds using `useEffect` + `setTimeout`
- Manual close button (×)

**Usage in any component:**
```jsx
showAlert('Book added successfully', 'success');
// or
showAlert('Failed to fetch books', 'error');
```

### How Delete Copy Works

**Endpoint:** DELETE `/api/books/{id}/copy`

**Backend logic:**
1. Find book by ID
2. Check if `available > 0`
3. If yes: `available -= 1` and save
4. If no: return error "No copies available to delete"
5. Return updated book

**Frontend logic:**
1. Confirmation dialog
2. If confirmed: send DELETE request
3. Update that book in books array with response data
4. Stock count decreases in UI instantly

### How Modal Update Works

**User clicks "Update" on book:**
1. Set `selectedBook = book` in state
2. `UpdateBookModal` receives `book` prop
3. Pre-fills form inputs with current book data
4. User edits → form updates local state
5. Click "Save Changes" → PUT request with updated data
6. Backend saves and returns updated book
7. Frontend updates books array
8. Modal closes by setting `selectedBook = null`
9. Show success alert

---

## Key Design Decisions

**Why inventory-based model?**
- Storing 3 separate book entries for 3 copies wastes database space
- Using `available: 3` field is more efficient
- Makes stock tracking cleaner

**Why multiple component versions (v1, v2, v3, v4)?**
- v1: Teaching version (all features in one non-Router file)
- v2: Best practice version (Router + modular components)
- v3: Learning forms (3 different approaches)
- v4: Task module practice

**Why global AlertBar?**
- Avoids UI overlap of multiple toasts
- Centralized notification system
- Easy to show/hide from any component

**Why Vite over Create React App?**
- Faster dev server startup
- Faster hot module replacement
- Optimized production build
- Modern tooling

---

## Common Issues & Solutions

| Problem | Solution |
|---------|----------|
| Backend not running | Verify MongoDB is running (`mongod` in terminal) |
| "Cannot connect to MongoDB" | Check MONGODB_URI in .env file |
| Port 5000 already in use | `npx kill-port 5000` or change PORT in .env |
| Port 5173 already in use | `npx kill-port 5173` or restart frontend |
| CORS errors | Backend has `app.use(cors())` enabled |
| "Book not found" error | Verify book ID is correct (use Copy button) |
| Add book gives error | Check: title, author, ISBN are filled |
| Stock doesn't increase | Make sure ISBN matches exactly (case-sensitive) |

---

## Technologies & Versions

**Backend Dependencies:**
- express 5.2.1 - Web framework
- mongoose 9.4.1 - MongoDB ODM
- cors 2.8.6 - Cross-origin requests
- dotenv 17.4.1 - Environment variables
- nodemon 3.1.14 - Auto-reload

**Frontend Dependencies:**
- react 19.2.4 - UI library
- react-router-dom 7.14.1 - Client-side routing
- axios 1.15.0 - HTTP client
- react-hook-form 7.72.1 - Forms library
- vite 8.0.4 - Build tool
- bootstrap 5.3.8 - CSS framework (optional)

---

## Current State

**Fully Implemented:**
✅ CRUD operations (Create, Read, Update, Delete)
✅ Smart ISBN-based inventory
✅ Search by ID
✅ Copy to clipboard
✅ Modal updates
✅ Delete copy vs delete entire book
✅ React Router (8 pages + routes)
✅ Global alert system
✅ Three form approaches (Controlled, Uncontrolled, React Hook Form)
✅ Task management module
✅ Error handling
✅ Responsive UI
✅ Loading & error states
✅ Confirmation dialogs

**Not Implemented (Future Work):**
❌ User authentication
❌ Advanced filtering
❌ Book ratings/reviews
❌ Export functionality
❌ Pagination
❌ Real-time updates
❌ Test suite
❌ Deployment

---

## Commands Reference

```bash
# Backend
cd backend && npm install
node server.js
npx nodemon server.js

# Frontend
cd frontend && npm install
npm run dev
npm run build
npm run preview

# MongoDB (if local)
mongod
mongo

# Useful
npx kill-port 5000
npx kill-port 5173
```

---

## File Size & Performance

- Backend: ~4MB (including node_modules)
- Frontend: ~2MB (excluding node_modules)
- Database: Minimal (test with 50-100 books)
- Load time: ~1-2 seconds
- All operations: <100ms response time

---

## Author

**Sikhakolli Lakshman Guru Sai**
- GitHub: [@Lakshman2405](https://github.com/Lakshman2405)

---

## License

Educational use only.

---

**Created:** April 11, 2026 | **Updated:** April 18, 2026

[GitHub Repository](https://github.com/Lakshman2405/Book-Manager)
