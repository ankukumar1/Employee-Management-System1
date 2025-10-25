import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LeaveForm() {
  return (
    <form className="space-y-4">
      <Input label="Employee" name="employee" placeholder="Select employee" />
      <Input label="Leave Type" name="leaveType" placeholder="Annual" />
      <Input label="From" type="date" name="from" />
      <Input label="To" type="date" name="to" />
      <div className="flex justify-end">
        <Button type="submit">Submit Request</Button>
      </div>
    </form>
  );
}
