import { BarChart3, TrendingUp, Upload, Clock } from 'lucide-react';

export default function Dashboard() {
    const stats = [
        {
            name: 'Total Analyses',
            value: '24',
            change: '+12%',
            trend: 'up',
            icon: BarChart3,
            color: 'from-blue-500 to-cyan-500',
        },
        {
            name: 'Average Score',
            value: '8.4',
            change: '+0.8',
            trend: 'up',
            icon: TrendingUp,
            color: 'from-purple-500 to-pink-500',
        },
        {
            name: 'This Month',
            value: '7',
            change: '3 remaining',
            trend: 'neutral',
            icon: Upload,
            color: 'from-green-500 to-emerald-500',
        },
        {
            name: 'Last Analysis',
            value: '2h ago',
            change: 'Score: 9.2',
            trend: 'neutral',
            icon: Clock,
            color: 'from-orange-500 to-red-500',
        },
    ];

    const recentAnalyses = [
        {
            id: 1,
            name: 'Homepage Redesign',
            date: '2 hours ago',
            scores: { usability: 9.2, design: 8.8, accessibility: 9.5 },
            overall: 9.2,
        },
        {
            id: 2,
            name: 'Checkout Flow',
            date: '1 day ago',
            scores: { usability: 8.5, design: 8.0, accessibility: 8.8 },
            overall: 8.4,
        },
        {
            id: 3,
            name: 'Product Page',
            date: '3 days ago',
            scores: { usability: 7.8, design: 8.2, accessibility: 7.5 },
            overall: 7.8,
        },
    ];

    const getScoreColor = (score: number) => {
        if (score >= 9) return 'text-green-600 dark:text-green-400';
        if (score >= 7) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h2>
                <p className="text-indigo-100 text-lg">
                    You have 3 analyses remaining this month on your Free plan.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.name}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.name}</p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                            <p className={`text-sm ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                {stat.change}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Recent Analyses */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Analyses</h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {recentAnalyses.map((analysis) => (
                        <div key={analysis.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{analysis.name}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{analysis.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Overall Score</p>
                                    <p className={`text-2xl font-bold ${getScoreColor(analysis.overall)}`}>
                                        {analysis.overall}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Usability</p>
                                    <p className={`text-lg font-semibold ${getScoreColor(analysis.scores.usability)}`}>
                                        {analysis.scores.usability}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Design</p>
                                    <p className={`text-lg font-semibold ${getScoreColor(analysis.scores.design)}`}>
                                        {analysis.scores.design}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Accessibility</p>
                                    <p className={`text-lg font-semibold ${getScoreColor(analysis.scores.accessibility)}`}>
                                        {analysis.scores.accessibility}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Start New Analysis</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Upload a screenshot to get instant AI-powered feedback on your design.
                    </p>
                    <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-lg transition-shadow">
                        Upload Screenshot
                    </button>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-xl p-6 border border-green-200 dark:border-green-800">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Upgrade to Pro</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Get unlimited analyses and priority processing for $29/month.
                    </p>
                    <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:shadow-lg transition-shadow">
                        View Plans
                    </button>
                </div>
            </div>
        </div>
    );
}
