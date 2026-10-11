// components/shared/Footer.tsx
import Link from "next/link";
import { Droplet, Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/services", label: "Services" },
	{ href: "/faq", label: "FAQ" },
	{ href: "/contact", label: "Contact" },
];

const accountLinks = [
	{ href: "/login", label: "Log In" },
	{ href: "/register", label: "Register as Donor" },
	{ href: "/register", label: "Request Blood" },
];

export default function Footer() {
	return (
		<footer className="border-t border-gray-800 bg-gray-900 pb-12 pt-16 text-gray-400">
			<div className="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
				{/* Brand Info */}
				<div className="space-y-4">
					<h2 className="flex items-center gap-2 text-2xl font-bold text-white">
						<Droplet className="h-6 w-6 text-red-500" aria-hidden="true" />
						BloodConnect
					</h2>
					<p className="text-sm">
						A community platform that connects blood donors with patients in
						emergency need, quickly and securely.
					</p>
				</div>

				{/* Quick Links */}
				<nav aria-label="Quick links" className="space-y-3">
					<h3 className="text-lg font-semibold text-white">Quick Links</h3>
					<ul className="space-y-2 text-sm">
						{quickLinks.map((link) => (
							<li key={link.href}>
								<Link href={link.href} className="transition hover:text-white">
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				{/* Account */}
				<nav aria-label="Account links" className="space-y-3">
					<h3 className="text-lg font-semibold text-white">Get Started</h3>
					<ul className="space-y-2 text-sm">
						{accountLinks.map((link) => (
							<li key={link.label}>
								<Link href={link.href} className="transition hover:text-white">
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				{/* Contact Info */}
				<div className="space-y-3">
					<h3 className="text-lg font-semibold text-white">Contact Us</h3>
					<p className="flex items-center gap-2 text-sm">
						<MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
						Sylhet, Bangladesh
					</p>
					<p className="flex items-center gap-2 text-sm">
						<Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
						aklima00191@gmail.com
					</p>
					<p className="flex items-center gap-2 text-sm">
						<Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
						01777403439
					</p>
				</div>
			</div>

						{/* Copyright */}
			<div className="mx-auto max-w-7xl border-t border-gray-800 px-4 pt-6 text-center text-xs text-gray-500">
				&copy; 2026 BloodConnect. All rights reserved.
			</div>
		</footer>
	);

}