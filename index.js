import Express from "express";
import users from "./routes/users/index.js";


let app = Express();
app.use(Express.json());

app.use("/users", users);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    endpoints: [],
  });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.toString(),
  });
});

app.listen(8080, () => {
  console.log("Listening 8080");
});

// export default app
