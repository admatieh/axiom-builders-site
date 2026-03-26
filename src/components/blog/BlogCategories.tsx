"use client";

import { useState } from "react";

// Allow dynamic categories to be passed in
export default function BlogCategories({
  categories,
  barTitle,
  staticCategories,
}: {
  categories?: any[];
  barTitle?: string;
  staticCategories?: string[];
}) {
  const [activeCategory, setActiveCategory] = useState("All");

  const dynamicCategories = (categories || []).map((c: any) => c.name);
  const preferred = staticCategories && staticCategories.length > 0 ? staticCategories : dynamicCategories;
  const categoryNames = ["All", ...preferred];
  
  return (
    <div className="w-full px-6 sm:px-12 md:px-20 mb-12 border-b border-white/5">
      {barTitle && (
        <div className="max-w-7xl mx-auto mb-4">
          <p className="text-xs uppercase tracking-widest text-white/40">{barTitle}</p>
        </div>
      )}
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 pb-6 overflow-x-auto no-scrollbar">
        {categoryNames.map((cat: any) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-4 py-2 text-xs uppercase tracking-widest rounded-full transition-all duration-300 border
              ${
                activeCategory === cat
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
