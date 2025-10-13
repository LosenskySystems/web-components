import React, { useState, useEffect } from 'react';
import type { TimeInputProps } from '../datepicker.types';

export const TimeInput: React.FC<TimeInputProps> = ({
  value,
  onChange,
  format = '24h',
  disabled = false,
  size = 'md'
}) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isAm, setIsAm] = useState(true);

  // Update internal state when value changes
  useEffect(() => {
    if (value) {
      let h = value.getHours();
      const m = value.getMinutes();
      
      if (format === '12h') {
        setIsAm(h < 12);
        h = h === 0 ? 12 : h > 12 ? h - 12 : h;
      }
      
      setHours(h);
      setMinutes(m);
    }
  }, [value, format]);

  const handleHoursChange = (newHours: number) => {
    if (disabled) return;
    
    let finalHours = newHours;
    
    if (format === '12h') {
      if (finalHours < 1) finalHours = 12;
      if (finalHours > 12) finalHours = 1;
      
      // Convert to 24h format for the onChange callback
      let hours24 = finalHours;
      if (finalHours === 12) {
        hours24 = isAm ? 0 : 12;
      } else if (!isAm) {
        hours24 = finalHours + 12;
      }
      
      const newDate = value ? new Date(value) : new Date();
      newDate.setHours(hours24, minutes, 0, 0);
      onChange(newDate);
    } else {
      if (finalHours < 0) finalHours = 23;
      if (finalHours > 23) finalHours = 0;
      const newDate = value ? new Date(value) : new Date();
      newDate.setHours(finalHours, minutes, 0, 0);
      onChange(newDate);
    }
    
    setHours(finalHours);
  };

  const handleMinutesChange = (newMinutes: number) => {
    if (disabled) return;
    
    if (newMinutes < 0) newMinutes = 59;
    if (newMinutes > 59) newMinutes = 0;
    
    setMinutes(newMinutes);
    
    let hours24 = hours;
    if (format === '12h') {
      if (hours === 12) {
        hours24 = isAm ? 0 : 12;
      } else if (!isAm) {
        hours24 = hours + 12;
      }
    }
    
    const newDate = value ? new Date(value) : new Date();
    newDate.setHours(hours24, newMinutes, 0, 0);
    onChange(newDate);
  };

  const handleAmPmToggle = () => {
    if (disabled) return;
    
    setIsAm(!isAm);
    
    let hours24 = hours;
    if (hours === 12) {
      hours24 = !isAm ? 0 : 12;
    } else {
      hours24 = !isAm ? hours + 12 : hours;
    }
    
    const newDate = value ? new Date(value) : new Date();
    newDate.setHours(hours24, minutes, 0, 0);
    onChange(newDate);
  };

  const incrementHours = () => {
    if (format === '12h') {
      handleHoursChange(hours >= 12 ? 1 : hours + 1);
    } else {
      handleHoursChange(hours >= 23 ? 0 : hours + 1);
    }
  };

  const decrementHours = () => {
    if (format === '12h') {
      handleHoursChange(hours <= 1 ? 12 : hours - 1);
    } else {
      handleHoursChange(hours <= 0 ? 23 : hours - 1);
    }
  };

  const incrementMinutes = () => {
    handleMinutesChange(minutes >= 59 ? 0 : minutes + 1);
  };

  const decrementMinutes = () => {
    handleMinutesChange(minutes <= 0 ? 59 : minutes - 1);
  };

  const sizeClasses = {
    sm: 'web-timeinput-sm',
    md: 'web-timeinput-md',
    lg: 'web-timeinput-lg'
  };

  return (
    <div className={`web-timeinput ${sizeClasses[size]} ${disabled ? 'web-timeinput-disabled' : ''}`}>
      <div className="web-timeinput-fields">
        {/* Hours */}
        <div className="web-timeinput-field">
          <button
            type="button"
            className="web-timeinput-button web-timeinput-button-up"
            onClick={incrementHours}
            disabled={disabled}
            aria-label="Increment hours"
          >
            ▲
          </button>
          <input
            type="number"
            className="web-timeinput-input"
            value={hours.toString().padStart(2, '0')}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val)) {
                handleHoursChange(val);
              }
            }}
            min={format === '12h' ? 1 : 0}
            max={format === '12h' ? 12 : 23}
            disabled={disabled}
            aria-label="Hours"
          />
          <button
            type="button"
            className="web-timeinput-button web-timeinput-button-down"
            onClick={decrementHours}
            disabled={disabled}
            aria-label="Decrement hours"
          >
            ▼
          </button>
        </div>

        <div className="web-timeinput-separator">:</div>

        {/* Minutes */}
        <div className="web-timeinput-field">
          <button
            type="button"
            className="web-timeinput-button web-timeinput-button-up"
            onClick={incrementMinutes}
            disabled={disabled}
            aria-label="Increment minutes"
          >
            ▲
          </button>
          <input
            type="number"
            className="web-timeinput-input"
            value={minutes.toString().padStart(2, '0')}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val)) {
                handleMinutesChange(val);
              }
            }}
            min={0}
            max={59}
            disabled={disabled}
            aria-label="Minutes"
          />
          <button
            type="button"
            className="web-timeinput-button web-timeinput-button-down"
            onClick={decrementMinutes}
            disabled={disabled}
            aria-label="Decrement minutes"
          >
            ▼
          </button>
        </div>
      </div>

      {/* AM/PM Toggle */}
      {format === '12h' && (
        <div className="web-timeinput-ampm">
          <button
            type="button"
            className={`web-timeinput-ampm-button ${isAm ? 'web-timeinput-ampm-button-active' : ''}`}
            onClick={() => !isAm && handleAmPmToggle()}
            disabled={disabled}
          >
            AM
          </button>
          <button
            type="button"
            className={`web-timeinput-ampm-button ${!isAm ? 'web-timeinput-ampm-button-active' : ''}`}
            onClick={() => isAm && handleAmPmToggle()}
            disabled={disabled}
          >
            PM
          </button>
        </div>
      )}
    </div>
  );
};
