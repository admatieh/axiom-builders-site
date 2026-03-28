interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusConfig: Record<string, { label: string; classes: string }> = {
  published: { label: 'Published', classes: 'bg-green-500/10 border-green-500/20 text-green-400' },
  draft:     { label: 'Draft',     classes: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' },
  active:    { label: 'Active',    classes: 'bg-green-500/10 border-green-500/20 text-green-400' },
  inactive:  { label: 'Inactive',  classes: 'bg-white/5 border-white/10 text-white/40' },
  new:       { label: 'New',       classes: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
  read:      { label: 'Read',      classes: 'bg-white/5 border-white/10 text-white/40' },
};

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const cfg = statusConfig[status?.toLowerCase()] ?? {
    label: status,
    classes: 'bg-white/5 border-white/10 text-white/40',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-sm border ${cfg.classes} ${className}`}
    >
      {cfg.label}
    </span>
  );
}
