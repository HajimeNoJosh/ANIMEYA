import React, { useState } from 'react';
import moment from 'moment'
import { CalendarDayAnimeMobile } from "../components/export.js";

export default function BuildCalendar({ anime, today }) {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [currentDay, setCurrentDay] = useState(new Date());

    const changeCurrentDay = (day) => {
        if (day.year) {
            setCurrentDay(new Date(day.year, day.month, day.number));
        } else {
            setCurrentDay(today)
        }
    }

    const findOutIfAnimeMatchesDay = (dayDate) => {
        const animeToShow = [];

        for (let i = 0; i < anime.length; i++) {
            let air_dates = anime[i].airingSchedule.nodes;

            for (let j = 0; j < air_dates.length; j++) {
                const date = moment.unix(air_dates[j].airingAt);
                const formattedDate = new Date(date);
                const airTime = new Date(date);

                formattedDate.setHours(0);
                formattedDate.setMinutes(0);
                formattedDate.setSeconds(0);
                formattedDate.setMilliseconds(0);

                const title = anime[i].title.english ? anime[i].title.english : anime[i].title.romaji ? anime[i].title.romaji : anime[i].title.native;
                const hasAnimeAlready = animeToShow.some(e => e ? e.title === title : false)

                if (formattedDate.getTime() === dayDate.getTime() && !hasAnimeAlready) {
                    const image = anime[i].coverImage.extraLarge
                    const rating = anime[i].averageScore
                    const description = anime[i].description
                    animeToShow.push({ title: title, image: image, rating: rating, airTime: airTime, hour: formattedDate.getHours(), minute: formattedDate.getMinutes(), description: description })
                } else {
                    continue
                }
            }
        }
        const sortedAnime = animeToShow.sort((anime1, anime2) => {
            return (anime1.airTime > anime2.airTime) ?
                1 : (anime1.airTime < anime2.airTime) ? -1
                    : 0
        });

        return sortedAnime
    }

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
                id_for_element: firstDayOfMonth.toDateString(),
                weekday: firstDayOfMonth.getDay()
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
                        let animeToShow = findOutIfAnimeMatchesDay(day.date);
                        const formattedArray = animeToShow.map((item, index) => (
                            <li
                                id={"anime-" + item.title}
                                image={item.image}
                                title={item.title}
                                rating={item.rating}
                                description={item.description}
                                airtime={item.airTime.toLocaleTimeString()}
                                className="animeContent-anime"
                                key={index}
                            >
                                <div className="animeContent-anime-item truncate">{item.title}</div>
                            </li>
                        ));

                        return (
                            <div id={"container-wrapper-" + day.id_for_element} key={day.date} className="container_body-wrapper" >
                                <div className={"container_body-wrapper-date"}>
                                    <div>
                                        <div className="container_body-wrapper-date-number">{day.number}</div>
                                        <div>{weekdays[day.weekday]}</div>
                                    </div>
                                </div>
                                <div className="container_body-wrapper-anime">
                                    <CalendarDayAnimeMobile day={day} changeCurrentDay={changeCurrentDay} formattedArray={formattedArray}></CalendarDayAnimeMobile>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

}
