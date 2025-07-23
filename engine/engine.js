import {chromium} from "@playwright/test";
import TaskManager from "./task-manager.js";

export default class Engine {
    static async startWebCrawler(timeout=30) {
        const browser = await chromium.launch({headless: true});
        console.log("Started browser.");

        const page = await browser.newPage();
        console.log("Opened a new page for execution.");

        page.setDefaultTimeout(timeout * 1000);

        return [browser, page];
    }

    static async stopWebCrawler(browser, page) {
        await page.close();
        await browser.close();
        console.log("Cleaned up everything.");
    }

    static async execute(taskGroupName, options={
        attempts: 1,
        input: ""
    }) {
        const tasks = await TaskManager.loadTasks(taskGroupName);
        const [browser, page] = await Engine.startWebCrawler(10);

        const taskManager = new TaskManager(page);
        const report = await taskManager.executeTaskGroup(tasks, options);

        await Engine.stopWebCrawler(browser, page);

        return report;
    }
}
