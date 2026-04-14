export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <p className="animate-pulse text-[var(--accent)] text-eyebrow tracking-[0.35em]">
          M.dev
        </p>
        <div className="relative h-px w-24 overflow-hidden bg-[var(--border-color)]">
          <div
            className="absolute inset-y-0 left-0 bg-[var(--accent)]"
            style={{
              animation: "clip-reveal 1.2s cubic-bezier(0.16,1,0.3,1) infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}
