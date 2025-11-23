const express = require("express");
const userRoutes = require("./routes/users");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

app.use("/api/users", userRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;
