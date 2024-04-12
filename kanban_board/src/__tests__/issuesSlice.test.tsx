import issuesReducer, {
  addIssues,
  loading,
  addRepoRating,
  addRepoUserLink,
  totalPages,
  setCurrentPage,
  setSorting,
  resetPagesAndSorting,
  IssuesState,
} from "../app/state/issuesSlice";

describe("issuesSlice", () => {
  let initialState: IssuesState;

  beforeEach(() => {
    initialState = {
      value: [],
      repoRating: "",
      isLoading: false,
      repoLink: "",
      userLink: "",
      totalPages: 0,
      currentPage: 1,
      sorting: "",
      changes: [],
    };
  });

  it("should handle addIssues", () => {
    const issues: any[] = [{ id: 1, title: "Issue 1" }];
    const nextState = issuesReducer(initialState, addIssues(issues));
    expect(nextState.value).toEqual(issues);
  });

  it("should handle loading", () => {
    const nextState = issuesReducer(initialState, loading(true));
    expect(nextState.isLoading).toEqual(true);
  });

  it("should handle addRepoRating", () => {
    const rating = "100";
    const nextState = issuesReducer(initialState, addRepoRating(rating));
    expect(nextState.repoRating).toEqual(rating);
  });

  it("should handle addRepoUserLink", () => {
    const link = "https://example.com/repo";
    const nextState = issuesReducer(initialState, addRepoUserLink(link));
    expect(nextState.repoLink).toEqual(link);
    expect(nextState.userLink).toEqual("https://example.com");
  });

  it("should handle totalPages", () => {
    const pages = 5;
    const nextState = issuesReducer(initialState, totalPages(pages));
    expect(nextState.totalPages).toEqual(pages);
  });

  it("should handle setCurrentPage", () => {
    const page = 2;
    const nextState = issuesReducer(initialState, setCurrentPage(page));
    expect(nextState.currentPage).toEqual(page);
  });

  it("should handle setSorting", () => {
    const sorting = "created";
    const nextState = issuesReducer(initialState, setSorting(sorting));
    expect(nextState.sorting).toEqual(sorting);
  });

  it("should handle resetPagesAndSorting", () => {
    const modifiedState = {
      ...initialState,
      sorting: "created",
      currentPage: 2,
    };
    const nextState = issuesReducer(modifiedState, resetPagesAndSorting());
    expect(nextState.sorting).toEqual("");
    expect(nextState.currentPage).toEqual(1);
  });
});
