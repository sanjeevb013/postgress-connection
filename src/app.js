const express = require("express");
const userRoutes = require("./routes/users");
const healthArticleRoutes = require("./routes/healthArticles");
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
// serve uploaded files statically
app.use('/uploads', express.static('uploads'));

app.use('/api/health-articles', healthArticleRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;
