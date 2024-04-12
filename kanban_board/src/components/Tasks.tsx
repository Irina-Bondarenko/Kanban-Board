import type { RootState } from "../app/store";
import React, { useMemo } from "react";
import Column from "./Column";

import { useSelector, useDispatch } from "react-redux";
import { changeIssueItemStatus } from "../app/state/issuesSlice";

import { Flex, Spinner, Text } from "@chakra-ui/react";

const Tasks = () => {
  const dispatch = useDispatch();

  const { value: issues, isLoading } = useSelector(
    (state: RootState) => state.issues,
  );

  const columnsData = useMemo(() => {
    if (!issues) return [];

    const open = issues?.filter((issue) => issue.state === "open");
    const inProcess = issues?.filter((issue) => issue.state === "in_progress");
    const closed = issues?.filter((issue) => issue.state === "closed");

    return [
      { name: "ToDo", issues: open },
      { name: "In Progress", issues: inProcess },
      { name: "Done", issues: closed },
    ];
  }, [issues]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    columnProgressName: string,
    targetColumnIndex: number,
  ) => {
    event.preventDefault();
    const droppedItemId = parseInt(event.dataTransfer.getData("text/plain"));
    const sourceColumnName = event.dataTransfer.getData("columnProgressName");

    if (sourceColumnName === columnProgressName) {
      return;
    }

    let targetColumnName = "";

    switch (targetColumnIndex) {
      case 0:
        targetColumnName = "open";
        break;
      case 1:
        targetColumnName = "in_progress";
        break;
      case 2:
        targetColumnName = "closed";
        break;
    }

    const payload = {
      itemId: droppedItemId,
      newStatus: targetColumnName,
    };

    dispatch(changeIssueItemStatus(payload));
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    itemId: number,
    columnProgressName: string,
  ) => {
    event.dataTransfer.setData("text/plain", itemId.toString());
    event.dataTransfer.setData("columnProgressName", columnProgressName);
  };

  return (
    <>
      {isLoading ? (
        <Flex justifyContent="center" my={8}>
          <Spinner
            thickness="4px"
            speed="0.8s"
            emptyColor="gray.200"
            color="#285E61"
            size="xl"
          />
        </Flex>
      ) : (
        <>
          {issues.length === 0 ? (
            <Flex justifyContent="center" my={10}>
              <Text as="b" fontSize="xl" textAlign="center" color="#285E61">
                No issues yet
              </Text>
            </Flex>
          ) : (
            <Flex justifyContent="space-between" py="10">
              {columnsData.map((column, index) => (
                <Column
                  key={index}
                  targetColumnIndex={index}
                  columnProgressName={column.name}
                  issues={column.issues}
                  handleDragStart={handleDragStart}
                  handleDragOver={handleDragOver}
                  handleDrop={handleDrop}
                />
              ))}
            </Flex>
          )}
        </>
      )}
    </>
  );
};

export default Tasks;
