type NarratorSwitchProps = {
  nex: string;
  verdan: string;
};

export function NarratorSwitch({ nex, verdan }: NarratorSwitchProps) {
  return (
    <div className="my-8 grid gap-4 md:grid-cols-2">
      <article className="rounded-2xl border border-[#4E6E8E]/40 bg-[#4E6E8E]/[0.08] p-5">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#8FB3D1]">
          Nex
        </p>
        <p className="text-sm leading-7 text-[#E8E2D6]">{nex}</p>
      </article>

      <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#A6A090]">
          Verdan
        </p>
        <p className="text-sm leading-7 text-[#CFC7B8]">{verdan}</p>
      </article>
    </div>
  );
}