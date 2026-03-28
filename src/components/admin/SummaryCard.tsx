interface SummaryCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: string;
  accent?: 'cyan' | 'green' | 'yellow' | 'white';
}

const accentMap = {
  cyan:   { dot: 'bg-cyan-400', value: 'text-cyan-300' },
  green:  { dot: 'bg-green-400', value: 'text-green-300' },
  yellow: { dot: 'bg-yellow-400', value: 'text-yellow-200' },
  white:  { dot: 'bg-white/40', value: 'text-white' },
};

export default function SummaryCard({ label, value, subtext, accent = 'white' }: SummaryCardProps) {
  const colors = accentMap[accent];
  return (
    <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-sm hover:border-white/20 transition-colors group">
      <div className="flex items-start justify-between mb-4">
        <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">{label}</p>
        <span className={`w-1.5 h-1.5 rounded-full mt-1 ${colors.dot} opacity-60 group-hover:opacity-100 transition-opacity`} />
      </div>
      <div className={`text-3xl font-light mb-2 ${colors.value}`}>{value}</div>
      {subtext && <p className="text-xs text-white/40">{subtext}</p>}
    </div>
  );
}
