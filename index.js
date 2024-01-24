const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.syrsapj.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(console.log("mongoose connected successfully"))
  .catch((error) => {
    console.log("error connecting to mongodb", error);
  });

// import route here

const productRoutes = require("./api/routes/productsRoutes");
app.use("/allProducts", productRoutes);

const userRoutes = require("./api/routes/useRoutes");
app.use("/users", userRoutes);

const newsAndArticlesRoutes = require("./api/routes/newsAndArticlesRoutes");
app.use("/allNewsAndArticles", newsAndArticlesRoutes);

app.get("/", (req, res) => {
  res.send("medisync project is running");
});
=======
// start import route here

const userRoutes = require('./api/routes/userRoutes');
const adviceRoutes = require('./api/routes/adviceRoutes')
const jobRoutes = require('./api/routes/jobRoutes')
const productRoutes = require('./api/routes/productsRoutes')
const doctorRoutes = require('./api/routes/doctorRoutes')

app.use('/allProducts',productRoutes)
app.use('/users', userRoutes)
app.use('/advices', adviceRoutes)
app.use("/jobs", jobRoutes)
app.use('/doctors', doctorRoutes)


// end import route here

app.get('/', (req, res) => {
    res.send('medisync project is running')
})
>>>>>>> fbda7180c36b50531d1274c13f64094205d42e66

app.listen(port, () => {
  console.log(`medisync running on port ${port}`);
});
