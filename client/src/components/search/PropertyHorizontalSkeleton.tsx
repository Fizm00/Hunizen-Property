export function PropertyHorizontalSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-3 w-full bg-zinc-900/20 border border-zinc-800/40 rounded-3xl animate-pulse">
      <div className="relative w-full sm:w-44 h-40 shrink-0 rounded-[1.25rem] bg-zinc-800/60 overflow-hidden">
        <div className="absolute top-3 left-3 w-16 h-5 bg-zinc-700/60 rounded-full" />
      </div>

      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex justify-between items-center gap-2 w-full">
            <div className="h-5 w-12 bg-zinc-800/60 rounded-md" />
            <div className="h-5 w-20 bg-zinc-800/60 rounded-md" />
          </div>

          <div className="h-5 bg-zinc-800/60 rounded-lg w-3/4 mt-3" />

          <div className="h-3.5 bg-zinc-800/60 rounded-md w-1/2 mt-2" />

          <div className="flex items-center gap-3 mt-4">
            <div className="h-4 w-12 bg-zinc-800/60 rounded-md" />
            <div className="h-4 w-12 bg-zinc-800/60 rounded-md" />
            <div className="h-4 w-12 bg-zinc-800/60 rounded-md" />
          </div>
        </div>

        <div className="flex justify-between items-end mt-4 pt-3 border-t border-zinc-800/40 w-full">
          <div className="flex flex-col gap-1.5">
            <div className="h-3 w-10 bg-zinc-800/60 rounded" />
            <div className="h-5 w-24 bg-zinc-800/60 rounded-md" />
          </div>
          
          <div className="h-4 w-16 bg-zinc-800/60 rounded-md" />
        </div>
      </div>
    </div>
  );
}
