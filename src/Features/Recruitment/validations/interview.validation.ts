import z from "zod";

export const interviewZodSchema = z.object({
  candidate: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Candidate is required"
          : "Candidate must be a string",
    })
    .nonempty("Candidate can't be blank"),
  interview: z
    .boolean({
      error: (issue) =>
        issue.input === undefined
          ? "Interview is required"
          : "Interview must be a boolean (either true or false)",
    })
    .default(false),
  vivaMarks: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Viva marks must be a valid number",
    })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "Viva marks cannot be negative",
    })
    .optional(),
  writtenTotalMarks: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Written total marks must be a valid number",
    })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "Written total marks cannot be negative",
    })
    .optional(),
  mcqTotalMarks: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "MCQ total marks must be a valid number",
    })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "MCQ total marks cannot be negative",
    })
    .optional(),
  totalMarks: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Total marks must be a valid number",
    })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "Total marks cannot be negative",
    })
    .optional(),
  selection: z
    .boolean("Selection must be a boolean (either true or false)")
    .default(false)
    .optional(),
});

export const interviewUpdateZodSchema = z.object({
  interview: z
    .boolean("Interview must be a boolean (either true or false)")
    .optional(),
  vivaMarks: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Viva marks must be a valid number",
    })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "Viva marks cannot be negative",
    })
    .optional(),
  writtenTotalMarks: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Written total marks must be a valid number",
    })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "Written total marks cannot be negative",
    })
    .optional(),
  mcqTotalMarks: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "MCQ total marks must be a valid number",
    })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "MCQ total marks cannot be negative",
    })
    .optional(),
  totalMarks: z
    .string()
    .refine((val) => val === "" || !isNaN(Number(val)), {
      message: "Total marks must be a valid number",
    })
    .refine((val) => val === "" || Number(val) >= 0, {
      message: "Total marks cannot be negative",
    })
    .optional(),
  selection: z
    .boolean("Selection must be a boolean (either true or false)")
    .default(false)
    .optional(),
});
