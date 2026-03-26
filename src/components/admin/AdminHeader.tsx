export default function AdminHeader({ title }: { title: string }) {
  return (
    <header className="bg-[#0a0a0a] border-b border-white/10 px-8 py-6 mb-8">
      <h2 className="text-2xl font-light tracking-wide text-white">
        {title}
      </h2>
    </header>
  );
}
