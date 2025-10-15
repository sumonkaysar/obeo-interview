import type { ITableState } from "@/Features/Recruitment/types";
import type { IShortlistCandidate } from "@/Features/Recruitment/types/shortlist.type";

export interface IInterviewCandidate {
  _id: string;
  candidate: string;
  candidateId: string;
  firstName: string;
  lastName: string;
  position: string;
  interviewDate: string;
  interview: boolean;
  vivaMarks: number;
  writtenTotalMarks: number;
  mcqTotalMarks: number;
  totalMarks: number;
  selection: boolean;
  createdAt: string;
}

export interface IInterviewState {
  shortlistCandidates: IShortlistCandidate[];
  interviewCandidates: IInterviewCandidate[];
  tableState: ITableState;
  interviewEditId: string;
  interviewDeleteId: string;
}
