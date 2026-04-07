
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, DropdownProps } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants, Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { ScrollArea } from "./scroll-area"
import { ptBR } from "date-fns/locale";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
    onCancel?: () => void;
    onOk?: () => void;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  onCancel,
  onOk,
  ...props
}: CalendarProps) {

  return (
    <div className="flex rounded-lg overflow-hidden shadow-2xl bg-background">
      <div className="w-48 bg-accent text-accent-foreground p-6 flex-col items-start hidden sm:flex">
        <p className="text-sm font-semibold tracking-wider uppercase mb-4">SELECIONE A DATA</p>
        {props.selected && props.selected instanceof Date ? (
            <div>
              <p className="text-2xl font-bold capitalize">{props.selected.toLocaleDateString('pt-BR', { weekday: 'short', timeZone: 'UTC' }).replace('.',',')} {props.selected.toLocaleDateString('pt-BR', { day: 'numeric', timeZone: 'UTC' })}</p>
              <p className="text-2xl font-bold capitalize">de {props.selected.toLocaleDateString('pt-BR', { month: 'short', timeZone: 'UTC' }).replace('.', '')}</p>
            </div>
        ): (
             <div>
              <p className="text-2xl font-bold">Selecione</p>
              <p className="text-2xl font-bold">um dia</p>
            </div>
        )}
      </div>
      <div className="flex flex-col">
          <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-4", className)}
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-semibold hidden",
              caption_dropdowns: "flex gap-2 items-center",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                buttonVariants({ variant: "outline" }),
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border-none"
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex justify-around mb-2",
              head_cell: "text-muted-foreground rounded-md w-9 font-normal text-xs uppercase",
              row: "flex w-full mt-2 justify-around",
              cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: cn(
                buttonVariants({ variant: "ghost" }),
                "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
              ),
              day_range_end: "day-range-end",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full",
              day_today: "bg-accent/20 text-accent-foreground rounded-full",
              day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
              ...classNames,
            }}
            locale={ptBR}
            formatters={{
                formatWeekdayName: (day) => day.toLocaleDateString('pt-BR', { weekday: 'narrow' })
            }}
            captionLayout="dropdown-buttons"
            fromYear={new Date().getFullYear() - 80}
            toYear={new Date().getFullYear() + 10}
            components={{
              IconLeft: () => <ChevronLeft className="h-4 w-4" />,
              IconRight: () => <ChevronRight className="h-4 w-4" />,
              Dropdown: ({ value, onChange, children, ...dropdownProps }: DropdownProps) => {
                const options = React.Children.toArray(children) as React.ReactElement<React.HTMLProps<HTMLOptionElement>>[];
                const selectValue = String(value);
                const isMonth = dropdownProps.name === 'months';
                
                const handleValueChange = (newValue: string) => {
                    if (isMonth) {
                        const newDate = new Date();
                        newDate.setMonth(parseInt(newValue, 10));
                        onChange?.({ target: { value: newValue } } as any);
                    } else {
                        const newDate = new Date();
                        newDate.setFullYear(parseInt(newValue, 10));
                         onChange?.({ target: { value: newValue } } as any);
                    }
                };

                return (
                    <Select
                        onValueChange={handleValueChange}
                        value={selectValue}
                    >
                        <SelectTrigger className="pr-1.5 focus:ring-0 w-auto font-semibold border-none bg-transparent capitalize text-base h-auto p-0">
                            <SelectValue>{options.find(child => child.props.value === selectValue)?.props.children}</SelectValue>
                        </SelectTrigger>
                        <SelectContent position="popper" className="max-h-60">
                           <ScrollArea>
                            {options.map((option) => (
                                <SelectItem key={String(option.props.value)} value={String(option.props.value)}>
                                    {option.props.children}
                                </SelectItem>
                            ))}
                            </ScrollArea>
                        </SelectContent>
                    </Select>
                );
              },
            }}
            {...props}
          />
           <div className="flex justify-end gap-2 p-4 border-t border-border">
                <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
                <Button onClick={onOk}>OK</Button>
            </div>
       </div>
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
