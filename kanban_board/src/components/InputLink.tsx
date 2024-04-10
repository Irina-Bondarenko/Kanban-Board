import { Input, Flex, Button, Box } from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface IInputLinkProps {
  inputValue: string;
  inputValueHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  buttonSubmitHandler: () => void;
}

const InputLink = ({
  inputValue,
  inputValueHandler,
  buttonSubmitHandler,
}: IInputLinkProps) => {
  return (
    <Flex justifyContent="space-between">
      <Box pr={2} width="90%">
        <Input
          variant="outline"
          placeholder="Enter repo URL"
          value={inputValue}
          onChange={inputValueHandler}
        />
      </Box>
      <Box>
        <Button colorScheme="teal" size="md" onClick={buttonSubmitHandler}>
          Load issues
        </Button>
      </Box>
    </Flex>
  );
};

export default InputLink;
