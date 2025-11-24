import { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useAuth } from '../context/AuthContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function Analytics() {
    const { session } = useAuth();
    const [chartData, setChartData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/analytics`, {
                    headers: {
                        'Authorization': `Bearer ${session?.access_token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();

                    setChartData({
                        labels: data.map((d: any) => new Date(d.date).toLocaleDateString()),
                        datasets: [
                            {
                                label: 'Analyses Per Day',
                                data: data.map((d: any) => d.count),
                                borderColor: 'rgb(99, 102, 241)',
                                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                tension: 0.4,
                                fill: true,
                            },
                        ],
                    });
                }
            } catch (error) {
                console.error('Error fetching analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        if (session) {
            fetchAnalytics();
        }
    }, [session]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Analysis Usage Trends (Last 30 Days)',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    if (loading) {
        return <div className="p-6 text-center">Loading analytics...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Analytics</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Detailed insights into platform usage and performance
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                {chartData ? (
                    <Line options={options} data={chartData} />
                ) : (
                    <div className="text-center text-gray-500">No data available</div>
                )}
            </div>
        </div>
    );
}
