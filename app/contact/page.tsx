import ContactForm from "@/components/ContactForm";
import ContactQuickActions from "@/components/ContactQuickActions";
import { RadialGlowBackground } from "@/components/SVGBackgrounds";

export const metadata = {
  title: "Contact & Apply",
  description: "Get in touch with Apex Tech Innovation or apply for our Data Science program.",
};

export default function Contact() {
  return (
    <div className="bg-[#F8FAFC]">
      <section className="section-padding bg-[#F8FAFC] relative overflow-hidden">
        <RadialGlowBackground />
        <div className="container-custom relative z-10">
          <div className="text-center mb-8">
            <ContactQuickActions />
          </div>
        </div>
      </section>
      <ContactForm />
    </div>
  );
}

