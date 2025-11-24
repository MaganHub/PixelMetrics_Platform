"use client";

import { useState } from "react";

interface Feature {
    icon: string;
    title: string;
    description: string;
    color: string;
    gradient: string;
}

export default function Features() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const features: Feature[] = [
        {
            icon: "🤖",
            title: "AI-Powered Analysis",
            description:
                "Advanced machine learning algorithms analyze your designs with precision, providing insights that would take hours of manual review.",
            color: "from-blue-500 to-cyan-500",
            gradient: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950",
        },
        {
            icon: "🎨",
            title: "Design Quality Scoring",
            description:
                "Get comprehensive scores on visual hierarchy, color contrast, typography, and overall aesthetic appeal with actionable recommendations.",
            color: "from-purple-500 to-pink-500",
            gradient: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950",
        },
        {
            icon: "♿",
            title: "Accessibility Checker",
            description:
                "Ensure your designs are inclusive with WCAG compliance checks, contrast ratios, and screen reader compatibility analysis.",
            color: "from-green-500 to-emerald-500",
            gradient: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950",
        },
        {
            icon: "📊",
            title: "Visual Overlays",
            description:
                "See exactly what our AI detects with interactive visual overlays highlighting buttons, text blocks, images, and spacing issues.",
            color: "from-orange-500 to-red-500",
            gradient: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950",
        },
        {
            icon: "⚡",
            title: "Instant Feedback",
            description:
                "Upload your screenshot and receive comprehensive analysis in seconds. No waiting, no hassle—just actionable insights.",
            color: "from-yellow-500 to-orange-500",
            gradient: "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950",
        },
        {
            icon: "📈",
            title: "Track Improvements",
            description:
                "Monitor your design evolution over time with detailed history tracking and comparative analysis between versions.",
            color: "from-indigo-500 to-purple-500",
            gradient: "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950",
        },
    ];

    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 dark:bg-indigo-900 rounded-full opacity-20 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full opacity-20 blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4">
                        ✨ Powerful Features
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Everything You Need to
                        <br />
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Perfect Your Design
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Comprehensive analysis tools powered by cutting-edge AI to help you create
                        exceptional user experiences.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`
                group relative p-8 rounded-2xl transition-all duration-300 cursor-pointer
                ${feature.gradient}
                border border-gray-200 dark:border-gray-700
                hover:shadow-2xl hover:scale-105 hover:-translate-y-1
                ${hoveredIndex === index ? "shadow-2xl scale-105 -translate-y-1" : "shadow-lg"}
              `}
                        >
                            {/* Animated border gradient */}
                            <div
                                className={`
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  bg-gradient-to-r ${feature.color} p-[2px]
                `}
                            >
                                <div className={`w-full h-full rounded-2xl ${feature.gradient}`}></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Icon */}
                                <div
                                    className={`
                    inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6
                    bg-white dark:bg-gray-800 shadow-md
                    text-4xl
                    transform transition-transform duration-300
                    ${hoveredIndex === index ? "scale-110 rotate-6" : ""}
                  `}
                                >
                                    {feature.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Hover arrow indicator */}
                                <div
                                    className={`
                    mt-4 inline-flex items-center gap-2 text-sm font-semibold
                    bg-gradient-to-r ${feature.color} bg-clip-text text-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  `}
                                >
                                    Learn more
                                    <svg
                                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Ready to transform your design workflow?
                    </p>
                    <button className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Start Analyzing Now
                    </button>
                </div>
            </div>
        </section>
    );
}
