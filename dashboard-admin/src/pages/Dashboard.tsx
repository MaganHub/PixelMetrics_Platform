import { Users, Activity, FileCheck, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const { session } = useAuth();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalAnalyses: 0,
        activeToday: 0,
        avgScore: 0
    });
    const [recentActivity, setRecentActivity] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${session?.access_token}`
                };

                const [statsRes, activityRes] = await Promise.all([
                    fetch('http://localhost:3001/api/admin/stats', { headers }),
                    fetch('http://localhost:3001/api/admin/activity', { headers })
                ]);

                if (statsRes.ok) {
                    const statsData = await statsRes.json();
                    setStats(statsData);
                }

                if (activityRes.ok) {
                    const activityData = await activityRes.json();
                    setRecentActivity(activityData);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (session) {
            fetchData();
        }
    }, [session]);

    const statCards = [
        {
            label: 'Total Users',
            value: stats.totalUsers.toLocaleString(),
            change: '+12%', // Placeholder
            trend: 'up',
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-100 dark:bg-blue-900/30',
        },
        {
            label: 'Total Analyses',
            value: stats.totalAnalyses.toLocaleString(),
            change: '+25%', // Placeholder
            trend: 'up',
            icon: FileCheck,
            color: 'text-green-600',
            bg: 'bg-green-100 dark:bg-green-900/30',
        },
        {
            label: 'Active Today',
            value: stats.activeToday.toLocaleString(),
            change: '+5%', // Placeholder
            trend: 'up',
            icon: Activity,
            color: 'text-purple-600',
            bg: 'bg-purple-100 dark:bg-purple-900/30',
        },
        {
            label: 'Avg. Score',
            value: stats.avgScore,
            change: '+0.2', // Placeholder
            trend: 'up',
            icon: TrendingUp,
            color: 'text-orange-600',
            bg: 'bg-orange-100 dark:bg-orange-900/30',
        },
    ];

    if (loading) {
        return <div className="p-6 text-center">Loading dashboard data...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
                <p className="text-gray-600 dark:text-gray-400">Welcome back, Admin</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {stat.value}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
                        <div key={index} className="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-medium">
                                    {activity.user.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{activity.user}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.action}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(activity.time).toLocaleTimeString()}
                                </p>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${activity.status === 'completed'
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                    }`}>
                                    {activity.status}
                                </span>
                            </div>
                        </div>
                    )) : (
                        <div className="p-6 text-center text-gray-500">No recent activity</div>
                    )}
                </div>
            </div>
        </div>
    );
}
