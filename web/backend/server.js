import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';  
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import commonRoutes from './routes/commonRoutes.js';

// Loads all the enviornment variable
dotenv.config();
const PORT = process.env.PORT;

// Create an express server and add all the necessary middleware
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// setup routes
app.use('', commonRoutes)
app.use('', userRoutes); // the routes accesible to every user i.e. registration... etc
app.use('', adminRoutes); // otutes accessible to admin like product arrived... etc

// all undefined routes go here
app.get('*', (req, res) => {
    res.status(404).send("ERROR 404");
  });

// all purpose error handler middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("ERROR 500: Internal Server Error");
})

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
})
