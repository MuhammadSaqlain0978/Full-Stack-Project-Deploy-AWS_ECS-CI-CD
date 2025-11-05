const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ DB error:", err));

const TodoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});
const Todo = mongoose.model("Todo", TodoSchema);

// Routes

app.get("/api/", async (req, res) => {
  console.log("API called");
  res.send("API is working ✅");

});
app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/api/todos", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.json(newTodo);
});

app.delete("/api/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
