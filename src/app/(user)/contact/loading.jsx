export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)] pt-28 sm:pt-32 pb-20 px-5 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto">
        <div className="h-3 w-24 bg-[#e6ddc9]/40 rounded-full animate-pulse mb-3" />
        <div className="h-8 w-40 bg-[#e6ddc9]/30 rounded-full animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[1,2,3,4].map(i=>(
            <div key={i} className="h-28 rounded-2xl bg-[#e6ddc9]/15 animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 h-96 rounded-2xl bg-[#e6ddc9]/15 animate-pulse" />
          <div className="lg:col-span-2 h-72 rounded-2xl bg-[#e6ddc9]/15 animate-pulse" />
        </div>
      </div>
    </div>
  );
}