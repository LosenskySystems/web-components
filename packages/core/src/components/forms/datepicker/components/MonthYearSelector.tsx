import React, { useState } from 'react';
import type { MonthYearSelectorProps } from '../datepicker.types';
import { getMonthNames } from '../utils/calendarUtils';
import { addMonths, addYears } from '../utils/dateUtils';

export const MonthYearSelector: React.FC<MonthYearSelectorProps> = ({
  currentDate,
  onDateChange,
  onTodayClick,
  disabled = false
}) => {
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearInputOpen, setIsYearInputOpen] = useState(false);
  const [yearInput, setYearInput] = useState(currentDate.getFullYear().toString());

  const monthNames = getMonthNames();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const handlePreviousMonth = () => {
    if (disabled) return;
    onDateChange(addMonths(currentDate, -1));
  };

  const handleNextMonth = () => {
    if (disabled) return;
    onDateChange(addMonths(currentDate, 1));
  };

  const handlePreviousYear = () => {
    if (disabled) return;
    onDateChange(addYears(currentDate, -1));
  };

  const handleNextYear = () => {
    if (disabled) return;
    onDateChange(addYears(currentDate, 1));
  };

  const handleMonthSelect = (monthIndex: number) => {
    if (disabled) return;
    const newDate = new Date(currentDate);
    newDate.setMonth(monthIndex);
    onDateChange(newDate);
    setIsMonthDropdownOpen(false);
  };

  const handleYearChange = (year: number) => {
    if (disabled) return;
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    onDateChange(newDate);
    setIsYearInputOpen(false);
  };

  const handleYearInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const year = parseInt(yearInput, 10);
    if (!isNaN(year) && year >= 1900 && year <= 2100) {
      handleYearChange(year);
    } else {
      setYearInput(currentYear.toString());
    }
  };

  const handleTodayClick = () => {
    if (disabled) return;
    onTodayClick();
  };

  return (
    <div className="web-monthyear-selector">
      {/* Navigation Arrows */}
      <div className="web-monthyear-navigation">
        <button
          type="button"
          className="web-monthyear-nav-button web-monthyear-nav-button-left"
          onClick={handlePreviousYear}
          disabled={disabled}
          aria-label="Previous year"
        >
          ◀◀
        </button>
        <button
          type="button"
          className="web-monthyear-nav-button web-monthyear-nav-button-left"
          onClick={handlePreviousMonth}
          disabled={disabled}
          aria-label="Previous month"
        >
          ◀
        </button>
      </div>

      {/* Month/Year Display */}
      <div className="web-monthyear-display">
        {/* Month Dropdown */}
        <div className="web-monthyear-dropdown">
          <button
            type="button"
            className="web-monthyear-dropdown-button"
            onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
            disabled={disabled}
            aria-label="Select month"
          >
            {monthNames[currentMonth]}
          </button>
          
          {isMonthDropdownOpen && (
            <div className="web-monthyear-dropdown-menu">
              {monthNames.map((month, index) => (
                <button
                  key={month}
                  type="button"
                  className={`web-monthyear-dropdown-item ${
                    index === currentMonth ? 'web-monthyear-dropdown-item-active' : ''
                  }`}
                  onClick={() => handleMonthSelect(index)}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Year Input */}
        <div className="web-monthyear-year">
          {isYearInputOpen ? (
            <form onSubmit={handleYearInputSubmit}>
              <input
                type="number"
                className="web-monthyear-year-input"
                value={yearInput}
                onChange={(e) => setYearInput(e.target.value)}
                onBlur={() => {
                  const year = parseInt(yearInput, 10);
                  if (!isNaN(year) && year >= 1900 && year <= 2100) {
                    handleYearChange(year);
                  } else {
                    setYearInput(currentYear.toString());
                    setIsYearInputOpen(false);
                  }
                }}
                min={1900}
                max={2100}
                autoFocus
              />
            </form>
          ) : (
            <button
              type="button"
              className="web-monthyear-year-button"
              onClick={() => setIsYearInputOpen(true)}
              disabled={disabled}
              aria-label="Select year"
            >
              {currentYear}
            </button>
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="web-monthyear-navigation">
        <button
          type="button"
          className="web-monthyear-nav-button web-monthyear-nav-button-right"
          onClick={handleNextMonth}
          disabled={disabled}
          aria-label="Next month"
        >
          ▶
        </button>
        <button
          type="button"
          className="web-monthyear-nav-button web-monthyear-nav-button-right"
          onClick={handleNextYear}
          disabled={disabled}
          aria-label="Next year"
        >
          ▶▶
        </button>
      </div>

      {/* Today Button */}
      <button
        type="button"
        className="web-monthyear-today-button"
        onClick={handleTodayClick}
        disabled={disabled}
        aria-label="Go to today"
      >
        Today
      </button>
    </div>
  );
};
