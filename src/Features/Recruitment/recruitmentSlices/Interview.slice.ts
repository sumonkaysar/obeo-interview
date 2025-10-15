import { interviewCandidatesData } from "@/Features/Recruitment/consts/interview.const";
import { shortlistCandidatesData } from "@/Features/Recruitment/consts/shortlist.const";
import type { ITableState } from "@/Features/Recruitment/types";
import type { IInterviewState } from "@/Features/Recruitment/types/interview.type";
import type { RootState } from "@/Redux/store";
import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import type { Updater } from "@tanstack/react-table";
import { toast } from "sonner";

const initialState: IInterviewState = {
  shortlistCandidates: shortlistCandidatesData,
  interviewCandidates: interviewCandidatesData,
  tableState: {
    globalFilter: "",
    sorting: [],
    rowSelection: {},
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  },
  interviewEditId: "",
  interviewDeleteId: "",
};

export const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    addInterview: (state, action) => {
      state.interviewCandidates = [
        ...state.interviewCandidates,
        action.payload,
      ];
      toast.success("Interview added succesfully");
      console.log(current(state));
    },
    selectInterviewEditId: (state, action) => {
      state.interviewEditId = action.payload;
    },
    removeInterviewEditId: (state) => {
      state.interviewEditId = "";
    },
    selectInterviewDeleteId: (state, action) => {
      state.interviewDeleteId = action.payload;
    },
    removeInterviewDeleteId: (state) => {
      state.interviewDeleteId = "";
    },
    editInterview: (state, action) => {
      const interviewIndex = state.interviewCandidates.findIndex(
        (c) => c.candidateId === state.interviewEditId
      );
      state.interviewCandidates[interviewIndex] = {
        ...state.interviewCandidates[interviewIndex],
        ...action.payload,
      };
      toast.success("Interview updated succesfully");
      state.interviewEditId = "";
    },
    deleteInterview: (state) => {
      state.interviewCandidates = state.interviewCandidates.filter(
        (candidate) => candidate.candidateId !== state.interviewDeleteId
      );
      toast.success("Interview deleted succesfully");
      state.interviewDeleteId = "";
    },
    updateTableState: (
      state,
      action: PayloadAction<{
        key: keyof ITableState;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updater: Updater<any>;
      }>
    ) => {
      const { key, updater } = action.payload;

      const currentValue = state.tableState[key];
      const newValue =
        typeof updater === "function" ? updater(currentValue) : updater;

      state.tableState[key] = newValue;
    },
  },
});

export const {
  addInterview,
  selectInterviewEditId,
  removeInterviewEditId,
  selectInterviewDeleteId,
  removeInterviewDeleteId,
  editInterview,
  deleteInterview,
  updateTableState,
} = interviewSlice.actions;

export const selectInterviewData = (state: RootState) => state.interview;

export default interviewSlice.reducer;
