import "./Dashboard.css";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../helpers/APIOperations.js";
import DashboardCard from "../dashboardCard/DashboardCard.jsx";

function Dashboard() {
    const [dashboardData, setDashboardData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const todayDate = new Date().toLocaleDateString('en-GB' /* UK format */, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    useEffect(() => {
        const loadDashboardData = async () => {
            setLoading(true);
            const [success, data] = await getDashboardData();

            if (success === 1) {
                setDashboardData(data);
            } else {
                setError(data);
            }
            setLoading(false);
        };

        loadDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="dashboard">
                <h2 className="loading-message">Loading dashboard data...</h2>
            </div>
        );
    }
    if (error) {
        return (
            <div className="dashboard">
                <h2 className="error-message">Error loading dashboard data</h2>

                <p>Please try again later</p>
            </div>
        );
    }
    return (
        <div className="dashboard">
            <section className="dashboard-header">
                <h1>Dashboard</h1>
                <p className="current-date">{todayDate}</p>
            </section>
            <section className="dashboard-stats">
                {
                    dashboardData
                        .filter(data => data.totalNumber > 0)
                        .map((data, index) => (
                            <DashboardCard key={index} title={data.name} value={data.totalNumber} />
                        ))
                }
            </section>
        </div>
    );
}

export default Dashboard;