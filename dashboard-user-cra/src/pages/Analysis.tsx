import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, AlertCircle, CheckCircle, Zap } from 'lucide-react';
import BoundingBoxOverlay from '../components/BoundingBoxOverlay';

interface AnalysisData {
    scores: {
        usability: number;
        design: number;
        accessibility: number;
        overall: number;
    };
    feedback: string;
    boundingBoxes: any[];
}

export default function Analysis() {
    const location = useLocation();
    const navigate = useNavigate();
    const { result, imageUrl } = location.state as { result: AnalysisData; imageUrl: string } || {};

    if (!result || !imageUrl) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Analysis Data Found</h2>
                <button
                    onClick={() => navigate('/upload')}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                    Go to Upload
                </button>
            </div>
        );
    }

    const getScoreColor = (score: number) => {
        if (score >= 8) return 'text-green-500';
        if (score >= 5) return 'text-yellow-500';
        return 'text-red-500';
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(result, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `analysis-report-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => navigate('/upload')}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Upload
                </button>
                <div className="flex gap-3">
                    <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Image & Overlay */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Visual Analysis</h3>
                        <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900">
                            <BoundingBoxOverlay imageUrl={imageUrl} boxes={result.boundingBoxes} />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                            AI Feedback
                        </h3>
                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                                {result.feedback}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Scores */}
                <div className="space-y-6">
                    {/* Overall Score */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
                        <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-2">Overall Score</h3>
                        <div className={`text-6xl font-bold mb-2 ${getScoreColor(result.scores.overall)}`}>
                            {result.scores.overall}
                            <span className="text-2xl text-gray-400">/10</span>
                        </div>
                        <p className="text-sm text-gray-500">Based on usability, design, and accessibility</p>
                    </div>

                    {/* Detailed Scores */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Detailed Breakdown</h3>

                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-600 dark:text-gray-300 flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Usability
                                </span>
                                <span className="font-bold text-gray-900 dark:text-white">{result.scores.usability}/10</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${result.scores.usability * 10}%` }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-600 dark:text-gray-300 flex items-center">
                                    <Zap className="w-4 h-4 mr-2 text-purple-500" /> Design Quality
                                </span>
                                <span className="font-bold text-gray-900 dark:text-white">{result.scores.design}/10</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${result.scores.design * 10}%` }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-gray-600 dark:text-gray-300 flex items-center">
                                    <AlertCircle className="w-4 h-4 mr-2 text-blue-500" /> Accessibility
                                </span>
                                <span className="font-bold text-gray-900 dark:text-white">{result.scores.accessibility}/10</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${result.scores.accessibility * 10}%` }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Action Cards */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl shadow-lg p-6 text-white">
                        <h3 className="font-bold text-lg mb-2">Want deeper insights?</h3>
                        <p className="text-indigo-100 text-sm mb-4">Upgrade to Pro to get detailed code suggestions and Figma export.</p>
                        <button className="w-full py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                            Upgrade Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
