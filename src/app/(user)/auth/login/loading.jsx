export default function LoginLoading() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)] flex items-center justify-center px-5 py-32">
      <div className="w-full max-w-[440px] text-center">
        <div className="h-6 w-32 bg-[#e6ddc9]/30 rounded-full animate-pulse mx-auto mb-6" />
        <div className="h-8 w-48 bg-[#e6ddc9]/25 rounded-full animate-pulse mx-auto mb-2" />
        <div className="h-3 w-36 bg-[#e6ddc9]/15 rounded-full animate-pulse mx-auto mb-8" />
        <div className="rounded-3xl p-8 space-y-4" style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(197,165,110,0.2)" }}>
          <div className="h-12 bg-[#e6ddc9]/20 rounded-xl animate-pulse" />
          <div className="h-12 bg-[#e6ddc9]/20 rounded-xl animate-pulse" />
          <div className="h-3 w-24 bg-[#e6ddc9]/15 rounded-full animate-pulse" />
          <div className="h-12 bg-[#e6ddc9]/25 rounded-xl animate-pulse" />
          <div className="grid grid-cols-2 gap-3 pt-4">
            <div className="h-10 bg-[#e6ddc9]/15 rounded-xl animate-pulse" />
            <div className="h-10 bg-[#e6ddc9]/15 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
