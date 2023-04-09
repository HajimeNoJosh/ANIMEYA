import React, { useState, useEffect } from 'react';
import moment from 'moment'
// import CalendarHeader from './calendar_header';
// import TableHeader from './table_header';
// import CalendarDayAnime from './calendar_day_anime';

export default function MobileCalendar({ anime }) {
    // const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // CalendarAnimeExpress - A website that offers a comprehensive calendar or tracker for airing schedules of currently airing anime series.
    const [currentDay] = useState(new Date());
    const [today] = useState(new Date());

    useEffect(() => {
        const element = document.getElementById("container-wrapper-" + today.toDateString())
        const scrollElements = document.getElementsByClassName("container_body-wrapper")

        if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            element.scrollIntoView({ top: y, behavior: 'smooth' })
        }

        const handleScroll = () => {
            // Get the current scroll position
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Loop through elementRefs and find the top visible element
            let topMostVisibleElement = null; // Keep track of the topmost visible element
            [...scrollElements].forEach((container) => {
                // Get the first child element of the container
                const firstChildElement = container.firstElementChild;

                // Get the bounding rect of the first child element
                const rect = firstChildElement.getBoundingClientRect();

                // Check if the first child element is fully visible in the viewport
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    // Update the topMostVisibleElement if applicable
                    if (!topMostVisibleElement || rect.top < topMostVisibleElement.getBoundingClientRect().top) {
                        topMostVisibleElement = firstChildElement;
                    }
                }
            });

            // Loop through elementRefs again and apply classes
            [...scrollElements].forEach((container) => {
                // Get the first child element of the container
                const firstChildElement = container.firstElementChild;

                // Check if the first child element is the topmost visible element
                if (firstChildElement === topMostVisibleElement) {
                    // Get the bounding rect of the first child element
                    const rect = firstChildElement.getBoundingClientRect();

                    // Check if the element is completely visible in the viewport
                    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                        // Apply the "active" class
                        firstChildElement.classList.add("container_body-wrapper-date-active");
                        firstChildElement.classList.remove("container_body-wrapper-date-inactive");
                    } else {
                        // Apply the "inactive" class if the new element is completely at the top
                        firstChildElement.classList.add("container_body-wrapper-date-inactive");
                        firstChildElement.classList.remove("container_body-wrapper-date-active");
                    }
                } else {
                    // Apply the "inactive" class to all other elements
                    firstChildElement.classList.add("container_body-wrapper-date-inactive");
                    firstChildElement.classList.remove("container_body-wrapper-date-active");
                }
            });
        };



        window.addEventListener("scroll", handleScroll); // Add scroll event listener

        // Clean up the event listener when the component unmounts or when elementRefs changes
        return () => {
            window.removeEventListener("scroll", handleScroll); // Remove scroll event listener
        };
    }, [today]);

    const findOutIfAnimeMatchesDay = (dayDate) => {
        let animeToShow = [];
        for (let i = 0; i < anime.length; i++) {
            let air_dates = anime[i].airingSchedule.nodes;

            for (let j = 0; j < air_dates.length; j++) {
                const date = moment.unix(air_dates[j].airingAt);
                const formattedDate = new Date(date);

                formattedDate.setHours(0);
                formattedDate.setMinutes(0);
                formattedDate.setSeconds(0);
                formattedDate.setMilliseconds(0);

                const title = anime[i].title.english ? anime[i].title.english : anime[i].title.romaji ? anime[i].title.romaji : anime[i].title.native;
                const image = anime[i].coverImage.extraLarge
                const hasAnimeAlready = animeToShow.some(e => e.title === title)
                if (formattedDate.getTime() === dayDate.getTime() && !hasAnimeAlready) {
                    animeToShow.push({ title: title, image: image })
                } else {
                    continue
                }
            }
        }

        return animeToShow
    }

    // const changeCurrentDay = (day) => {
    //     if (day.year) {
    //         setCurrentDay(new Date(day.year, day.month, day.number));
    //     } else {
    //         setCurrentDay(today)
    //     }
    // }

    // const nextDay = () => {
    //     setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 1));
    // }

    // const previousDay = () => {
    //     setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth() - 1, 1));
    // }

    const getCalendarDays = () => {
        const firstDayOfMonth = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);
        const weekdayOfFirstDay = firstDayOfMonth.getDay();
        let currentDays = [];

        for (let day = 0; day < 31; day++) {
            if (day === 0 && weekdayOfFirstDay === 0) {
                firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
            } else if (day === 0) {
                firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day));
            } else {
                firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
            }

            let calendarDay = {
                currentMonth: (firstDayOfMonth.getMonth() === currentDay.getMonth()),
                date: (new Date(firstDayOfMonth)),
                month: firstDayOfMonth.getMonth(),
                number: firstDayOfMonth.getDate(),
                selected: (firstDayOfMonth.toDateString() === currentDay.toDateString()),
                year: firstDayOfMonth.getFullYear(),
                id_for_element: firstDayOfMonth.toDateString()
            }

            currentDays.push(calendarDay);
        }

        return currentDays;
    }

    return (
        <div className="App">
            <header>
                <h1 id="currentMonthYear">{`${months[currentDay.getMonth()]} ${currentDay.getFullYear()}`}</h1>
            </header>
            <div id="datesContainer" className="container">
                <div className='container_header'>
                    <div className='container_header-date'>Date</div>
                    <div className='container_header-events'>Events</div>
                </div>
                <div className='container_body'>
                    {getCalendarDays().map((day) => {
                        const animeToShow = findOutIfAnimeMatchesDay(day.date);
                        const formattedArray = animeToShow.map((item, index) => (
                            <li
                                id={"anime-" + item.title}
                                image={item.image}
                                title={item.title}
                                className="animeContent-anime"
                                key={index}
                            >
                                <div className="animeContent-anime-item truncate">{item.title}</div>
                            </li>
                        ));

                        return (
                            <div id={"container-wrapper-" + day.id_for_element} key={day.date} className="container_body-wrapper" >
                                <div className={"container_body-wrapper-date"}>
                                    <div className="container_body-wrapper-date-number">{day.number}</div>
                                </div>
                                <div className="container_body-wrapper-anime">
                                    <ul className="container_body-wrapper-anime-list">{formattedArray}</ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* <aside id="eventsContainer">
                {events.map((event) => (
                    <div key={event.id} className="event">
                        <div className="eventTitle">{event.title}</div>
                        <div className="eventTime">{event.time}</div>
                    </div>
                ))}
            </aside> */}
        </div>
    );

}
