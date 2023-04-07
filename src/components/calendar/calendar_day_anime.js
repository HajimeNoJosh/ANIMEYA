import React, { useState } from "react";
import PopoverAnime from './popover_anime';

export default function CalendarDayAnime({ day, changeCurrentDay, formattedArray }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [popoverVisibility, setPopoverVisibility] = useState({});

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handlePopoverToggle = (popoverId) => {
        setPopoverVisibility((prevState) => ({
            ...prevState,
            [popoverId]: !prevState[popoverId],
        }));
    };

    return (
        <div
            className={"calendar-day-anime calendar-day" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")}
            onClick={() => changeCurrentDay(day)}
        >
            <p>{day.number}</p>
            <ul className="animeContent">
                {isExpanded ? (
                    formattedArray.map((anime, index) => (
                        <span key={index}>
                            <PopoverAnime anime={anime} popoverVisibility={popoverVisibility} handlePopoverToggle={handlePopoverToggle} />
                        </span>
                    ))
                ) : (
                    formattedArray.slice(0, 2).map((anime, index) => (
                        <span key={index}>
                            <PopoverAnime anime={anime} popoverVisibility={popoverVisibility} handlePopoverToggle={handlePopoverToggle} />
                        </span>
                    ))
                )}
                {formattedArray.length > 2 && !isExpanded && (
                    <span onClick={toggleExpand}>{`+${formattedArray.length - 2} more`}</span>
                )}
                {formattedArray.length > 2 && isExpanded && (
                    <span onClick={toggleExpand}>{"- Show less"}</span>
                )}
            </ul>
        </div>
    );
};
