import React from 'react';
import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';
import { DateTimePicker as DateTimePickerComponent } from './DateTimePicker';
import type { DateTimePickerProps } from './datepicker.types';

export { type DateTimePickerProps } from './datepicker.types';

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  mode = 'date',
  showTime = false,
  ...props
}) => {
  // Determine the actual mode based on props
  const actualMode = showTime ? 'datetime' : mode;

  switch (actualMode) {
    case 'time':
      return <TimePicker {...props as any} />;
    
    case 'datetime':
      return <DateTimePickerComponent {...props} />;
    
    case 'date':
    default:
      return <DatePicker {...props} />;
  }
};
