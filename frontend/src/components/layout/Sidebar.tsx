"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
    LayoutDashboard,
    FolderOpen,
    AlertCircle,
    BarChart3,
    Users,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const navItems = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Projects",
        href: "/projects",
        icon: FolderOpen,
    },
    {
        label: "Issues",
        href: "/issues",
        icon: AlertCircle,
    },
    {
        label: "Reports",
        href: "/reports",
        icon: BarChart3,
    },
    {
        label: "Team",
        href: "/team",
        icon: Users,
    },
];

const bottomItems = [
    {
        label: "Settings",
        href: "/settings",
        icon: Settings,
    },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(href + "/");

    return (
        <aside
            className={cn(
                "relative flex flex-col bg-white border-r border-gray-100 transition-all duration-300 ease-in-out",
                collapsed ? "w-16" : "w-56"
            )}
        >
            {/* Logo */}
            <div className="h-16 flex items-center px-4 border-b border-gray-100 shrink-0">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-sm">R</span>
                    </div>
                    {!collapsed && (
                        <span className="text-base font-bold text-gray-900 whitespace-nowrap">
                            Rfix
                        </span>
                    )}
                </div>
            </div>

            {/* Main nav */}
            <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
                {!collapsed && (
                    <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                        Menu
                    </p>
                )}
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            title={collapsed ? item.label : undefined}
                            className={cn(
                                "group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 relative",
                                active
                                    ? "bg-primary/10 text-primary"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            )}
                        >
                            <Icon
                                className={cn(
                                    "shrink-0 w-4.5 h-4.5",
                                    active ? "text-primary" : "text-gray-500 group-hover:text-gray-700"
                                )}
                                style={{ width: 18, height: 18 }}
                            />
                            {!collapsed && (
                                <span className="truncate">{item.label}</span>
                            )}
                            {active && !collapsed && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                            )}
                            {/* Tooltip when collapsed */}
                            {collapsed && (
                                <span className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg transition-opacity duration-150">
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom section */}
            <div className="px-2 pb-2 space-y-0.5 border-t border-gray-100 pt-2">
                {bottomItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            title={collapsed ? item.label : undefined}
                            className={cn(
                                "group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 relative",
                                active
                                    ? "bg-primary/10 text-primary"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            )}
                        >
                            <Icon
                                className="shrink-0 text-gray-500 group-hover:text-gray-700"
                                style={{ width: 18, height: 18 }}
                            />
                            {!collapsed && <span className="truncate">{item.label}</span>}
                            {collapsed && (
                                <span className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg transition-opacity duration-150">
                                    {item.label}
                                </span>
                            )}
                        </Link>
                    );
                })}

                {/* User row */}
                <div
                    className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg mt-1",
                        collapsed && "justify-center"
                    )}
                >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                        {user?.name?.charAt(0).toUpperCase() ?? "U"}
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-800 truncate">
                                {user?.name}
                            </p>
                            <p className="text-[10px] text-gray-400 truncate">
                                {user?.role}
                            </p>
                        </div>
                    )}
                    {!collapsed && (
                        <button
                            onClick={logout}
                            className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                            title="Logout"
                        >
                            <LogOut style={{ width: 14, height: 14 }} />
                        </button>
                    )}
                </div>
            </div>

            {/* Collapse toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-150 z-10"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                {collapsed ? (
                    <ChevronRight className="w-3 h-3 text-gray-500" />
                ) : (
                    <ChevronLeft className="w-3 h-3 text-gray-500" />
                )}
            </button>
        </aside>
    );
}
