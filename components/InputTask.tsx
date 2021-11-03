import { AddIcon } from "@chakra-ui/icons";
import { Flex, FormControl, IconButton, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useTask } from '../hooks/task';
import { MotionBox } from "./Motions";


export const InputTask: React.FC = () => {
  const [TaskInput, setTaskInput] = useState<string>("");
  
  const { addTask } = useTask();

  const taskInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  const taskAddHandler = (e: React.FormEvent) => {
    e.preventDefault();
    addTask(TaskInput);
    setTaskInput("");
  };

  return (
    <MotionBox whileHover={{ scale: 1.05 }}>
      <form onSubmit={taskAddHandler} autoComplete="off">
        <FormControl id="taskinput" data-testid="taskform-todo-app">
          <Flex>
            <Input
              data-testid="taskinput-todo-app"
              onChange={taskInputHandler}
              mr={2}
              variant="filled"
              placeholder="Add new task"
              value={TaskInput}
            />
            <IconButton
              aria-label="done"
              icon={<AddIcon />}
              size="md"
              variant="solid"
              type="submit"
              data-testid="taskbutton-todo-app"
            />
          </Flex>
        </FormControl>
      </form>
    </MotionBox>
  );
};

export default InputTask;