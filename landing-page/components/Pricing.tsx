"use client";

import { useState } from "react";

interface PricingTier {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    cta: string;
    popular?: boolean;
    color: string;
}

export default function Pricing() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

    const pricingTiers: PricingTier[] = [
        {
            name: "Free",
            price: billingCycle === "monthly" ? "$0" : "$0",
            period: "forever",
            description: "Perfect for trying out PixelMetrics",
            features: [
                "10 analyses per month",
                "All AI-powered features",
                "Design & accessibility scoring",
                "Visual overlays & insights",
                "Downloadable reports",
                "7-day history retention",
                "Community support",
            ],
            cta: "Get Started Free",
            color: "from-gray-600 to-gray-800",
        },
        {
            name: "Pro",
            price: billingCycle === "monthly" ? "$29" : "$290",
            period: billingCycle === "monthly" ? "/month" : "/year",
            description: "For professional designers and teams",
            features: [
                "Unlimited analyses",
                "All AI-powered features",
                "Priority processing",
                "Advanced analytics dashboard",
                "Unlimited history retention",
                "API access",
                "Priority email support",
            ],
            cta: "Start Pro Trial",
            popular: true,
            color: "from-indigo-600 to-purple-600",
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "",
            description: "For large organizations",
            features: [
                "Everything in Pro",
                "Custom usage limits",
                "Custom AI model training",
                "Dedicated account manager",
                "SLA guarantees (99.9%)",
                "Team management & SSO",
                "Custom integrations",
                "On-premise deployment option",
            ],
            cta: "Contact Sales",
            color: "from-purple-600 to-pink-600",
        },
    ];

    return (
        <section id="pricing" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-200 dark:bg-indigo-900 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4">
                        💎 Simple Pricing
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Choose Your Perfect Plan
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                        Start free and scale as you grow. No hidden fees, cancel anytime.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center gap-4 p-1 rounded-full bg-gray-200 dark:bg-gray-700">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${billingCycle === "monthly"
                                ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md"
                                : "text-gray-600 dark:text-gray-400"
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle("yearly")}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${billingCycle === "yearly"
                                ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-md"
                                : "text-gray-600 dark:text-gray-400"
                                }`}
                        >
                            Yearly
                            <span className="ml-2 px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold">
                                Save 17%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {pricingTiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`
                relative p-8 rounded-2xl transition-all duration-300
                ${tier.popular
                                    ? "bg-gradient-to-b from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-2 border-indigo-500 shadow-2xl scale-105"
                                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl"
                                }
              `}
                        >
                            {/* Popular Badge */}
                            {tier.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-lg">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            {/* Tier Name */}
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                {tier.name}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                {tier.description}
                            </p>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-5xl font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                                        {tier.price}
                                    </span>
                                    {tier.period && (
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {tier.period}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* CTA Button */}
                            <button
                                className={`
                  w-full py-3 px-6 rounded-full font-semibold transition-all duration-200 mb-8
                  ${tier.popular
                                        ? `bg-gradient-to-r ${tier.color} text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`
                                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                                    }
                `}
                            >
                                {tier.cta}
                            </button>

                            {/* Features List */}
                            <div className="space-y-4">
                                {tier.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="flex items-start gap-3">
                                        <svg
                                            className={`w-5 h-5 mt-0.5 flex-shrink-0 ${tier.popular
                                                ? "text-indigo-600 dark:text-indigo-400"
                                                : "text-gray-600 dark:text-gray-400"
                                                }`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className="text-gray-600 dark:text-gray-300">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Note */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        All plans include secure SSL encryption and GDPR compliance
                    </p>
                    <div className="flex justify-center gap-8 text-sm text-gray-500 dark:text-gray-500">
                        <span>✓ No credit card required</span>
                        <span>✓ Cancel anytime</span>
                        <span>✓ 14-day money-back guarantee</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
