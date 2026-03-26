import React from "react";

interface LivePreviewProps {
  data: any;
}

function renderPrimitive(value: any) {
  if (typeof value === "string" || typeof value === "number") {
    return <p className="text-white/60 text-sm leading-relaxed">{String(value)}</p>;
  }
  return null;
}

function renderArrayPreview(items: any[]) {
  if (!items.length) return null;

  return (
    <div className="mt-3 bg-white/5 rounded p-3">
      <p className="text-[10px] uppercase text-white/30 mb-2">
        Items ({items.length})
      </p>

      <div className="space-y-2">
        {items.slice(0, 4).map((item, i) => {
          if (typeof item === "string" || typeof item === "number") {
            return (
              <div key={i} className="flex gap-2 items-start text-xs text-white/60">
                <span className="text-cyan-500/50">•</span>
                <span>{String(item)}</span>
              </div>
            );
          }

          if (typeof item === "object" && item !== null) {
            return (
              <div
                key={i}
                className="border border-white/10 rounded p-2 bg-black/20 text-xs text-white/60"
              >
                <div className="font-medium text-white/80">
                  {item.title || item.heading || item.name || item.label || `Item ${i + 1}`}
                </div>
                {(item.intro || item.description || item.text || item.content) && (
                  <div className="mt-1 text-white/50 line-clamp-2">
                    {item.intro || item.description || item.text || item.content}
                  </div>
                )}
              </div>
            );
          }

          return null;
        })}

        {items.length > 4 && (
          <div className="text-[10px] text-white/20 italic">
            + {items.length - 4} more items...
          </div>
        )}
      </div>
    </div>
  );
}

function renderObjectPreview(section: any) {
  if (!section || typeof section !== "object") return null;

  return (
    <div className="space-y-3">
      {(section.badge || section.eyebrow) && (
        <div className="text-[10px] uppercase tracking-widest text-cyan-400 font-semibold">
          {section.badge || section.eyebrow}
        </div>
      )}

      {(section.title || section.heading || section.headline) && (
        <h3 className="text-white font-medium text-lg leading-tight">
          {section.title || section.heading || section.headline}
        </h3>
      )}

      {(section.subtitle || section.subheading) && (
        <h4 className="text-white/60 text-sm font-medium uppercase tracking-wide">
          {section.subtitle || section.subheading}
        </h4>
      )}

      {(section.content || section.description || section.text || section.note) && (
        <p className="text-white/50 text-sm leading-relaxed line-clamp-4">
          {section.content || section.description || section.text || section.note}
        </p>
      )}

      {section.items && Array.isArray(section.items) && renderArrayPreview(section.items)}
      {section.stats && Array.isArray(section.stats) && renderArrayPreview(section.stats)}
      {section.points && Array.isArray(section.points) && renderArrayPreview(section.points)}
      {section.deliverables && Array.isArray(section.deliverables) && renderArrayPreview(section.deliverables)}
      {section.services && Array.isArray(section.services) && renderArrayPreview(section.services)}

      {(section.cta || section.primaryCta || section.buttonText || section.link) && (
        <div className="mt-2 flex flex-wrap gap-2">
          {section.cta?.label && (
            <span className="px-3 py-1 bg-cyan-900/30 text-cyan-300 text-xs rounded border border-cyan-500/20">
              CTA: {section.cta.label}
            </span>
          )}
          {section.primaryCta?.label && (
            <span className="px-3 py-1 bg-cyan-900/30 text-cyan-300 text-xs rounded border border-cyan-500/20">
              CTA: {section.primaryCta.label}
            </span>
          )}
          {section.buttonText && (
            <span className="px-3 py-1 bg-cyan-900/30 text-cyan-300 text-xs rounded border border-cyan-500/20">
              CTA: {section.buttonText}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default function LivePreview({ data }: LivePreviewProps) {
  if (!data) {
    return <div className="text-white/20 italic">Invalid JSON data</div>;
  }

  const sections = Array.isArray(data)
    ? data.map((item, index) => ({
        key: item?.type || item?.component || `section-${index + 1}`,
        value: item,
      }))
    : Object.entries(data).map(([key, value]) => ({
        key,
        value,
      }));

  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <div
          key={section.key}
          className="bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden"
        >
          <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex justify-between items-center">
            <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-semibold">
              {section.key}
            </span>
            <span className="text-[10px] text-white/20">Index {index}</span>
          </div>

          <div className="p-4">
            {Array.isArray(section.value) ? (
              renderArrayPreview(section.value)
            ) : typeof section.value === "object" && section.value !== null ? (
              renderObjectPreview(section.value)
            ) : (
              renderPrimitive(section.value)
            )}
          </div>
        </div>
      ))}

      {sections.length === 0 && (
        <div className="p-8 text-center text-white/20 border border-dashed border-white/10 rounded">
          No sections defined.
        </div>
      )}
    </div>
  );
}