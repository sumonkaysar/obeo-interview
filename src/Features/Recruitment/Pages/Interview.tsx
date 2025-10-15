import { Button } from "@/components/ui/button";
import AddInterviewForm from "@/Features/Recruitment/Components/Interview/AddInterviewForm";
import InterviewTable from "@/Features/Recruitment/Components/Interview/InterviewTable";

const Interview = () => {
  return (
    <div className="px-3 py-2 bg-[#F4F4F5] min-h-screen">
      <div className="bg-white shadow-md rounded-xs mx-auto border">
        <div className="flex justify-between items-center border-b py-3 px-4">
          <h2 className="text-xl font-semibold">Interview</h2>
          <div className="flex items-center gap-3">
            <AddInterviewForm />
            <Button>Manage Interview</Button>
          </div>
        </div>
        <div className="px-4 py-3">
          <InterviewTable />
        </div>
      </div>
    </div>
  );
};

export default Interview;
