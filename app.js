import express from "express";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import OAuthServer from "express-oauth-server";
import oauthModel from "./oauthModel.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
app.oauth = new OAuthServer({ model: oauthModel });

app.post("/oauth/token", app.oauth.token());
app.get("/secure", app.oauth.authenticate(), (req, res) =>
  res.send("Secure Data")
);
