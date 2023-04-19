import React, { Fragment, useState } from "react";
import { PopoverAnime } from "./export.js";

export default function CalendarDayAnimeMobile({ day, formattedArray }) {
    const [popoverVisibility, setPopoverVisibility] = useState({});

    const handlePopoverToggle = (popoverId) => {
        setPopoverVisibility((prevState) => ({
            ...prevState,
            [popoverId]: !prevState[popoverId],
        }));
    };

    return (
        <Fragment>
            <ul className="animeContent">
                {
                    formattedArray.map((anime, index) => (
                        <span key={index}>
                            <PopoverAnime anime={anime} popoverVisibility={popoverVisibility} handlePopoverToggle={handlePopoverToggle} />
                        </span>
                    ))
                }
            </ul>
        </Fragment >
    );
};
