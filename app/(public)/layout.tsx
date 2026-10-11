// import SiteHeader from "@/components/ui/shared/siteHeader";

// export default function PublicLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <>
//       <SiteHeader />
//       {children}
//     </>
//   );
// }


import SiteHeader from "@/components/ui/shared/siteHeader";
import Footer from "@/components/ui/shared/footer";

export default function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<SiteHeader />
			<main className="flex-1">{children}</main>
			<Footer />
		</>
	);
}