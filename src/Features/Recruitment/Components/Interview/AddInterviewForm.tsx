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
  DialogTrigger,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addInterview,
  selectInterviewData,
} from "@/Features/Recruitment/recruitmentSlices/Interview.slice";
import { interviewZodSchema } from "@/Features/Recruitment/validations/interview.validation";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";

const AddInterviewForm = () => {
  const { shortlistCandidates } = useAppSelector(selectInterviewData);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const form = useForm({
    resolver: zodResolver(interviewZodSchema),
    defaultValues: {
      candidate: "",
      interview: false,
      vivaMarks: "",
      writtenTotalMarks: "",
      mcqTotalMarks: "",
      totalMarks: "",
      selection: false,
    },
  });

  const handleSubmit = async (data: z.infer<typeof interviewZodSchema>) => {
    try {
      const shortlistCandidate = shortlistCandidates.find(
        (candidate) => candidate._id === data.candidate
      );
      const interviewData = {
        firstName: shortlistCandidate?.firstName,
        lastName: shortlistCandidate?.lastName,
        candidateId: shortlistCandidate?.candidateId,
        position: shortlistCandidate?.position,
        interviewDate: shortlistCandidate?.interviewDate,
        interview: data.interview,
        vivaMarks: Number(data.vivaMarks),
        writtenTotalMarks: Number(data.writtenTotalMarks),
        mcqTotalMarks: Number(data.mcqTotalMarks),
        totalMarks: Number(data.totalMarks),
        selection: data.selection,
      };

      dispatch(addInterview(interviewData));
      if (closeBtnRef.current) {
        closeBtnRef.current.click();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>
            <Plus /> Add Interview
          </Button>
        </DialogTrigger>
        <DialogContent
          className="p-0 overflow-hidden min-w-11/12"
          aria-describedby="Add Interview"
        >
          <DialogHeader className="sr-only">
            <DialogTitle className="text-xl">Add Interview</DialogTitle>
            <DialogDescription>Here you will add Interview</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="border">
              <h2 className="text-xl font-semibold border-b pt-1 pb-3 px-4">
                Add Interview
              </h2>
              <Form {...form}>
                <form
                  id="addInterview"
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-6 px-6 py-4"
                >
                  <FormField
                    control={form.control}
                    name="candidate"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                        <FormLabel className="justify-end text-[#212529]">
                          Candidate<span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a candidate to shortlist" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {shortlistCandidates.map((candidate) => (
                              <SelectItem
                                key={candidate._id}
                                value={candidate._id}
                              >
                                {candidate.firstName} {candidate.lastName} (
                                {candidate.candidateId})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="sr-only">
                          Select a candidate
                        </FormDescription>
                        <div />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
              <Button type="button" ref={closeBtnRef} variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form="addInterview">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddInterviewForm;
