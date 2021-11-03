
  
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
} from "@chakra-ui/react";
import { TargetAndTransition } from "framer-motion/types/types";
import React, { useState } from "react";
import { MotionFlex } from "./Motions";
import { useTask } from '../hooks/task';

interface Task {
    name: string;
    isCompleted: boolean;
    id: string;
}

interface TaskFieldProps {
  TaskObj: Task;
}

const TaskField: React.FC<TaskFieldProps> = ({
  TaskObj,
}) => {
  const EDITING_SCALE = 1.05;
  const UNSELECTED_OPACITY = 0.8;

  const initialFieldAnimate: TargetAndTransition = {
    scale: [1, 1.025, 1],
    opacity: [0, 0.1, 0.2, 0.3, 0.4, UNSELECTED_OPACITY],
    transition: { duration: 0.2 },
  };

  const deleteFieldAnimate: TargetAndTransition = {
    scale: [1, 0.95],
    opacity: [1, UNSELECTED_OPACITY, 0.2, 0.1],
    transition: { duration: 0.25 },
  };

  const [fieldAnimate, setFieldAnimate] = useState(initialFieldAnimate);
  const [fieldEditing, setFieldEditing] = useState<boolean>(false);
  const completedProps = {
    textDecoration: "line-through",
    opacity: 0.5,
  };
  const { deleteTask, completedTask, editTask } = useTask();

  const editTaskHandler = (e: string) => {
    editTask(TaskObj, e)
    setFieldAnimate({ ...fieldAnimate, scale: 1, opacity: UNSELECTED_OPACITY });
    setFieldEditing(false);
  };

  return (
    <MotionFlex
      animate={fieldAnimate}
      opacity="0"
      scale="1"
      onHoverStart={() => {
        if (fieldAnimate.opacity !== 1 && !fieldEditing)
          setFieldAnimate({ ...fieldAnimate, opacity: 1 });
      }}
      onHoverEnd={() => {
        if (fieldAnimate.opacity !== UNSELECTED_OPACITY && !fieldEditing)
          setFieldAnimate({ ...fieldAnimate, opacity: UNSELECTED_OPACITY });
      }}
    >
      <Editable
        w="100%"
        defaultValue={TaskObj.name}
        onEdit={() => {
          if (!fieldEditing) {
            setFieldAnimate({ ...fieldAnimate, scale: EDITING_SCALE });
            setFieldEditing(true);
          }
        }}
        onSubmit={editTaskHandler}
      >
        <EditablePreview
          {...(TaskObj.isCompleted ? completedProps : {})}
          wordBreak="break-all"
        />
        <EditableInput />
      </Editable>
      <IconButton
        aria-label="done"
        icon={<CheckIcon />}
        size="sm"
        variant="ghost"
        onClick={() => completedTask(TaskObj)}
      />
      <IconButton
        data-testid={`${TaskObj.id}-taskbutton-todo-app-delete`}
        aria-label="close"
        icon={<CloseIcon />}
        size="sm"
        variant="ghost"
        onClick={() => {
          setFieldAnimate(deleteFieldAnimate);
          setTimeout(() => deleteTask(TaskObj.id), 250);
        }}
      />
    </MotionFlex>
  );
};

export default TaskField;