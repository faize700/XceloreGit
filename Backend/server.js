const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Update this to match your client's URL
  credentials: true, // This is important to allow cookies and other credentials
};

app.use(cors(corsOptions));

// Routes
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;

// MongoDB connection setup
mongoose.connect('mongodb+srv://abdullah:abd123@cluster0.34stq.mongodb.net/FaizeApp?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((error) => console.error(error));
