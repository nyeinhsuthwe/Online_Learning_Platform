# Online Learning Web

A full-stack online learning platform for managing courses, chapters, and video lessons. Built with **React**, **Tailwind CSS**, **Shadcn**, **Node.js**, **Express**, and **MongoDB**.

## 🔹 Features

- Course and chapter management
- Video lesson uploads and streaming
- Accordion UI for chapters and lessons
- Clean responsive design
- User-friendly interface for both students and instructors
- RESTful API for data management

## 🛠 Tech Stack

- **Frontend:** React.js,Shadcn, Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **File Upload:** Multer (supports video upload)
- **Version Control:** Git + GitHub

## ⚡ Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/nyeinhsuthwe/Online_Learning_Platform.git
cd Online_Learning_Platform
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
```

4. **Environment Configuration**

Create a `.env` file in the `backend` directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
JWT_SECRET=your_jwt_secret_key
```

5. **Database Setup**
   - For local MongoDB: Ensure MongoDB service is running
   - For MongoDB Atlas: Use your Atlas connection string

## 🚀 Running the Application

### Option 1: Run Separately

**Start Backend Server:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:8000`

**Start Frontend Server:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### Option 2: Using Concurrently (Recommended)

Add this script to your root `package.json`:
```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev --prefix backend\" \"npm run dev --prefix frontend\""
  }
}
```

Then run:
```bash
npm run dev
```

## 📁 File Upload System

- Video files are uploaded using **Multer** middleware
- Uploaded files are stored in `backend/uploads/` directory
- The backend serves uploads as static files
- Supported formats: MP4

### API Endpoints for File Upload:
```
POST /api/upload/video - Upload video lesson
POST /api/upload/image - Upload video lesson
GET /uploads/:filename - Access uploaded files
```

## 🔧 Project Structure

```
Online_Learning_Web/
├── backend/
│   ├── controllers/
│   ├── helper/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│   ├── uploads/
│   ├── .env
│   └── server.js
frontend/
├── src/
│   ├── assets/          
│   ├── common/         
│   ├── components/      
│   ├── features/        
│   ├── helper/          
│   ├── hooks/          
│   ├── layout/          
│   ├── lib/            
│   ├── pages/          
│   ├── routes/          
│   ├── schema/          
│   ├── types/           
│   ├── App.jsx          
│   ├── index.jsx        
│   └── main.jsx         
├── package.json
└── README.md
```

## 🖥 UI Features

- **Accordion Navigation:** Expandable chapters with lessons
- **Video Player:** Built-in HTML5 video player with controls
- **Responsive Design:** Mobile-first approach with Tailwind CSS
- **Lesson Progress Tracking:** Track completed lessons


## 🚀 Deployment

### Backend Deployment (Heroku/Vercel/Railway)
1. Set environment variables in deployment platform
2. Add `uploads/video` folder to `.gitignore` or use cloud storage
3. Configure CORS for your frontend domain

### Frontend Deployment (Vercel/Netlify)
1. Build the React app: `npm run build`
2. Configure API base URL
3. Deploy the `build` folder

### Database Deployment
- Use MongoDB Atlas for cloud database
- Set up proper IP whitelisting
- Enable backup and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request


## 📞 Contact & Support

For support, questions, or contributions:
- Create an issue in the GitHub repository
- Email: nyeinhsuthwe57@gmail.com

## 🙏 Acknowledgments

- Icons by [Lucide Icons](https://lucide.dev)
- Styling with [Shadcn],[Tailwind CSS](https://tailwindcss.com)
- Video handling with [Multer](https://github.com/expressjs/multer)
- Database with [MongoDB](https://www.mongodb.com)