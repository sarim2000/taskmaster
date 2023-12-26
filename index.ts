import { Command } from "commander";
import { addTaskHandler } from "./commands/addTask";
import { deleteTaskHandler } from "./commands/deleteTask";
import { listTaskHandler } from "./commands/listTask";
import { updateTaskHandler } from "./commands/updateTask";

const program = new Command();

program
  .name("taskmaster-cli")
  .description("CLI to manage your tasks")
  .version("0.8.0");

program
  .command("addTask")
  .description("Add a task")
  .argument("<string>", "name of your task")
  .action((str) => {
    addTaskHandler(str);
  });

program
  .command("listTasks")
  .description("List all tasks")
  .action(() => {
    listTaskHandler()
  });

program
  .command("updateTask")
  .description("Update Task")
  .argument("id","id to update")
  .option("--completed <BOOLEAN>","Task Completion Status")
  .action((id,options) => {
    console.log("options.completed", options.completed);
    updateTaskHandler(parseInt(id),options.completed)
  });

program
  .command("deleteTask")
  .description("Delete a specific task")
  .argument("id", "task to delete")
  .action((id) => {
    deleteTaskHandler(parseInt(id));
  });

program.parse(process.argv);
