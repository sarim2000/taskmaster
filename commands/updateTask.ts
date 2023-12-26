import { readFile, writeFile } from "fs";
import { join } from "path";

export const updateTaskHandler = (
  taskId: number,
  updateCompleted: boolean
): void => {
  const filePath = join(__dirname, "../database/tasks.csv");

  readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.log("No tasks found. The file does not exist.");
      } else {
        console.error("Error reading tasks file:", err.message);
      }
      return;
    }
    console.log('updateCompleted', updateCompleted)
    let found = false;
    const lines = data.split("\n");
    const updatedLines: string[] = lines.map((line) => {
      const [id, name, starttime, endtime, completed] = line.split(",");
      if (parseInt(id, 10) === taskId) {
        found = true;
        return `${id},${name},${starttime},${endtime},${updateCompleted}`;
      }
      return line;
    });

    if (!found) {
      console.log(`Task with ID ${taskId} not found.`);
      return;
    }

    const updatedData = updatedLines.join("\n");
    writeFile(filePath, updatedData, "utf8", (writeErr) => {
      if (writeErr) {
        console.error("Error writing to tasks file:", writeErr.message);
        return;
      }
      console.log(`Task with ID ${taskId} has been updated.`);
    });
  });
};
