"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import LivePreview from "./LivePreview";

interface PageEditorFormProps {
  slug: string;
  initialLivePage: any;
  initialDrafts: any[];
}

export default function PageEditorForm({ slug, initialLivePage, initialDrafts }: PageEditorFormProps) {
  const router = useRouter();

  // Content State
  // Default to live page content
  const [title, setTitle] = useState(initialLivePage?.title || "");
  const [jsonContent, setJsonContent] = useState(JSON.stringify(initialLivePage?.sections || {}, null, 2));
  
  // Workflow State
  const [drafts, setDrafts] = useState<any[]>(initialDrafts || []);
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null); // null = Live Version
  
  // UI State
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [draftNameInput, setDraftNameInput] = useState("");

  // Derived Values
  const { previewData, isValidJson, jsonError } = useMemo(() => {
    try {
      const data = JSON.parse(jsonContent);
      return { previewData: data, isValidJson: true, jsonError: null };
    } catch (e: any) {
      return { previewData: null, isValidJson: false, jsonError: e.message };
    }
  }, [jsonContent]);

  // --- Actions ---

  const loadLiveVersion = () => {
    if (confirm("Discard current changes and load the live published version?")) {
      setTitle(initialLivePage.title);
      setJsonContent(JSON.stringify(initialLivePage.sections || {}, null, 2));
      setSelectedDraftId(null);
      setDraftNameInput("");
      setMessage("Loaded live version.");
    }
  };

  const loadDraft = (draftId: string) => {
    const draft = drafts.find(d => d._id === draftId);
    if (!draft) return;
    
    // Always confirm if switching contexts to avoid data loss
    if (selectedDraftId !== draftId && !confirm(`Load draft "${draft.draftName}"? Unsaved changes will be lost.`)) {
        return;
    }

    setTitle(draft.title);
    setJsonContent(JSON.stringify(draft.sections, null, 2));
    setSelectedDraftId(draftId);
    setDraftNameInput(draft.draftName);
    setMessage(`Loaded draft: ${draft.draftName}`);
  };

  const handleFormat = () => {
    if (!isValidJson) return;
    setJsonContent(JSON.stringify(previewData, null, 2));
  };

  const saveDraft = async (asNew: boolean = false) => {
    if (!isValidJson) {
      setStatus("error");
      setMessage("Invalid JSON");
      return;
    }

    setStatus("saving");
    setMessage("Saving draft...");

    try {
      let url = `/api/admin/drafts/${slug}`;
      let method = "POST";
      
      const body: any = {
        title,
        sections: previewData,
        draftName: draftNameInput || `Draft - ${new Date().toLocaleString()}`
      };

      // If updating an existing draft (and NOT forcing a new one)
      if (!asNew && selectedDraftId) {
        url = `/api/admin/drafts/item/${selectedDraftId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to save draft");

      const result = await res.json();
      
      if (asNew || !selectedDraftId) {
        // Created new draft
        const newDraft = result.data;
        setDrafts([newDraft, ...drafts]);
        setSelectedDraftId(newDraft._id);
        setDraftNameInput(newDraft.draftName);
      } else {
        // Updated existing
        const updatedDraft = result.data;
        setDrafts(drafts.map(d => d._id === updatedDraft._id ? updatedDraft : d));
      }

      setStatus("success");
      setMessage("Draft saved successfully.");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  const deleteDraft = async () => {
    if (!selectedDraftId) return;
    if (!confirm("Are you sure you want to delete this draft? This cannot be undone.")) return;
    
    setStatus("saving");
    try {
      const res = await fetch(`/api/admin/drafts/item/${selectedDraftId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete draft");
      
      setDrafts(drafts.filter(d => d._id !== selectedDraftId));
      
      // Fallback to live version after deletion
      setTitle(initialLivePage.title);
      setJsonContent(JSON.stringify(initialLivePage.sections || {}, null, 2));
      setSelectedDraftId(null);
      setDraftNameInput("");
      
      setStatus("success");
      setMessage("Draft deleted.");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  const publishLive = async () => {
    if (!isValidJson) return;
    
    // Safety check
    const promptMsg = selectedDraftId 
      ? `Publish draft "${draftNameInput}" to the LIVE site?` 
      : "Publish these changes to the LIVE site?";
      
    if (!confirm(`${promptMsg}\n\nThis will overwrite the public page immediately.`)) return;

    setStatus("saving");
    setMessage("Publishing to live site...");

    try {
      // 1. Update the actual PageContent
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          status: 'published',
          sections: previewData,
        }),
      });

      if (!res.ok) throw new Error("Failed to publish");
      
      // 2. Optional: If we just published a draft, maybe we want to delete it?
      // Or we keep it as a history point. Let's keep it for now, user can manually delete.
      // But we should reload everything.

      setStatus("success");
      setMessage("PUBLISHED LIVE.");
      
      // Force refresh data
      router.refresh();
      setTimeout(() => setStatus("idle"), 2000);
      
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
      {/* Left Column: Editor & Controls */}
      <div className="flex flex-col gap-4 h-full">
        
        {/* -- CONTROL PANEL -- */}
        <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-sm space-y-4">
           
           {/* Draft Selection */}
           <div className="space-y-1">
             <label className="text-[10px] uppercase tracking-widest text-white/40 flex justify-between">
               <span>Active Version</span>
               <button onClick={loadLiveVersion} className="text-cyan-400 hover:text-cyan-300">Reset to Live</button>
             </label>
             <select 
               className="w-full bg-[#151515] border border-white/10 text-white text-sm p-2 rounded focus:border-cyan-500 outline-none"
               value={selectedDraftId || ""}
               onChange={(e) => {
                 const val = e.target.value;
                 if (!val) loadLiveVersion();
                 else loadDraft(val);
               }}
             >
               <option value="">Live Version (Published)</option>
               {drafts.length > 0 && <optgroup label="Saved Drafts">
                 {drafts.map(d => (
                   <option key={d._id} value={d._id}>
                     {d.draftName} — {new Date(d.updatedAt).toLocaleDateString()}
                   </option>
                 ))}
               </optgroup>}
             </select>
           </div>

           {/* Draft Name & Actions */}
           <div className="flex gap-2 items-end">
             <div className="flex-1 space-y-1">
               <label className="text-[10px] uppercase tracking-widest text-white/40">Draft Name</label>
               <input 
                  type="text" 
                  value={draftNameInput}
                  onChange={e => setDraftNameInput(e.target.value)}
                  className="w-full bg-[#151515] border border-white/10 text-white text-sm px-3 py-2 rounded focus:border-cyan-500 outline-none placeholder-white/20"
                  placeholder="e.g. Summer Update"
                  disabled={!selectedDraftId && !jsonContent} // Enable if we have content to save
               />
             </div>
             
             <button 
               onClick={() => saveDraft(false)} 
               className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10 rounded h-9.5 whitespace-nowrap"
             >
               {selectedDraftId ? "Save Draft" : "Save as New Draft"}
             </button>
             
             {selectedDraftId && (
               <button 
                onClick={() => saveDraft(true)} 
                className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10 rounded h-9.5 whitespace-nowrap"
                title="Create a copy"
               >
                 Save Copy
               </button>
             )}
           </div>
           
           { selectedDraftId && (
              <div className="flex justify-end">
                <button onClick={deleteDraft} className="text-[10px] text-red-500 hover:text-red-400 underline">Delete this draft</button>
              </div>
           )}
        </div>

        {/* -- JSON EDITOR -- */}
        <div className="flex-1 flex flex-col bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden min-h-75">
          <div className="flex justify-between items-center bg-white/5 border-b border-white/10 px-4 py-2">
            <span className="text-xs font-mono text-white/40 flex items-center gap-2">
               <span className={`w-2 h-2 rounded-full ${selectedDraftId ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
               {selectedDraftId ? "Editing Draft" : "Editing Live Page"}
            </span>
            <button 
                onClick={handleFormat}
                disabled={!isValidJson}
                className="text-[10px] uppercase text-cyan-400 hover:text-cyan-300 disabled:opacity-30 tracking-wide font-semibold"
            >
                Format JSON
            </button>
          </div>
          <div className="relative flex-1">
             <textarea
               value={jsonContent}
               onChange={(e) => setJsonContent(e.target.value)}
               className="absolute inset-0 w-full h-full bg-[#050505] p-4 text-sm font-mono text-cyan-100 focus:outline-none resize-none leading-relaxed custom-scrollbar"
               spellCheck={false}
             />
          </div>
          <div className={`px-4 py-1 text-[10px] border-t border-white/10 font-mono ${isValidJson ? 'text-green-500' : 'text-red-400'}`}>
            {isValidJson ? "✓ Valid JSON" : `⚠ ${jsonError}`}
          </div>
        </div>

        {/* -- MAIN ACTIONS -- */}
        <div className="flex items-center gap-4 py-2 border-t border-white/5 pt-4">
           <button onClick={() => router.back()} className="px-4 py-2 text-white/40 hover:text-white text-sm transition-colors">Exit</button>
           
           <div className="flex-1 text-center font-medium">
              {status === 'saving' && <span className="text-yellow-400 text-sm animate-pulse">{message}</span>}
              {status === 'success' && <span className="text-green-400 text-sm">{message}</span>}
              {status === 'error' && <span className="text-red-400 text-sm">{message}</span>}
           </div>

           <button 
             onClick={publishLive}
             disabled={status === 'saving' || !isValidJson}
             className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded shadow-lg shadow-cyan-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
           >
             Publish to Live Site
           </button>
        </div>

      </div>

      {/* Right Column: Preview */}
      <div className="hidden lg:flex flex-col h-full bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden shadow-xl">
        <div className="p-3 border-b border-white/10 bg-white/5 flex justify-between items-center">
          <h3 className="text-xs uppercase tracking-widest text-white/40 font-semibold">Live Preview</h3>
          <span className="text-[10px] text-white/20">
            {selectedDraftId ? "Previewing Draft" : "Previewing Live Content"}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-[#050505] custom-scrollbar">
           {isValidJson ? <LivePreview data={previewData} /> : <div className="text-white/20 text-center italic mt-10">Fix JSON to see preview</div>}
        </div>
      </div>
    </div>
  );
}
