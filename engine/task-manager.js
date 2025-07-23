import path from "path";
import fs from "fs/promises";
import yaml from "yamljs";
import { fileURLToPath } from 'url';

export default class TaskManager {
    constructor(page) {
        this.page = page;
    }

    static async loadTasks(taskPath) {
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const absPath = path.join(__dirname, "..", "tasks", taskPath);

        try {
            const taskFiles = await fs.readdir(absPath);

            const tasks = await Promise.all(
                taskFiles.map(
                    async (file) => {
                        const data = await fs.readFile(path.join(absPath, file), 'utf8');
                        return yaml.parse(data);
                    })
            );

            if (tasks?.length) {
                console.log(`${tasks.length} task(s) loaded successfully.`);
            }

            return tasks ?? [];
        } catch(error) {
            console.log(`Error when loading tasks from ${absPath}: ${error}`);
        }
    }

    async parseSteps(steps, input) {
        for (const step of steps) {
            switch (step.action) {
                case "goto":
                    await this.page.goto(step.url);
                    break;
                case "wait":
                    await this.page.waitForTimeout(step.seconds * 1000);
                    break;
                case "type":
                    const inputField = await this.page.locator(step.selector);
                    await inputField.type(input ?? step.text, {
                        delay: 120,
                    });
                    break;
                case "click":
                    const button = await this.page.locator(step.selector);
                    await button.click();
                    break;
                case "waitFor":
                    await this.page.waitForSelector(step.selector, {state: "visible"});
                    break;
                default:
                    console.log(`${name} - ❌ (Unknown step action: ${step.action})`);
                    return;
            }
        }
    }

    async executeTask(task, options={
        attempts: 1,
        input: ""
    }) {
        const name = task.name;
        const steps = task.steps;

        const {attempts, input} = options;

        let attempt;
        for (attempt = 0; attempt < attempts; attempt++) {
            try {
                await this.parseSteps(steps, input);
                console.log(`${name} - ✅`);
                break;
            } catch(error) {
                console.log(`${name} - ❌ (${error.message})`);
                await new Promise(res =>
                    setTimeout(res, (attempt + 1) * 1000));
            }
        }
        return attempt < attempts;
    }

    async executeTaskGroup(tasks, options={
        attempts: 1,
        input: ""
    }) {
        let success_count = 0;
        for (const task of tasks) {
            const result = await this.executeTask(task, options);
            if (result) {
                success_count++;
            }
        }
        const report = `Finished tasks execution.\n${success_count}/${tasks.length} tasks finished successfully.`;
        console.log(report);
        return report;
    }
}
