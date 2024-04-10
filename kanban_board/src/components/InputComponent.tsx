import { ChangeEvent, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Box } from "@chakra-ui/react";
import { RootState } from "../app/store";
import {
  addIssues,
  loading,
  addRepoRating,
  addRepoUserLink,
  totalPages,
  setCurrentPage,
  setSorting,
} from "../app/state/issuesSlice";
import Pagination from "./Pagination";
import Sorting from "./Sorting";
import InputLink from "./InputLink";

const ITEMS_PER_PAGE = 50;

function InputComponent() {
  const dispatch = useDispatch();
  const {
    value: issues,
    totalPages: totalPagesNumber,
    repoLink: inputValue,
    currentPage = 1,
    sorting = "",
  } = useSelector((state: RootState) => state.issues);

  const inputValueHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value.trim();
    dispatch(addRepoUserLink(link));
  }, []);

  const fetchIssues = useCallback(
    async (repoUrl: string) => {
      try {
        dispatch(loading(true));
        const response = await fetch(`${repoUrl}/issues`);
        if (!response.ok) {
          throw new Error("Failed to fetch issues");
        }
        const data = await response.json();
        dispatch(addIssues(data.items));
        const totalPagesNumber = Math.ceil(data.total_count / ITEMS_PER_PAGE);
        dispatch(totalPages(totalPagesNumber));
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      } finally {
        dispatch(loading(false));
      }
    },
    [dispatch],
  );

  const fetchRepoRating = useCallback(async (repoRatingUrl: string) => {
    try {
      const response = await fetch(repoRatingUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch repo rating");
      }
      const data = await response.json();
      dispatch(addRepoRating(data.stargazers_count));
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  }, []);

  const handleIssuesFetch = useCallback(
    (newPage?: number, sortingParam?: string) => {
      if (!inputValue) return;

      const parts = inputValue.split("/");
      const username = parts[parts.length - 2];
      const repoName = parts[parts.length - 1];
      const page = newPage || currentPage;

      const sortingLinkParam =
        (sortingParam && `&sort=${sortingParam}`) ||
        (sorting && `&sort=${sorting}`) ||
        "";

      const repoUrl = `https://api.github.com/search/issues?q=repo:${username}/${repoName}&page=${page}&per_page=${ITEMS_PER_PAGE}&${sortingLinkParam}&order=asc`;
      const repoRatingUrl = `https://api.github.com/repos/${username}/${repoName}`;

      dispatch(setCurrentPage(page));
      dispatch(setSorting(sortingLinkParam));
      fetchIssues(repoUrl);
      fetchRepoRating(repoRatingUrl);
    },
    [inputValue, currentPage, fetchIssues, sorting],
  );

  const buttonSubmitHandler = useCallback(() => {
    handleIssuesFetch();
  }, [handleIssuesFetch]);

  const onPageChangeHandler = useCallback(
    (newPage: number) => {
      handleIssuesFetch(newPage);
    },
    [handleIssuesFetch],
  );

  const onResetHandler = useCallback(() => {
    handleIssuesFetch(0, "");
  }, [handleIssuesFetch]);

  const onSortHandler = useCallback(
    (sortingParam: string) => {
      handleIssuesFetch(undefined, sortingParam);
    },
    [handleIssuesFetch],
  );

  return (
    <Flex flexDirection="column">
      <InputLink
        inputValue={inputValue}
        inputValueHandler={inputValueHandler}
        buttonSubmitHandler={buttonSubmitHandler}
      />
      {issues.length !== 0 && (
        <Box py={4}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPagesNumber}
            onPageChange={onPageChangeHandler}
          />
        </Box>
      )}
      <Box py={4}>
        <Sorting onSort={onSortHandler} onResetHandler={onResetHandler} />
      </Box>
    </Flex>
  );
}

export default InputComponent;
