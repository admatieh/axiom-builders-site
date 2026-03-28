export default function AdminHeader({
  title,
  breadcrumb,
  action,
}: {
  title: string;
  breadcrumb?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="bg-[#0a0a0a] border-b border-white/10 px-8 py-5 mb-8 flex items-center justify-between">
      <div>
        {breadcrumb && (
          <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-1">
            {breadcrumb}
          </p>
        )}
        <h2 className="text-xl font-light tracking-wide text-white">{title}</h2>
      </div>
      {action && <div>{action}</div>}
    </header>
  );
}
