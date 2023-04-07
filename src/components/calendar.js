import React, { useState } from 'react';
import { Popover } from 'react-tiny-popover'
import moment from 'moment'

export default function Calendar({ anime }) {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [currentDay, setCurrentDay] = useState(new Date());
  const [popoverVisibility, setPopoverVisibility] = useState({
    popover1: false,
    popover2: false
  });

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

        if (formattedDate.getTime() === dayDate.getTime() && !animeToShow.includes(title)) {
          animeToShow.push(title)
        } else {
          continue
        }
      }
    }

    return animeToShow
  }



  const changeCurrentDay = (day) => {
    setCurrentDay(new Date(day.year, day.month, day.number));
  }

  const nextDay = () => {
    setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 1));
  }

  const previousDay = () => {
    setCurrentDay(new Date(currentDay.getFullYear(), currentDay.getMonth() - 1, 1));
  }

  const handlePopoverToggle = (popoverId) => {
    setPopoverVisibility((prevState) => ({
      ...prevState,
      [popoverId]: !prevState[popoverId],
    }));
  };

  const getCalendarDays = () => {
    const firstDayOfMonth = new Date(currentDay.getFullYear(), currentDay.getMonth(), 1);
    const weekdayOfFirstDay = firstDayOfMonth.getDay();
    let currentDays = [];

    for (let day = 0; day < 42; day++) {
      if (day === 0 && weekdayOfFirstDay === 0) {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
      } else if (day === 0) {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
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
    <div className="calendar">
      <div className="calendar-header">
        {/* <div className="title">
          <h2>{months[currentDay.getMonth()]} {currentDay.getFullYear()}</h2>
        </div>
        <div className="tools">
          <button onClick={previousDay}>
            <span className="material-icons">
              arrow_back
            </span>
          </button>
          <p>{months[currentDay.getMonth()].substring(0, 3)} {currentDay.getDate()}</p>
          <button onClick={nextDay}>
            <span className="material-icons">
              arrow_forward
            </span>
          </button>
        </div> */}
      </div>
      <div className="calendar-body">
        <div className="table-header">
          {
            weekdays.map((weekday) => {
              return <div className="weekday" > <p>{weekday}</p></div>
            })
          }
        </div>
        <div className="table-content">
          {
            getCalendarDays().map((day) => {
              const animeToShow = findOutIfAnimeMatchesDay(day.date)

              const formattedArray = animeToShow.map((item, index) => (
                <li id={"anime-" + item} className='animeContent-anime' key={index}><div className="animeContent-anime-item">{item}</div></li>
              ));

              return (
                <div className={"calendar-day-anime calendar-day" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")}
                  onClick={() => changeCurrentDay(day)}>
                  <p>{day.number}</p>
                  <ul className="animeContent">{formattedArray}</ul>
                </div>
              )
            })
          }

          <div>

            {/* Popover 1 */}
            <Popover
              isOpen={popoverVisibility.popover1}
              positions={['top', 'left']} // if you'd like, you can limit the positions
              onClickOutside={() => handlePopoverToggle('popover1')}
              content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
                <div>
                  <div>Hi! I'm popover content. Here's my current position: {position}.</div>
                  <div>I'm {` ${nudgedLeft} `} pixels beyond my boundary horizontally!</div>
                  <div>I'm {` ${nudgedTop} `} pixels beyond my boundary vertically!</div>
                </div>
              )}
            /* Other Popover 1 props */
            >
              {/* Content for Popover 1 */}
              <div onClick={() => handlePopoverToggle('popover1')}>
                Click me to toggle Popover 1
              </div>
            </Popover>

            {/* Popover 2 */}
            <Popover
              isOpen={popoverVisibility.popover2}
              positions={['top', 'left']} // if you'd like, you can limit the positions
              onClickOutside={() => handlePopoverToggle('popover2')}
              content={({ position, nudgedLeft, nudgedTop }) => ( // you can also provide a render function that injects some useful stuff!
                <div>
                  <div>Hi! I'm popover content. Here's my current position: {position}.</div>
                  <div>I'm {` ${nudgedLeft} `} pixels beyond my boundary horizontally!</div>
                  <div>I'm {` ${nudgedTop} `} pixels beyond my boundary vertically!</div>
                </div>
              )}
            /* Other Popover 2 props */
            >
              {/* Content for Popover 2 */}
              <div onClick={() => handlePopoverToggle('popover2')}>
                Click me to toggle Popover 2
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </div >
  )
}
