import express from "express";
import cors from "express";
import Engine from "./engine/engine.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/email-bomber", async (req, res) => {
    const email = req.body.email;
    const report = await Engine.execute("email-bomber", {
        attempts: 1,
        input: email,
    });
    res.status(200).send(report);
});

app.listen(5000, () => {
    console.log("Server running on port: 5000...");
});
