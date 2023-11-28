// app.js
import express from 'express';
// import sequelize from './config/db.js';
import cors from 'cors';

const app = express();
const PORT = 7500;

const corsOptions = {
    origin: "http://localhost:7500"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to post like and comment's application."
    });
});

// Define User routes here
import users from "./src/routes/userRoutes.js";
app.use("/api/users", users);

//Post route 
import posts from './src/routes/postRoutes.js';
app.use('/api/posts', posts);
try {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error('Unable to sync models with the database:', error.message);
};