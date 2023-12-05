const express = require("express");
const mongoose = require("mongoose");
const controllers = require("./controllers/tasks"); 
const errorHandler = require("./middlewares/error-handler");
const dotenv = require("dotenv")
const notFound = require("./middlewares/not-found")

const app = express();
dotenv.config()
app.use(express.json());


app.get("/api/tasks", controllers.getAllTasks);
app.get("/api/tasks/:id", controllers.getTask);
app.post("/api/tasks/", controllers.createTask);
app.patch("/api/tasks/:id", controllers.updateTask);
app.delete("/api/tasks/:id", controllers.deleteTask);

app.use(notFound)
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_CONNECTION_URI)
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => console.log(error));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`http://localhost:${port}`));
