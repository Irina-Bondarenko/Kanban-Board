import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import TaskItem from "./TaskItem";

export interface Issue {
  [key: string]: any;
}

export interface IColumnProps {
  issues: Issue[];
  columnProgressName: string;
  targetColumnIndex: number;
  handleDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    itemId: number,
    columnProgressName: string,
  ) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (
    event: React.DragEvent<HTMLDivElement>,
    columnProgressName: string,
    targetColumnIndex: number,
  ) => void;
}

const Column: React.FC<IColumnProps> = ({
  issues,
  columnProgressName,
  targetColumnIndex,
  handleDragStart,
  handleDragOver,
  handleDrop,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      py="10px"
      px="10px"
      backgroundColor="gray.100"
      width="30%"
      onDragOver={handleDragOver}
      onDrop={(event) =>
        handleDrop(event, columnProgressName, targetColumnIndex)
      }
    >
      <Flex flexDirection="column" gap="4">
        <Text as="b" fontSize="md" textAlign="center">
          {columnProgressName}
        </Text>
        <Flex flexDirection="column" gap="2">
          {issues.map((issue) => (
            <TaskItem
              issue={issue}
              key={issue.id}
              handleDragStart={handleDragStart}
              columnProgressName={columnProgressName}
            />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Column;
