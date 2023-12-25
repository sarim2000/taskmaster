import { Command } from "commander";
import { addTaskHandler } from "./commands/addTask";
import { listTaskHandler } from "./commands/listTask";

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

program.parse(process.argv);
