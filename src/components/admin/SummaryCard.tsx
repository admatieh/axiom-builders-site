interface SummaryCardProps {
  label: string;
  value: string | number;
  subtext?: string;
}

export default function SummaryCard({ label, value, subtext }: SummaryCardProps) {
  return (
    <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-sm">
      <p className="text-[11px] uppercase tracking-widest text-white/40 font-semibold mb-2">
        {label}
      </p>
      <div className="text-3xl font-light text-white mb-2">
        {value}
      </div>
      {subtext && (
        <p className="text-sm text-white/60">
          {subtext}
        </p>
      )}
    </div>
  );
}
