import React, { useEffect, useRef, useState } from "react";
import { getWeekStartDates } from "../utilities/weekSelector";

interface WeekSelectorProps {
    onWeekSelect: (selectedDate: Date) => void;
    selectedDate: Date | null;
}

function WeekSelector({ onWeekSelect, selectedDate }: WeekSelectorProps) {
    const [weeks, setWeeks] = useState<Date[]>([]);
    const currentWeekRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const weekStartDates = getWeekStartDates(3, 3);
        setWeeks(weekStartDates);
    }, []);

    useEffect(() => {
        // Scroll the current week's Monday into view on mount
        if (currentWeekRef.current) {
            currentWeekRef.current.scrollIntoView({
                behavior: "smooth",
                inline: "center",
            });
        }
    }, [weeks]);

    // Identify 'current' Monday for the initial auto-scroll and highlight,
    // but don't rely on it to drive clicked styling
    const today = new Date();
    const currentMonday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1)
    );
    const currentMondayString = currentMonday.toDateString();

    const formatDate = (date: Date) =>
        date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });

    return (
        <div className="flex justify-center overflow-x-auto whitespace-nowrap p-2.5 mb-5">
            {weeks.map((weekDate) => {
                const weekString = weekDate.toDateString();

                // If you still want to highlight the "current Monday" at mount,
                // you can keep that logic. For scroll, we keep the ref here:
                const isCurrentMonday = weekString === currentMondayString;

                // For the *click highlight*, check if weekDate matches selectedDate
                const isSelected =
                    selectedDate &&
                    weekDate.toDateString() === selectedDate.toDateString();

                // Decide the styling if this is the selected date vs. not
                // You might also unify "current Monday" highlight & "selected" highlight
                // but typically you'd just highlight whichever is selected.
                const boxStyle = isSelected
                    ? "bg-[#8884d8] text-white"
                    : "bg-[#f3f3f3] text-black";

                return (
                    <div
                        key={weekString}
                        ref={isCurrentMonday ? currentWeekRef : null}
                        onClick={() => onWeekSelect(weekDate)}
                        className={`
              inline-block
              min-w-[100px]
              mx-2
              px-2
              py-2
              text-center
              border
              border-gray-300
              rounded-lg
              cursor-pointer
              ${boxStyle}
            `}
                    >
                        {formatDate(weekDate)}
                    </div>
                );
            })}
        </div>
    );
}

export default WeekSelector;
