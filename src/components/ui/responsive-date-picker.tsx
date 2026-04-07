'use client';
import * as React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar, CalendarProps } from '@/components/ui/calendar';
import { useMediaQuery } from '@/hooks/use-media-query';

interface ResponsiveDatePickerProps extends Omit<CalendarProps, 'onSelect' | 'mode' | 'selected'> {
  date?: Date;
  onSelect: (date: Date | undefined) => void;
  triggerButton: React.ReactNode;
}

export function ResponsiveDatePicker({ date, onSelect, triggerButton, ...props }: ResponsiveDatePickerProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(date);

  // When the popover opens, sync the internal state with the external prop
  React.useEffect(() => {
    if (isOpen) {
      setSelectedDate(date);
    }
  }, [isOpen, date]);

  const handleSelect = (newDate: Date | undefined) => {
    setSelectedDate(newDate);
    if (!isDesktop) {
        onSelect(newDate);
        setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleOk = () => {
    onSelect(selectedDate);
    setIsOpen(false);
  };
  
  const CalendarComponent = Calendar as any;

  if (isDesktop) {
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild onMouseDown={(e) => e.preventDefault()}>{triggerButton}</PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            onCancel={handleCancel}
            onOk={handleOk}
            initialFocus
            {...props}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <>
      <div onClick={() => setIsOpen(true)}>
        {triggerButton}
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="p-0 border-0 w-auto bg-transparent flex items-center justify-center">
           <CalendarComponent
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            onCancel={handleCancel}
            onOk={handleOk}
            initialFocus
            {...props}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
