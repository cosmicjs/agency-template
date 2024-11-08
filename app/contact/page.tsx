// app/contact/page.tsx
import { ContactForm } from "@/cosmic/blocks/contact-form/ContactForm";
export default async function ContactPage() {
  return (
    <main className="py-4">
      <section className="pb-8 m-auto px-4">
        <div className="m-auto max-w-[950px] flex flex-col items-start gap-2">
          <h1 className="mb-4 m-auto md:mx-0 text-3xl md:text-6xl font-display text-zinc-900 dark:text-zinc-100 leading-tight tracking-tighter">
            Contact
          </h1>
        </div>
        <ContactForm className="w-full max-w-[500px] m-auto my-10" />
      </section>
    </main>
  );
}
