export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)] pt-28 sm:pt-32 pb-20 px-5 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto">
        <div className="h-3 w-40 bg-[#e6ddc9]/40 rounded-full animate-pulse mb-3" />
        <div className="h-8 w-52 bg-[#e6ddc9]/30 rounded-full animate-pulse mb-2" />
        <div className="h-3 w-72 bg-[#e6ddc9]/20 rounded-full animate-pulse mb-8" />
        <div className="flex gap-2 mb-8">
          {[1,2,3,4,5].map(i=><div key={i} className="h-8 w-20 bg-[#e6ddc9]/25 rounded-full animate-pulse" />)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1,2,3,4,5,6].map(i=>(
            <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(197,165,110,0.08)" }}>
              <div className="aspect-square bg-[#e6ddc9]/30 animate-pulse" />
              <div className="p-4">
                <div className="h-2.5 w-20 bg-[#e6ddc9]/40 rounded-full animate-pulse mb-2" />
                <div className="h-3 w-36 bg-[#e6ddc9]/30 rounded-full animate-pulse mb-2" />
                <div className="h-3 w-24 bg-[#e6ddc9]/20 rounded-full animate-pulse mb-3" />
                <div className="h-px bg-[#e6ddc9]/20 mb-3" />
                <div className="h-4 w-16 bg-[#c5a56e]/20 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
