import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle } from "lucide-react";
import type { FaqCategory, FaqItem } from "../../constants/faq";

interface AccordionItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-t border-slate-100 py-6 last:border-b last:border-slate-100">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left gap-4 group focus:outline-none"
      >
        <span className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
          {item.question}
        </span>
        <div className="shrink-0 w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-all duration-300">
          {isOpen ? (
            <Minus className="w-3.5 h-3.5" />
          ) : (
            <Plus className="w-3.5 h-3.5" />
          )}
        </div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed pr-8">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface FaqCategoriesProps {
  categories: FaqCategory[];
  searchQuery: string;
}

export default function FaqCategories({ categories, searchQuery }: FaqCategoriesProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "general-0": true 
  });

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredCategories = categories.map(category => {
    const items = category.items.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...category, items };
  }).filter(category => category.items.length > 0);

  if (filteredCategories.length === 0) {
    return (
      <section className="w-full py-20 px-6 bg-white flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4">
          <MessageCircle className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">Pencarian Tidak Ditemukan</h3>
        <p className="text-sm text-slate-400 font-light max-w-sm">
          Kami tidak menemukan jawaban untuk "{searchQuery}". Coba ketik kata kunci yang berbeda atau hubungi support.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 flex flex-col items-center gap-20">
      {filteredCategories.map((category) => (
        <div 
          key={category.id} 
          className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start scroll-mt-24"
          id={category.id}
        >
          <div className="lg:col-span-4 flex flex-col items-start gap-3 lg:sticky lg:top-24">
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight leading-tight">
              {category.title}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light mb-2">
              {category.desc}
            </p>
            <a 
              href="https://wa.me/628123456789" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-wider transition-colors"
            >
              Hubungi Tim Kami <MessageCircle className="w-4 h-4" />
            </a>
          </div>

          <div className="lg:col-span-8 w-full flex flex-col">
            {category.items.map((item, idx) => {
              const itemKey = `${category.id}-${idx}`;
              return (
                <AccordionItem
                  key={idx}
                  item={item}
                  isOpen={!!openItems[itemKey]}
                  onToggle={() => toggleItem(itemKey)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
