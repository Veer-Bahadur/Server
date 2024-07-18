// server.js
import express from 'express'
import bodyParser from 'body-parser'
import db from "./config/mongoose.js"
import cors from 'cors'

const app = express();


// Middleware
app.use(cors());
app.use(express.json())

// Routes
import routes from "./routes/index.js"
app.use('/',routes);

// Define the port
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
