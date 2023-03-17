import '../styles/DashboardStatsContainer.scss'

export default function DashboardStatsContainer({
  color,
  icon,
  title,
  number,
}) {
  return (
    <div className={`show__stats ${color}`}>
      {icon}
      <div className="show__stats__info">
        <p className="users__title">{title}</p>
        <p className="users__num">{number}</p>
      </div>
    </div>
  );
}
