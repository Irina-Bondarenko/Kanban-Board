import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Issue {
  id: number;
  [key: string]: any;
}

export interface Changes {
  url: string;
  changedData: Issue[];
}

export interface IssuesState {
  value: Issue[];
  repoRating: string;
  isLoading: boolean;
  repoLink: string;
  userLink: string;
  totalPages: number;
  currentPage: number;
  sorting: string;
  changes: Changes[];
}

const initialState: IssuesState = {
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

export const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    addIssues: (state, action: PayloadAction<Issue[]>) => {
      if (state.changes.find((change) => change.url === state.repoLink)) {
        const changedData =
          state.changes.find((change) => change.url === state.repoLink)
            ?.changedData || [];
        state.value = changedData;
      } else {
        state.value = action.payload;
      }
    },

    loading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    addRepoRating: (state, action: PayloadAction<string>) => {
      state.repoRating = action.payload;
    },

    changeIssueItemStatus: (
      state,
      action: PayloadAction<ChangeIssueItemStatusPayload>,
    ) => {
      const { itemId, newStatus } = action.payload;

      const updatedValue = state.value.map((item) =>
        item.id === itemId ? { ...item, state: newStatus } : item,
      );

      state.value = updatedValue;
      state.changes = [
        ...state.changes,
        { url: state.repoLink, changedData: updatedValue },
      ];
    },
    addRepoUserLink: (state, action: PayloadAction<string>) => {
      state.repoLink = action.payload;
      state.userLink = action.payload.split("/").slice(0, 4).join("/");
    },
    totalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSorting: (state, action: PayloadAction<string>) => {
      state.sorting = action.payload;
    },
    resetPagesAndSorting: (state) => {
      (state.sorting = ""), (state.currentPage = 1);
    },
  },
});

export const {
  addIssues,
  loading,
  changeIssueItemStatus,
  addRepoRating,
  addRepoUserLink,
  totalPages,
  setCurrentPage,
  setSorting,
  resetPagesAndSorting,
} = issuesSlice.actions;

export default issuesSlice.reducer;

interface ChangeIssueItemStatusPayload {
  itemId: number;
  newStatus: string;
}
