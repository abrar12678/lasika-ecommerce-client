export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)] pt-28 sm:pt-32 pb-20 px-5 sm:px-10 lg:px-14">
      <div className="max-w-[1440px] mx-auto">
        <div className="h-3 w-24 bg-[#e6ddc9]/40 rounded-full animate-pulse mb-3" />
        <div className="h-8 w-48 bg-[#e6ddc9]/30 rounded-full animate-pulse mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="aspect-[4/3] rounded-2xl bg-[#e6ddc9]/20 animate-pulse" />
          <div className="space-y-4 pt-4">
            <div className="h-3 w-24 bg-[#e6ddc9]/30 rounded-full animate-pulse" />
            <div className="h-6 w-64 bg-[#e6ddc9]/25 rounded-full animate-pulse" />
            <div className="h-3 w-full bg-[#e6ddc9]/15 rounded-full animate-pulse" />
            <div className="h-3 w-full bg-[#e6ddc9]/15 rounded-full animate-pulse" />
            <div className="h-3 w-3/4 bg-[#e6ddc9]/15 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}