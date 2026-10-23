import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "cn";

export function Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  className,
  disabled,
  ...props
}) {
  const [isChecked, setIsChecked] = React.useState(defaultChecked);
  const checked = controlledChecked !== undefined ? controlledChecked : isChecked;

  const toggle = () => {
    if (disabled) return;
    const next = !checked;
    if (controlledChecked === undefined) setIsChecked(next);
    onCheckedChange?.(next);
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "peer size-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center cursor-pointer transition-colors",
        checked ? "bg-primary text-primary-foreground" : "bg-card text-transparent",
        className
      )}
      {...props}
    >
      <Check className={cn("size-3 stroke-[3]", checked ? "block" : "hidden")} />
    </button>
  );
}
