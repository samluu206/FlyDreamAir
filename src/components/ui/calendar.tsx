import * as React from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "./utils";
import { buttonVariants } from "./button";

type Props = React.ComponentProps<typeof DayPicker>;

const orientationIcons = {
  up: ChevronUp,
  down: ChevronDown,
  left: ChevronLeft,
  right: ChevronRight,
} as const;

type ChevronOrientation = keyof typeof orientationIcons;

type DayPickerChevronProps = React.ComponentProps<typeof ChevronRight> & {
  orientation?: ChevronOrientation;
};

const DefaultChevron = ({
  className,
  orientation = "right",
  size,
  ...iconProps
}: DayPickerChevronProps) => {
  const Icon = orientationIcons[orientation] ?? ChevronRight;
  return (
    <Icon
      className={cn("h-4 w-4", className)}
      size={size ?? 16}
      {...iconProps}
    />
  );
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: Props) {
  const {
    components: userComponents,
    modifiersClassNames: userModifiersClassNames,
    styles: userStyles,
    ...restProps
  } = props as Props & {
    components?: Record<string, any>;
    modifiersClassNames?: Record<string, string>;
    styles?: Record<string, React.CSSProperties>;
  };

  const navButtonClasses = cn(
    buttonVariants({ variant: "ghost", size: "icon" }),
    "h-7 w-7 bg-transparent p-0 opacity-60 hover:opacity-100 hover:bg-accent z-20"
  );

  const baseClassNames: NonNullable<Props["classNames"]> = {
    root: "",
    months: "flex flex-col sm:flex-row gap-4",
    month: "space-y-4",
    month_caption: "flex justify-center pt-1 relative items-center h-10 mb-2",
    caption_label: "text-sm font-semibold pointer-events-none",
    nav: "flex items-center",
    button_previous: cn(navButtonClasses, "absolute left-0"),
    button_next: cn(navButtonClasses, "absolute right-0"),
    chevron: "h-4 w-4 pointer-events-none",
    weekdays: "flex",
    weekday: "text-muted-foreground rounded-md w-9 h-9 font-medium text-xs flex items-center justify-center",
    month_grid: "w-full border-collapse space-y-1",
    week: "flex w-full mt-2",
    day: "h-9 w-9 text-center text-sm p-0 relative flex items-center justify-center",
    day_button: cn(
      buttonVariants({ variant: "ghost" }),
      "h-9 w-9 p-0 font-normal rounded-md hover:bg-accent hover:text-accent-foreground"
    ),
    range_end: "day-range-end",
    selected: "day-selected",
    outside: "day-outside",
    disabled: "day-disabled",
    range_middle: "day-range-middle",
    hidden: "invisible",
    footer: "pt-3",
  };

  const baseModifiers: NonNullable<Props["modifiersClassNames"]> = {
    selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
    today: "bg-accent text-accent-foreground font-bold",
    outside: "day-outside text-muted-foreground opacity-50 pointer-events-none",
    disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
    range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
    hidden: "invisible",
  };

  const mergedStyles: NonNullable<Props["styles"]> = {
    ...userStyles,
  };

  const mergedClassNames = { ...baseClassNames, ...classNames };
  const mergedModifiers = { ...baseModifiers, ...userModifiersClassNames };
  const mergedComponents = {
    ...(userComponents ?? {}),
    Chevron: userComponents?.Chevron ?? DefaultChevron,
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={mergedClassNames}
      modifiersClassNames={mergedModifiers}
      components={mergedComponents as Props["components"]}
      styles={mergedStyles}
      {...(restProps as Props)}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
