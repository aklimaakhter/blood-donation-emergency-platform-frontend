import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/contact/contactForm";
import { Card } from "@/components/ui/card";
import PageHeader from "@/components/ui/shared/pageHeader";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | BloodConnect",
  description: "Get in touch with the BloodConnect team for questions, feedback or support.",
  openGraph: {
    title: "Contact | BloodConnect",
    description: "Questions or feedback? Reach the BloodConnect team.",
    type: "website",
  },
};

export default function ContactPage() {
  const details = [
    { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Phone, label: "Phone", value: SITE.phone, href: `tel:${SITE.phone}` },
    { icon: MapPin, label: "Location", value: SITE.location },
  ];

  return (
    <>
      <PageHeader
        title="Contact us"
        description="Questions about the platform, feedback, or something not working? Send us a message and we will get back to you."
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        <div className="space-y-4">
          {details.map((d) => (
            <Card key={d.label} className="flex items-center gap-4 p-5 shadow-none">
              <div className="rounded-full bg-emerald-50 p-3 text-emerald-600">
                <d.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-sm text-gray-500">{d.label}</p>
                {d.href ? (
                  <a href={d.href} className="break-all font-medium hover:text-emerald-600">
                    {d.value}
                  </a>
                ) : (
                  <p className="font-medium">{d.value}</p>
                )}
              </div>
            </Card>
          ))}
          <p className="text-sm text-gray-500">
            For a life-threatening emergency, call your nearest hospital or emergency number first.
          </p>
        </div>

        <Card className="p-6 shadow-none">
          <h2 className="mb-4 text-lg font-semibold">Send a message</h2>
          <ContactForm />
        </Card>
      </section>
    </>
  );
}