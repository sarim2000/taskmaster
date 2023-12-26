import { Command } from "commander";
import { addTaskHandler } from "./commands/addTask";
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
  .description("List all tasks")
  .argument("id","id to update")
  .argument("completed","Task Completion Status")
  .action((id,completed) => {
    console.log('options.completed', completed)
    updateTaskHandler(parseInt(id),completed)
  });

program.parse(process.argv);
