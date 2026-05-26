import { bodyNoteClasses, cardTitleClasses, editorialEyebrowClasses } from "@/lib/sectionTitle";

type MenuContextCardProps = {
  eyebrow: string;
  title: string;
  body: string;
};

/** Card editorial sobre a foto de categoria — estrutura única em todo o menu. */
export function MenuContextCard({ eyebrow, title, body }: MenuContextCardProps) {
  return (
    <div className="max-w-xs rounded-[1.2rem] border border-cream/45 bg-cream/85 p-5 shadow-[0_18px_55px_rgba(82,58,39,0.14)]">
      <p className={`text-gold ${editorialEyebrowClasses}`}>{eyebrow}</p>
      <p className={`mt-2 text-charcoal ${cardTitleClasses}`}>{title}</p>
      <p className={`mt-3 text-walnut ${bodyNoteClasses}`}>{body}</p>
    </div>
  );
}
