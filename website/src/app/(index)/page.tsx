import { Button } from "@/components/ui/button";
import { ModeToggle } from "./_components/mode-toggle";

export default function IndexPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button variant="default">Click me!</Button>
      <ModeToggle />
    </div>
  );
}
