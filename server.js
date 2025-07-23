import express from "express";
import cors from "express";

const app = express();
app.use(express.json());
app.use(cors());

app.post("api/email-bomber", (req, res) => {
    const email = req.body.email;
});

app.listen(5000, () => {
    console.log("Server running on port: 5000...");
});
