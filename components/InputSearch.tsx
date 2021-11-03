import { Flex, FormControl, Input, HStack, RadioGroup, Radio, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { useTask } from '../hooks/task';
import { MotionBox } from "./Motions";


export const InputSearch: React.FC = () => {
  const [TaskInput, setTaskInput] = useState<string>("");

  const [radioFilter, setRadioFilter] = useState<string>("all");
  
  const { filterTask } = useTask();

  const taskInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const taskState = e.target.value;
    setTaskInput(e.target.value);
    filterTask(taskState, radioFilter);
  };

  const taskAddHandler = (e: React.FormEvent) => {
    e.preventDefault();
    filterTask(TaskInput, radioFilter);
  };

  const taskRadioHandler = (radioValue: string) => {
    setRadioFilter(radioValue);
    filterTask(TaskInput, radioValue);
  };

  return (
    <MotionBox whileHover={{ scale: 1.05 }}>
      <form onSubmit={taskAddHandler} autoComplete="off">
        <FormControl id="taskinput" data-testid="taskform-todo-app" padding="16px">
          <Flex display="flex" flexDirection="column" alignItems="center">
            <Input
              data-testid="taskinput-todo-app-search"
              onChange={taskInputHandler    }
              mr={2}
              variant="filled"
              placeholder="Search"
              value={TaskInput}
            />  
            <Box display="flex" alignItems="center" mt="8px">
                <RadioGroup onChange={taskRadioHandler} value={radioFilter}>
                    <HStack spacing={5} direction="row">
                        <Radio value="all">All</Radio>
                        <Radio value="complete">Complete</Radio>
                        <Radio value="incomplete">Incomplete</Radio>
                    </HStack>
                </RadioGroup>
            </Box>
          </Flex>
        </FormControl>
      </form>
    </MotionBox>
  );
};

export default InputSearch;