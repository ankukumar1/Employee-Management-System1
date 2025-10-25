import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function EmployeeForm() {
  return (
    <form className="space-y-4">
      <Input label="Full Name" name="name" placeholder="Jane Doe" required />
      <Input label="Email" type="email" name="email" placeholder="jane.doe@example.com" required />
      <Input label="Role" name="role" placeholder="Software Engineer" />
      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
