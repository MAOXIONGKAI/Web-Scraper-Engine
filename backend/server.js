import express from "express";
import cors from "cors";
import Engine from "./engine/engine.js";
import TaskManager from "./engine/task-manager.js";

const app = express();
app.use(express.json());
app.use(cors());

let tasks = [];

app.post("/api/load-tasks", async (req, res) => {
    const {taskGroupName} = req.body;
    if (!taskGroupName) {
        res.status(400).send("Task group name is required");
        return;
    }

    tasks = await TaskManager.loadTasks(taskGroupName);

    if (!tasks || !tasks.length) {
        res.status(404).send("No tasks found.");
        return;
    }

    res.status(200).json({tasks});
})

app.post("/api/execute-tasks", async (req, res) => {
    const {input, choices} = req.body;
    if (!tasks) {
        res.status(500).send("No task(s) loaded for execution...");
        return;
    }
    if (choices && choices.length > 0) {
        tasks = tasks.filter(task => choices.includes(task.name));
    }

    const report = await Engine.execute(tasks, {
        attempts: 1,
        input: input ?? "",
    });
    res.status(200).send(report);
});

app.listen(5000, () => {
    console.log("Server running on port: 5000...");
});
