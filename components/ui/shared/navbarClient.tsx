"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Droplets, Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { logoutAction } from "@/app/(public)/(authentication)/_actions/authAction";
import { ROLE_HOME, type Role } from "@/lib/auth";
import { cn } from "@/lib/utils";

interface NavbarClientProps {
    user: { name: string; role: Role } | null;
}

const PUBLIC_LINKS = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    // { name: "Services", href: "/services" },
    // { name: "FAQ", href: "/faq" },
    // { name: "Contact", href: "/contact" },
];

const ROLE_LABEL: Record<Role, string> = {
    ADMIN: "Admin",
    USER: "User",
    DONOR: "Donor",
};

export default function NavbarClient({ user }: NavbarClientProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = user
        ? [
            ...PUBLIC_LINKS,
            { name: `${ROLE_LABEL[user.role]} Dashboard`, href: ROLE_HOME[user.role] },
        ]
        : PUBLIC_LINKS;

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

    const closeMenu = () => setIsOpen(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
                    <Droplets className="h-7 w-7 text-red-600" aria-hidden="true" />
                    <span className="text-lg font-bold text-emerald-600 sm:text-xl">
                        BloodConnect
                    </span>
                </Link>

                {/* Desktop links */}
                <nav
                    aria-label="Main navigation"
                    className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={isActive(link.href) ? "page" : undefined}
                            className={`py-1 transition-colors ${isActive(link.href)
                                    ? "border-b-2 border-emerald-600 font-semibold text-emerald-600"
                                    : "hover:text-emerald-600"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop auth */}
                <div className="hidden items-center gap-3 md:flex">
                    {user ? (
                        <>
                            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                                {ROLE_LABEL[user.role]}
                            </span>
                            <form action={logoutAction}>
                                <Button
                                    type="submit"
                                    variant="outline"
                                    className="h-9 border-red-500 px-4 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
                                >
                                    Sign Out
                                </Button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className={cn(buttonVariants({ variant: "ghost" }), "h-9 px-4 text-sm")}
                            >
                                Log In
                            </Link>
                            <Link
                                href="/register"
                                className={cn(
                                    buttonVariants(),
                                    "h-9 bg-emerald-600 px-4 text-sm font-medium text-white hover:bg-emerald-700",
                                )}
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile toggle */}
                <button
                    type="button"
                    onClick={() => setIsOpen((v) => !v)}
                    className="p-2 text-gray-600 hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 md:hidden"
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div
                    id="mobile-menu"
                    className="space-y-3 border-b border-gray-200 bg-white px-4 pb-5 pt-3 shadow-lg md:hidden"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeMenu}
                            aria-current={isActive(link.href) ? "page" : undefined}
                            className={`block rounded-md px-3 py-2 text-base font-medium ${isActive(link.href)
                                    ? "bg-emerald-50 font-semibold text-emerald-600"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="flex flex-col gap-3 border-t border-gray-100 pt-3">
                        {user ? (
                            <>
                                <div className="px-3">
                                    <span className="inline-block rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                                        Role: {ROLE_LABEL[user.role]}
                                    </span>
                                </div>
                                <form action={logoutAction}>
                                    <Button
                                        type="submit"
                                        variant="outline"
                                        className="h-9 w-full border-red-500 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
                                    >
                                        Sign Out
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    onClick={closeMenu}
                                    className={cn(buttonVariants({ variant: "outline" }), "h-9 w-full text-sm")}
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={closeMenu}
                                    className={cn(
                                        buttonVariants(),
                                        "h-9 w-full bg-emerald-600 text-sm font-medium text-white hover:bg-emerald-700",
                                    )}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}