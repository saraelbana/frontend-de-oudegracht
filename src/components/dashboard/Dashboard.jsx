import "./Dashboard.css";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../helpers/APIOperations.js";

function Dashboard() {
    const [dashboardData, setDashboardData] = useState({
        totalEmployees: 0,
        totalRecipes: 0,
        totalReservations: 0
    });
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
                console.log("Error fetching dashboard data", data);
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
            {/* Header Section */}
            <section className="dashboard-header">
                <h1>Dashboard</h1>
                <p className="current-date">{todayDate}</p>
            </section>

            {/* Stats Grid */}
            <section className="dashboard-stats">
                {/* Employees Card */}
                <div className="stat-card">
                    <div className="stat-header">
                        <h2>Total Employees</h2>
                    </div>
                    <div className="stat-content">
                        <span className="stat-number">{dashboardData.totalEmployees}</span>
                        <p className="stat-description">Active staff members</p>
                    </div>
                </div>

                {/* Recipes Card */}
                <div className="stat-card">
                    <div className="stat-header">
                        <h2>Total Recipes</h2>
                    </div>
                    <div className="stat-content">
                        <span className="stat-number">{dashboardData.totalRecipes}</span>
                        <p className="stat-description">Available recipes</p>
                    </div>
                </div>

                {/* Reservations Card */}
                {/*<div className="stat-card">*/}
                {/*    <div className="stat-header">*/}
                {/*        <h2>Total Reservations</h2>*/}
                {/*    </div>*/}
                {/*    <div className="stat-content">*/}
                {/*        <span className="stat-number">{dashboardData.totalReservations}</span>*/}
                {/*        <p className="stat-description">Today's reservations</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </section>
        </div>
    );
}

export default Dashboard;