import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSiteSetting } from "@/hooks/useStrapi";
import { usePageMeta } from "@/hooks/usePageMeta";
import { WHATSAPP_ITALY } from "@/lib/contact";
import { Reveal } from "@/components/Reveal";

function ChecklistList({ items }: { items: { item: string; note: string }[] }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  return (
    <div className="divide-y divide-askari-navy/[0.1]">
      {items.map((entry) => (
        <label key={entry.item} className="flex cursor-pointer items-start gap-4 py-4">
          <input
            type="checkbox"
            checked={!!checked[entry.item]}
            onChange={(e) => setChecked((c) => ({ ...c, [entry.item]: e.target.checked }))}
            className="mt-1 h-4 w-4 flex-none accent-[#F5C518]"
          />
          <div className={checked[entry.item] ? "opacity-50 line-through" : ""}>
            <div className="text-[15.5px] font-semibold">{entry.item}</div>
            {entry.note && (
              <p className="mt-1 text-[13.5px] leading-relaxed text-askari-textBody2">{entry.note}</p>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}

export default function Checklist() {
  usePageMeta(
    "Document Checklist",
    "The complete document checklist for Bachelor's and Master's applications to Italian universities from Pakistan.",
    { path: "/checklist" }
  );
  const { data: siteSetting } = useSiteSetting();
  const checklist = siteSetting?.documentChecklist;

  return (
    <div>
      <section className="bg-askari-navy px-4 pb-12 pt-10 text-askari-cream sm:px-6 md:px-10 md:pb-20 md:pt-16">
        <Reveal className="mx-auto max-w-[1280px]">
          <div className="text-[11px] uppercase tracking-[0.2em] text-askari-gold">Checklist</div>
          <h1 className="text-display-1 mt-4 max-w-[900px]">
            Everything your file needs, before you start.
          </h1>
          <p className="mt-5 max-w-[620px] text-base leading-relaxed text-askari-cream/70">
            Tick items off as you gather them. Nothing here is submitted anywhere — it's just for
            your own tracking.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[720px] px-4 py-10 sm:px-6 md:px-10 md:py-16">
        {checklist && (
          <Tabs defaultValue="bachelors">
            <TabsList className="mb-2 h-auto gap-1 bg-askari-sand p-1">
              <TabsTrigger value="bachelors">Bachelor's</TabsTrigger>
              <TabsTrigger value="masters">Master's</TabsTrigger>
            </TabsList>
            <TabsContent value="bachelors" className="mt-6">
              <ChecklistList items={checklist.bachelors} />
            </TabsContent>
            <TabsContent value="masters" className="mt-6">
              <ChecklistList items={checklist.masters} />
            </TabsContent>
          </Tabs>
        )}

        <Reveal className="mt-10 rounded-2xl bg-askari-navy p-7 text-askari-cream">
          <div className="text-display-3">Missing something on this list?</div>
          <p className="mb-5 mt-2.5 text-sm leading-relaxed text-askari-cream/66">
            Send us what you already have and we'll tell you exactly what's left, for your specific
            programme.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_ITALY}`}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Ask on WhatsApp
          </a>
        </Reveal>
      </section>
    </div>
  );
}
