import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Calendar({
  className,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const [month, setMonth] = React.useState(() => new Date());

  const handlePrev = () => {
    const prev = new Date(month);
    prev.setMonth(prev.getMonth() - 1);
    setMonth(prev);
  };

  const handleNext = () => {
    const next = new Date(month);
    next.setMonth(next.getMonth() + 1);
    setMonth(next);
  };

  return (
    <div className={cn("p-3", className)}>
      <div className="flex justify-between mb-2">
        <button
          type="button"
          onClick={handlePrev}
          className={cn(buttonVariants({ variant: "outline" }), "size-7 p-0")}
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className={cn(buttonVariants({ variant: "outline" }), "size-7 p-0")}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
      <DayPicker month={month} onMonthChange={setMonth} {...props} />
    </div>
  );
}

export { Calendar };
