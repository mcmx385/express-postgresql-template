import Express from "express";
import HttpError from "standard-http-error";
import { getUser, createUser } from "../../helpers/users.js";

const app = Express();
app.use(Express.json());

app.get("/", async (req, res) => {
  try {
    const obj = req.query
    const { username, password } = obj;
    if (!username || !password)
      throw new HttpError(400, "Missing username or password");

    const user = await getUser(obj);
    if (user.length === 0)
      throw new HttpError(404, "User not found");

    res.status(200).json({ success: true, data: user });
  } catch (e) {
    res.status(e.code || 500).json({ success: false, error: e.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const obj = req.body;
    const { username, password } = obj;
    if (!username || !password)
      throw new HttpError(400, "Missing username or password");

    const result = await getUser(obj);
    if (result.length !== 0)
      throw new HttpError(409, "User already exists");

    const user = await createUser(obj);
    if (user.rowCount === 0)
      throw new HttpError(500, "User not created");

    res.status(200).json({ success: true, data: user.rows[0] });
  } catch (e) {
    res.status(e.code || 500).json({ success: false, error: e.message });
  }
});

export default app;
