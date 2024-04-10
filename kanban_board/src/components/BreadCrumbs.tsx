import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Icon,
  Box,
  Text,
} from "@chakra-ui/react";
import { ChevronRightIcon, StarIcon } from "@chakra-ui/icons";

function BreadCrumbs() {
  const {
    repoRating,
    userLink,
    repoLink,
    value: issues,
  } = useSelector((state: RootState) => state.issues);

  return (
    <>
      {issues.length !== 0 && (
        <Flex py={4} gap="8">
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
            color="#285E61"
          >
            <BreadcrumbItem>
              <BreadcrumbLink href={userLink}>User</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href={repoLink}>Repo</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Issues</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box display="flex">
            <Flex gap="2" alignItems="center">
              <Icon as={StarIcon} w={4} h={4} color="orange.400" />
              <Text as="b" fontSize="md" color="#285E61">
                {`${repoRating} K stars`}
              </Text>
            </Flex>
          </Box>
        </Flex>
      )}
    </>
  );
}

export default BreadCrumbs;
