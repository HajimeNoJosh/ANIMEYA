import React, { Fragment, useState } from 'react';
import moment from 'moment'
import CalendarHeader from './calendar_header';
import TableHeader from './table_header';
import CalendarDayAnime from './calendar_day_anime';

export default function Calendar({ anime }) {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // CalendarAnimeExpress - A website that offers a comprehensive calendar or tracker for airing schedules of currently airing anime series.
  const [currentDay, setCurrentDay] = useState(new Date());
  const today = new Date();

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

  const changeCurrentDay = (day) => {
    if (day.year) {
      setCurrentDay(new Date(day.year, day.month, day.number));
    } else {
      setCurrentDay(today)
    }
  }

  const nextDay = () => {
    setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 1));
  }

  const previousDay = () => {
    setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth() - 1, 1));
  }

  const getCalendarDays = () => {
    const firstDayOfMonth = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);
    const weekdayOfFirstDay = firstDayOfMonth.getDay();
    let currentDays = [];

    for (let day = 0; day < 35; day++) {
      if (day === 0 && weekdayOfFirstDay === 0) {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
      } else if (day === 0) {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - 2));
      } else {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
      }

      let calendarDay = {
        currentMonth: (firstDayOfMonth.getMonth() === currentDay.getMonth()),
        date: (new Date(firstDayOfMonth)),
        month: firstDayOfMonth.getMonth(),
        number: firstDayOfMonth.getDate(),
        selected: (firstDayOfMonth.toDateString() === currentDay.toDateString()),
        year: firstDayOfMonth.getFullYear()
      }

      currentDays.push(calendarDay);
    }

    return currentDays;
  }

  return (
    <Fragment>
      <CalendarHeader changeCurrentDay={changeCurrentDay} currentDay={currentDay} months={months} previousDay={previousDay} nextDay={nextDay} today={today} />
      <div className="calendar-body">
        <TableHeader weekdays={weekdays} />
        <div className="table-content">
          {
            getCalendarDays().map((day) => {
              const animeToShow = findOutIfAnimeMatchesDay(day.date)
              const formattedArray = animeToShow.map((item, index) => (

                <li id={"anime-" + item.title} image={item.image} title={item.title} className='animeContent-anime' key={index}><div className="animeContent-anime-item truncate">{item.title}</div></li>
              ));

              return (
                <CalendarDayAnime day={day} changeCurrentDay={changeCurrentDay} formattedArray={formattedArray} />
              )
            })
          }
        </div>
      </div>
    </Fragment>
  )
}
