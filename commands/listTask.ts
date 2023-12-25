import { readFile } from "fs";
import { join } from "path";
import { taskType } from "../utils/types";



export const listTaskHandler = () => {
  const filePath = join(__dirname, "../database/tasks.csv");

  readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.log("No tasks found. The file does not exist.");
        return;
      }
      console.error("Error reading tasks file:", err.message);
      return;
    }

    const tasks: taskType[] = data
      .split("\n")
      .filter((line) => line)
      .map((line) => {
        const [id, name, starttime, endtime, completed] = line.split(",");
        return {
          id: parseInt(id, 10),
          name,
          starttime,
          endtime,
          completed: completed === "true",
        };
      });

    tasks.forEach((task) => {
      console.log(
        `ID: ${task.id}, Name: ${task.name}, Start Time: ${task.starttime}, End Time: ${task.endtime}, Completed: ${task.completed}`
      );
    });
  });
};
