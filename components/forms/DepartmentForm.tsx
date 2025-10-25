import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function DepartmentForm() {
  return (
    <form className="space-y-4">
      <Input label="Department Name" name="name" placeholder="Human Resources" required />
      <Input label="Department Head" name="head" placeholder="Alice Johnson" />
      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
