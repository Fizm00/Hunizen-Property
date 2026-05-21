import type { RoomType } from "../../types";

interface PropertyRoomTypesProps {
  roomTypes: RoomType[];
  onSelectRoomTypeAndBook: (rt: RoomType) => void;
}

export default function PropertyRoomTypes({
  roomTypes,
  onSelectRoomTypeAndBook,
}: PropertyRoomTypesProps) {
  return (
    <div className="py-8 border-b border-slate-200/80">
      <h2 className="text-lg font-bold text-slate-800 mb-5">Tipe Kamar Lainnya</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {roomTypes.map((rt, i) => (
          <div
            key={i}
            className="flex flex-col border border-slate-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow bg-white"
          >
            <div className="h-32 w-full overflow-hidden bg-slate-100">
              <img src={rt.img} alt={rt.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex flex-col grow justify-between gap-3">
              <div>
                <h4 className="font-bold text-slate-800 text-base leading-tight">{rt.name}</h4>
                <span className="text-xs text-slate-400 block font-bold mt-1 uppercase">Mulai Dari</span>
                <span className="text-sm font-black text-slate-800 block mt-0.5">{rt.price} / bln</span>

                <div className="flex flex-wrap gap-1 mt-2.5">
                  {rt.facilities.slice(0, 3).map((fac, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded"
                    >
                      {fac}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectRoomTypeAndBook(rt)}
                className="w-full py-1.5 bg-[#09090B] hover:bg-zinc-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                Ajukan Sewa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
