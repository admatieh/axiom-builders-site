export default function Hero() {
  return (
    <section className="relative w-full h-[150vh] flex flex-col justify-start pt-[30vh] px-8 sm:px-16 pointer-events-auto">
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-7xl md:text-9xl font-light tracking-tighter text-white drop-shadow-2xl">
          Build
          <br />
          <span className="font-bold tracking-tight">Beyond.</span>
        </h1>
        <p className="mt-8 text-xl md:text-2xl text-gray-200 font-light tracking-widest uppercase max-w-lg drop-shadow-lg">
          Precision engineering meets cinematic architectural execution.
        </p>
      </div>

      <div className="absolute bottom-[20vh] left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60">
        <span className="text-xs uppercase tracking-[0.3em] text-white/80 mb-4 font-light">Scroll to Explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
