import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  editInterview,
  removeInterviewEditId,
  selectInterviewData,
} from "@/Features/Recruitment/recruitmentSlices/Interview.slice";
import type { IInterviewCandidate } from "@/Features/Recruitment/types/interview.type";
import { interviewUpdateZodSchema } from "@/Features/Recruitment/validations/interview.validation";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";

const EditInterviewForm = () => {
  const { interviewCandidates, interviewEditId } =
    useAppSelector(selectInterviewData);
  const dispatch = useAppDispatch();
  const prevData = interviewCandidates.find(
    (c) => c.candidateId === interviewEditId
  );
  const form = useForm({
    resolver: zodResolver(interviewUpdateZodSchema),
    values: {
      interview: prevData?.interview || false,
      vivaMarks: String(prevData?.vivaMarks || 0),
      writtenTotalMarks: String(prevData?.writtenTotalMarks || 0),
      mcqTotalMarks: String(prevData?.mcqTotalMarks || 0),
      totalMarks: String(prevData?.totalMarks || 0),
      selection: prevData?.selection || false,
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof interviewUpdateZodSchema>
  ) => {
    try {
      let updatedData = {} as Partial<IInterviewCandidate>;

      for (const key in data) {
        if (
          (key === "interview" || key === "selection") &&
          prevData?.[key] !== data[key]
        ) {
          updatedData = {
            ...updatedData,
            [key]: data[key],
          };
        }
        if (
          (key === "vivaMarks" ||
            key === "writtenTotalMarks" ||
            key === "mcqTotalMarks" ||
            key === "totalMarks") &&
          prevData?.[key] !== Number(data[key])
        ) {
          updatedData = {
            ...updatedData,
            [key]: Number(data[key]),
          };
        }
      }

      console.log(updatedData);

      dispatch(editInterview(updatedData));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      open={!!interviewEditId}
      onOpenChange={(open: boolean) => {
        if (!open) {
          dispatch(removeInterviewEditId());
        }
      }}
    >
      <DialogContent
        className="p-0 overflow-hidden min-w-11/12"
        aria-describedby="Edit Interview"
      >
        <DialogHeader className="sr-only">
          <DialogTitle className="text-xl">Edit Interview</DialogTitle>
          <DialogDescription>Here you will Edit Interview</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="border">
            <h2 className="text-xl font-semibold border-b pt-1 pb-3 px-4">
              Edit Interview
            </h2>
            <Form {...form}>
              <form
                id="addInterview"
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6 px-6 py-4"
              >
                <FormField
                  control={form.control}
                  name="interview"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                      <FormLabel className="justify-end text-[#212529]">
                        Interview <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Label>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          Completed
                        </Label>
                      </FormControl>
                      <FormDescription className="sr-only">
                        click if the interview is completed.
                      </FormDescription>
                      <div />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vivaMarks"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                      <FormLabel className="justify-end text-[#212529]">
                        Viva Marks <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Viva Marks"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Enter Viva Marks.
                      </FormDescription>
                      <div />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="writtenTotalMarks"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                      <FormLabel className="justify-end text-[#212529]">
                        Written Marks <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Written Marks"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Enter Written Marks.
                      </FormDescription>
                      <div />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mcqTotalMarks"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                      <FormLabel className="justify-end text-[#212529]">
                        MCQ Marks <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="MCQ Marks"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Enter MCQ Marks.
                      </FormDescription>
                      <div />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="totalMarks"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                      <FormLabel className="justify-end text-[#212529]">
                        Total Marks <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Total Marks"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Enter Total Marks.
                      </FormDescription>
                      <div />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="selection"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                      <FormLabel className="justify-end text-[#212529]">
                        Selection <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Label>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          Selected
                        </Label>
                      </FormControl>
                      <FormDescription className="sr-only">
                        click if the candidate is selected.
                      </FormDescription>
                      <div />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
        <DialogFooter className="p-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="addInterview">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditInterviewForm;
