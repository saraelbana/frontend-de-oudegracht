import "./DashboardCard.css";

function DashboardCard({title, value}) {
    return (
        <div className="stat-card">
            <div className="stat-header">
                <h2>Total {title}</h2>
            </div>
            <div className="stat-content">
                <span className="stat-number">{value}</span>
                <p className="stat-description">Available {title}</p>
            </div>
        </div>
    );
}

export default DashboardCard;