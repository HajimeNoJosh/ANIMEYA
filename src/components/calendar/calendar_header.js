export default function CalendarHeader({ currentDay, months, previousDay, nextDay, changeCurrentDay, today }) {
    return (
        <div className="calendar-header">
            <div className="title">
                <h2>{months[currentDay.getMonth()]} {currentDay.getFullYear()}</h2>
            </div>
            <button onClick={() => changeCurrentDay(today)}>
                Today
            </button>
            <div className="tools">
                <button onClick={previousDay}>
                    <span className="material-icons">
                        Previous Month
                    </span>
                </button>
                <p>{months[currentDay.getMonth()].substring(0, 3)} {currentDay.getDate()}</p>
                <button onClick={nextDay}>
                    <span className="material-icons">
                        Next Month
                    </span>
                </button>
            </div>
        </div>
    );
};