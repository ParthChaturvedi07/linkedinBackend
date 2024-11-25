const express = require("express");
const app = express();
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
// const cors = require("cors");
const helmet = require("helmet");
const MongoStore = require("connect-mongo");
const authRoutes = require("./controllers/authcontrollers");
const userRoutes = require("./routes/users")
;const experienceRoutes = require("./routes/experience");
const skillsRoutes = require("./routes/skill");
const projectRoutes = require("./routes/projects");
// const isLoggedIn = require("./middleware/isLoggedIn");
// const {getCurrentUser} = require("./controllers/authcontrollers")
require("dotenv").config();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: 'http://your-frontend-domain.com', credentials: true }));
app.use(helmet());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Session and Cookie Setup
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { secure: false, httpOnly: true }, // Set 'secure: true' in production
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes)
app.use("/experience", experienceRoutes);
app.use("/skill", skillsRoutes);
app.use("/project", projectRoutes);
// app.get("/me", isLoggedIn, getCurrentUser)

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
