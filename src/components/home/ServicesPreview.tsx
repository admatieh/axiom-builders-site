export default function ServicesPreview() {
  const services = [
    { title: "Commercial Development", desc: "Large-scale urban infrastructure with uncompromising precision.", index: "01" },
    { title: "Architectural Engineering", desc: "Bridging visionary aesthetics with unshakeable structural integrity.", index: "02" },
    { title: "Sustainable Structuring", desc: "Future-proof construction minimizing footprint, maximizing lifespan.", index: "03" },
  ];

  return (
    <section className="relative w-full min-h-[140vh] flex items-center px-8 sm:px-16 pointer-events-auto">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-16">
          <span className="text-[#00e5ff] text-xs font-bold tracking-[0.3em] uppercase">Capabilities</span>
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-white mt-4 drop-shadow-xl">
            Engineered To
            <br />
            Dominate The Skyline.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
          {services.map((svc) => (
            <div 
              key={svc.index} 
              className="group flex flex-col justify-between h-80 p-8 border border-white/10 bg-black/40 backdrop-blur-md hover:bg-black/60 hover:-translate-y-2 transition-all duration-500 cursor-default"
            >
              <span className="text-white/30 text-4xl font-light tracking-tighter group-hover:text-[#00e5ff] transition-colors">{svc.index}</span>
              <div>
                <h3 className="text-xl text-white font-medium tracking-wide mb-3">{svc.title}</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed">{svc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
