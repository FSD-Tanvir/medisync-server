const express = require("express");
const app = express();
// socket.io
const http = require("http");

const cors = require("cors");

// socket.io
const { Server } = require("socket.io");
// socket.io
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.syrsapj.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(console.log("mongoose connected successfully"))
  .catch((error) => {
    console.log("error connecting to mongodb", error);
  });

// import route here

// start import route here

const userRoutes = require("./api/routes/userRoutes");
const adviceRoutes = require("./api/routes/adviceRoutes");
const jobRoutes = require("./api/routes/jobRoutes");
const productRoutes = require("./api/routes/productsRoutes");
const doctorRoutes = require("./api/routes/doctorRoutes");
const newsAndArticles = require("./api/routes/newsAndArticlesRoutes");

app.use("/allProducts", productRoutes);
app.use("/users", userRoutes);
app.use("/jobs", jobRoutes);
app.use("/doctors", doctorRoutes);
app.use("/newAndArticles", newsAndArticles);

app.use("/newAndArticles/addArticle", newsAndArticles);
app.use("/", newsAndArticles);
app.use("/", newsAndArticles);

app.use("/advices", adviceRoutes);
app.use("/advices/addAdvice", adviceRoutes);
app.use("/", adviceRoutes);
app.use("/", adviceRoutes);

// end import route here

app.get("/", (req, res) => {
  res.send("medisync project is running");
});

// socket.io
server.listen(5001, () => {
  console.log(`server is running`);
});

app.listen(port, () => {
  console.log(`medisync running on port ${port}`);
});
