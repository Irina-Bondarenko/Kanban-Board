import React, { useEffect, useState } from "react";
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import daysSinceTaskOpened from "../helpres/daysSinceTaskOpened";

export interface Issue {
  [key: string]: any;
}

export interface ITaskItemProps {
  issue: Issue;
  handleDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    itemId: number,
    columnProgressName: string,
  ) => void;
  columnProgressName: string;
}

const TaskItem: React.FC<ITaskItemProps> = ({
  issue,
  handleDragStart,
  columnProgressName,
}) => {
  const [daysOpenedAgo, setDaysOpenedAgo] = useState(0);
  const { title, number, created_at, user, comments, id } = issue;

  useEffect(() => {
    if (issue) {
      setDaysOpenedAgo(daysSinceTaskOpened(created_at));
    }
  }, [issue]);

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      py="10px"
      px="10px"
      backgroundColor="white"
      draggable
      onDragStart={(event) => handleDragStart(event, id, columnProgressName)}
    >
      <Text as="b" fontSize="md">
        {title}
      </Text>
      <Text fontSize="md">{`#${number} opened ${daysOpenedAgo} days ago`}</Text>
      <Flex alignItems="center">
        <Text fontSize="md">{user ? user?.type : "Loading..."}</Text>
        <Icon viewBox="0 0 100 100" color="black">
          <rect x="48" y="0" width="4" height="100" fill="currentColor" />
        </Icon>
        <Text fontSize="md">{`Comments: ${comments}`}</Text>
      </Flex>
    </Box>
  );
};

export default TaskItem;
