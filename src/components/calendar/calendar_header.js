export default function CalendarHeader({ currentDay, months, previousDay, nextDay }) {
    return (
        <div className="calendar-header">
            <div className="title">
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
            </div>
        </div>
    );
};