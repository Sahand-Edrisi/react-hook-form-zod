const express = require("express");

const app = express();

app.use(express.json());

app.post("/register", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "فیلد ها پر نشده" });
  return res.status(200).json({ message: "ثبت نام موفق" });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(5000, () =>
  console.log("Mock API running on http://localhost:5000")
);
