import { LotusDivider } from "@/components/ornaments/Ornaments";
import { Item } from "@/components/ui/Reveal";

/** Script label → lotus divider → serif caps title, as in every reference section. */
export function SectionHeading({ label, title, id }: { label: string; title: string; id?: string }) {
  return (
    <>
      <Item>
        <p className="script-label mb-1.5">{label}</p>
      </Item>
      <Item>
        <LotusDivider />
      </Item>
      <Item>
        <h2 id={id} className="display-title mt-3">
          {title}
        </h2>
      </Item>
    </>
  );
}
