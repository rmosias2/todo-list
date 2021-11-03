import { Box } from "@chakra-ui/react";
import React from "react";

import TaskField from "./TaskField";
import { useTask } from '../hooks/task';

interface Task {
    name: string;
    isCompleted: boolean;
    id: string;
}


const TaskList: React.FC = () => {
  const { tasks, tasksFiltered, radioFilter, inputTask } = useTask();
  const tasksSelected = radioFilter === "all" && inputTask === "" ? tasks :  tasksFiltered;
  
  return (
    <Box p={8} mt={8} mb={8} data-testid="taskfieldlist-todoApp">
      {tasksSelected.map((task: Task) => {
        return (
          <TaskField
            TaskObj={task}
            key={task.id}
          />
        );
      })}
    </Box>
  );
};

export default TaskList;