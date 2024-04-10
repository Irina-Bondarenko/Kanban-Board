import React from "react";
import { Button } from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { resetPagesAndSorting } from "../app/state/issuesSlice";

interface SortingProps {
  onSort: (sortType: string) => void;
  onResetHandler: () => void;
}

const Sorting: React.FC<SortingProps> = ({
  onSort,
  onResetHandler,
}: SortingProps) => {
  const dispatch = useDispatch();

  const handleSort = (sortType: string) => {
    onSort(sortType);
  };

  const handleReset = () => {
    onResetHandler();
    dispatch(resetPagesAndSorting());
  };

  return (
    <div>
      <Button
        colorScheme="teal"
        variant="outline"
        onClick={() => handleSort("created")}
        mr={2}
      >
        Sort by Created
      </Button>
      <Button
        colorScheme="teal"
        variant="outline"
        onClick={() => handleSort("updated")}
        mr={2}
      >
        Sort by Updated
      </Button>
      <Button
        colorScheme="teal"
        variant="outline"
        onClick={() => handleSort("comments")}
        mr={2}
      >
        Sort by Comments
      </Button>
      <Button
        colorScheme="teal"
        variant="outline"
        onClick={() => handleSort("reactions")}
        mr={2}
      >
        Sort by Reactions
      </Button>
      <Button colorScheme="whatsapp" onClick={handleReset}>
        To default
      </Button>
    </div>
  );
};

export default Sorting;
