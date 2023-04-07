export default function TableHeader({ weekdays }) {
    return (
        <div className="table-header">
            {weekdays.map((weekday) => {
                return <div className="weekday"><p>{weekday}</p></div>;
            })}
        </div>
    );
};