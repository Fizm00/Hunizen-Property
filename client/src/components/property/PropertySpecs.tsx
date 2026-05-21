interface PropertySpecsProps {
  roomSpecs: string[];
}

export default function PropertySpecs({ roomSpecs }: PropertySpecsProps) {
  return (
    <div className="py-8 border-b border-slate-200/80">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Spesifikasi Kamar</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {roomSpecs.map((s, i) => (
          <li key={i} className="flex items-center gap-2.5 text-sm text-slate-500 font-semibold">
            <div className="w-2 h-2 rounded-full bg-slate-400" />
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
