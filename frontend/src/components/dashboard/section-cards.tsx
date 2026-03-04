"use client";

import {
    TrendingDown,
    TrendingUp,
    AlertCircle,
    Clock,
    CheckCircle,
    FolderOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const cards = [
    {
        title: "Total Projects",
        value: "12",
        description: "Active projects this quarter",
        trend: "+2 from last month",
        trendUp: true,
        footer: "2 projects added this month",
        icon: FolderOpen,
        color: "text-blue-600",
        bg: "bg-blue-50",
    },
    {
        title: "Open Issues",
        value: "48",
        description: "Unresolved issues across all projects",
        trend: "+8 this week",
        trendUp: false,
        footer: "Requires immediate attention",
        icon: AlertCircle,
        color: "text-red-600",
        bg: "bg-red-50",
    },
    {
        title: "In Progress",
        value: "23",
        description: "Issues currently being worked on",
        trend: "+5 from yesterday",
        trendUp: true,
        footer: "Team is actively resolving",
        icon: Clock,
        color: "text-amber-600",
        bg: "bg-amber-50",
    },
    {
        title: "Resolved",
        value: "134",
        description: "Issues resolved this month",
        trend: "+12.5% vs last month",
        trendUp: true,
        footer: "Great team performance",
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-green-50",
    },
];

export function SectionCards() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 px-4 lg:px-6">
            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <Card key={card.title} className="flex flex-col">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardDescription>{card.title}</CardDescription>
                                <div
                                    className={`rounded-md p-2 ${card.bg}`}
                                >
                                    <Icon
                                        className={`h-4 w-4 ${card.color}`}
                                    />
                                </div>
                            </div>
                            <CardTitle className="text-3xl font-bold tabular-nums">
                                {card.value}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <Badge
                                variant="outline"
                                className={`gap-1 ${
                                    card.trendUp
                                        ? "text-green-700 border-green-200 bg-green-50"
                                        : "text-red-700 border-red-200 bg-red-50"
                                }`}
                            >
                                {card.trendUp ? (
                                    <TrendingUp className="h-3 w-3" />
                                ) : (
                                    <TrendingDown className="h-3 w-3" />
                                )}
                                {card.trend}
                            </Badge>
                        </CardContent>
                        <CardFooter className="text-xs text-muted-foreground mt-auto pt-0">
                            {card.footer}
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}
