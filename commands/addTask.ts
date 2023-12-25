import { appendFile, readFile } from "fs";
import { join } from "path";

export const addTaskHandler = (taskName: string) => {
  const filePath = join(__dirname, "../database/tasks.csv");

  // Read the existing tasks to determine the next ID
  readFile(filePath, "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      console.error("Error reading tasks file: ", err.message);
      return;
    }

    const tasks = data ? data.split("\n") : [];
    const nextId = tasks.length; // Incremental ID, simple implementation

    const newTask = `\n${nextId},${taskName},,,false`; // Format: id,name,starttime,endtime,completed

    appendFile(filePath, newTask, "utf8", (err) => {
      if (err) {
        console.error("Error while saving the task: ", err.message);
      } else {
        console.log(`Task '${taskName}' added successfully with ID ${nextId}!`);
      }
    });
  });
};
