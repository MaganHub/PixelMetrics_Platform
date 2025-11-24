import { Search, Filter, Download, Eye } from 'lucide-react';
import { useState } from 'react';

export default function History() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterBy, setFilterBy] = useState('all');

    const analyses = [
        {
            id: 1,
            name: 'Homepage Redesign v2',
            date: '2024-11-21',
            time: '2h ago',
            thumbnail: 'https://via.placeholder.com/300x200',
            scores: {
                usability: 9.2,
                design: 8.8,
                accessibility: 9.5,
                overall: 9.2,
            },
            feedback: 'Excellent design with strong visual hierarchy...',
        },
        {
            id: 2,
            name: 'Checkout Flow Mobile',
            date: '2024-11-20',
            time: '1 day ago',
            thumbnail: 'https://via.placeholder.com/300x200',
            scores: {
                usability: 8.5,
                design: 8.0,
                accessibility: 8.8,
                overall: 8.4,
            },
            feedback: 'Good mobile optimization but could improve...',
        },
        {
            id: 3,
            name: 'Product Page Desktop',
            date: '2024-11-18',
            time: '3 days ago',
            thumbnail: 'https://via.placeholder.com/300x200',
            scores: {
                usability: 7.8,
                design: 8.2,
                accessibility: 7.5,
                overall: 7.8,
            },
            feedback: 'Needs improvement in accessibility features...',
        },
        {
            id: 4,
            name: 'Dashboard Navigation',
            date: '2024-11-17',
            time: '4 days ago',
            thumbnail: 'https://via.placeholder.com/300x200',
            scores: {
                usability: 8.9,
                design: 9.1,
                accessibility: 8.6,
                overall: 8.9,
            },
            feedback: 'Well-structured navigation with clear hierarchy...',
        },
    ];

    const getScoreColor = (score: number) => {
        if (score >= 9) return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
        if (score >= 7) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Analysis History
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                    View and manage all your past UI/UX analyses
                </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search analyses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                        className="pl-12 pr-8 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent appearance-none cursor-pointer"
                    >
                        <option value="all">All Analyses</option>
                        <option value="recent">Recent</option>
                        <option value="high-score">High Score</option>
                        <option value="low-score">Low Score</option>
                    </select>
                </div>
            </div>

            {/* Analyses Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {analyses.map((analysis) => (
                    <div
                        key={analysis.id}
                        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        {/* Thumbnail */}
                        <div className="relative h-48 bg-gray-100 dark:bg-gray-700">
                            <img
                                src={analysis.thumbnail}
                                alt={analysis.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-lg">
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-lg">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                        {analysis.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {analysis.date} • {analysis.time}
                                    </p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(analysis.scores.overall)}`}>
                                    {analysis.scores.overall}
                                </div>
                            </div>

                            {/* Scores */}
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Usability</p>
                                    <p className={`text-lg font-bold ${getScoreColor(analysis.scores.usability).split(' ')[0]}`}>
                                        {analysis.scores.usability}
                                    </p>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Design</p>
                                    <p className={`text-lg font-bold ${getScoreColor(analysis.scores.design).split(' ')[0]}`}>
                                        {analysis.scores.design}
                                    </p>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Access</p>
                                    <p className={`text-lg font-bold ${getScoreColor(analysis.scores.accessibility).split(' ')[0]}`}>
                                        {analysis.scores.accessibility}
                                    </p>
                                </div>
                            </div>

                            {/* Feedback Preview */}
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                                {analysis.feedback}
                            </p>

                            {/* Actions */}
                            <button className="w-full py-2 px-4 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                View Full Report
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 pt-4">
                <button className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Previous
                </button>
                <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium">
                    1
                </button>
                <button className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    2
                </button>
                <button className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    3
                </button>
                <button className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Next
                </button>
            </div>
        </div>
    );
}
