"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import LivePreview from "./LivePreview";

interface PageEditorFormProps {
  slug: string;
  initialLivePage: any;
  initialDrafts: any[];
}

export default function PageEditorForm({ slug, initialLivePage, initialDrafts }: PageEditorFormProps) {
  const router = useRouter();

  // Content state — always starts at live page
  const [title, setTitle] = useState(initialLivePage?.title || "");
  const [jsonContent, setJsonContent] = useState(
    JSON.stringify(initialLivePage?.sections || {}, null, 2)
  );

  // Draft state
  const [drafts, setDrafts] = useState<any[]>(initialDrafts || []);
  const [selectedDraftId, setSelectedDraftId] = useState<string | null>(null);
  const [pendingDraftId, setPendingDraftId] = useState<string | "live" | null>(null); // draft awaiting confirmation

  // UI state
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [draftNameInput, setDraftNameInput] = useState("");
  const [isDirty, setIsDirty] = useState(false); // unsaved changes indicator

  // Derived
  const { previewData, isValidJson, jsonError } = useMemo(() => {
    try {
      const data = JSON.parse(jsonContent);
      return { previewData: data, isValidJson: true, jsonError: null };
    } catch (e: any) {
      return { previewData: null, isValidJson: false, jsonError: e.message };
    }
  }, [jsonContent]);

  const selectedDraft = useMemo(
    () => (selectedDraftId ? drafts.find((d) => d._id === selectedDraftId) : null),
    [selectedDraftId, drafts]
  );

  // --- Load helpers (no side effects, just apply content) ---

  const applyLiveContent = useCallback(() => {
    setTitle(initialLivePage.title);
    setJsonContent(JSON.stringify(initialLivePage.sections || {}, null, 2));
    setSelectedDraftId(null);
    setDraftNameInput("");
    setIsDirty(false);
    flashMessage("Loaded live version.", "success");
  }, [initialLivePage]);

  const applyDraftContent = useCallback(
    (draftId: string) => {
      const draft = drafts.find((d) => d._id === draftId);
      if (!draft) return;
      setTitle(draft.title);
      setJsonContent(JSON.stringify(draft.sections, null, 2));
      setSelectedDraftId(draftId);
      setDraftNameInput(draft.draftName);
      setIsDirty(false);
      flashMessage(`Loaded: ${draft.draftName}`, "success");
    },
    [drafts]
  );

  // --- Confirmation-gated load (safe for dirty state) ---

  const loadLiveVersion = () => {
    if (isDirty && !confirm("Discard unsaved changes and load the live published version?")) return;
    applyLiveContent();
  };

  const loadDraft = (draftId: string) => {
    if (isDirty && !confirm("Discard unsaved changes and switch to this draft?")) return;
    applyDraftContent(draftId);
  };

  // --- Selector handler: safe with pending state when dirty ---

  const handleSelectorChange = (val: string) => {
    const target = val || "live";
    if (isDirty) {
      setPendingDraftId(target); // trigger confirmation UI instead of browser confirm()
      return;
    }
    if (target === "live") applyLiveContent();
    else applyDraftContent(target);
  };

  const confirmPending = () => {
    if (!pendingDraftId) return;
    if (pendingDraftId === "live") applyLiveContent();
    else applyDraftContent(pendingDraftId);
    setPendingDraftId(null);
  };

  const dismissPending = () => setPendingDraftId(null);

  // --- Helpers ---

  const markDirty = (setter: (v: string) => void) => (v: string) => {
    setter(v);
    setIsDirty(true);
  };

  const flashMessage = (msg: string, type: "success" | "error") => {
    setStatus(type);
    setMessage(msg);
    setTimeout(() => setStatus("idle"), 2500);
  };

  const handleFormat = () => {
    if (!isValidJson) return;
    setJsonContent(JSON.stringify(previewData, null, 2));
  };

  // --- Save / Delete / Publish ---

  const saveDraft = async (asNew = false) => {
    if (!isValidJson) { flashMessage("Fix JSON errors first", "error"); return; }
    setStatus("saving");
    setMessage("Saving draft…");

    try {
      const body: any = {
        title,
        sections: previewData,
        draftName: draftNameInput || `Draft — ${new Date().toLocaleString()}`,
      };

      let url = `/api/admin/drafts/${slug}`;
      let method = "POST";

      if (!asNew && selectedDraftId) {
        url = `/api/admin/drafts/item/${selectedDraftId}`;
        method = "PUT";
      }

      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error("Failed to save draft");

      const result = await res.json();
      if (asNew || !selectedDraftId) {
        const newDraft = result.data;
        setDrafts([newDraft, ...drafts]);
        setSelectedDraftId(newDraft._id);
        setDraftNameInput(newDraft.draftName);
      } else {
        const updated = result.data;
        setDrafts(drafts.map((d) => (d._id === updated._id ? updated : d)));
      }
      setIsDirty(false);
      flashMessage("Draft saved.", "success");
    } catch (err: any) {
      flashMessage(err.message, "error");
    }
  };

  const deleteDraft = async () => {
    if (!selectedDraftId) return;
    if (!confirm("Delete this draft? This cannot be undone.")) return;
    setStatus("saving");
    try {
      const res = await fetch(`/api/admin/drafts/item/${selectedDraftId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete draft");
      setDrafts(drafts.filter((d) => d._id !== selectedDraftId));
      applyLiveContent();
      flashMessage("Draft deleted.", "success");
    } catch (err: any) {
      flashMessage(err.message, "error");
    }
  };

  const publishLive = async () => {
    if (!isValidJson) return;
    const label = selectedDraft ? `"${selectedDraft.draftName}"` : "your current changes";
    if (!confirm(`Publish ${label} to the LIVE site? This immediately updates the public page.`)) return;

    setStatus("saving");
    setMessage("Publishing…");
    try {
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, status: "published", sections: previewData }),
      });
      if (!res.ok) throw new Error("Failed to publish");
      setIsDirty(false);
      flashMessage("Published to live site.", "success");
      router.refresh();
    } catch (err: any) {
      flashMessage(err.message, "error");
    }
  };

  const editingMode = selectedDraftId ? "draft" : "live";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">

      {/* Pending-switch confirmation banner */}
      {pendingDraftId && (
        <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-6 py-3 bg-yellow-500/10 border-b border-yellow-500/30 backdrop-blur-sm">
          <p className="text-yellow-200 text-sm">You have unsaved changes. Switching will discard them.</p>
          <div className="flex gap-3">
            <button onClick={dismissPending} className="text-white/50 hover:text-white text-sm">Keep editing</button>
            <button onClick={confirmPending} className="px-3 py-1 bg-yellow-600 hover:bg-yellow-500 text-white text-sm rounded-sm">Discard & Switch</button>
          </div>
        </div>
      )}

      {/* LEFT — Editor */}
      <div className="flex flex-col gap-4 h-full">

        {/* Control Panel */}
        <div className="bg-[#0a0a0a] border border-white/10 p-4 rounded-sm space-y-4">

          {/* Draft selector */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
                Active Version
              </label>
              <button
                onClick={loadLiveVersion}
                className="text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Reset to Live
              </button>
            </div>
            <select
              className="w-full bg-[#111] border border-white/10 text-white text-sm px-3 py-2 rounded-sm focus:border-cyan-500 outline-none"
              value={selectedDraftId || ""}
              onChange={(e) => handleSelectorChange(e.target.value)}
            >
              <option value="">Live Version (Published)</option>
              {drafts.length > 0 && (
                <optgroup label="Saved Drafts">
                  {drafts.map((d) => (
                    <option key={d._id} value={d._id}>
                      {d.draftName} — {new Date(d.updatedAt).toLocaleDateString()}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>

          {/* Draft name + save actions */}
          <div className="flex gap-2 items-end">
            <div className="flex-1 space-y-1.5">
              <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
                Draft Name
              </label>
              <input
                type="text"
                value={draftNameInput}
                onChange={(e) => setDraftNameInput(e.target.value)}
                placeholder="e.g. Summer Update"
                className="w-full bg-[#111] border border-white/10 text-white text-sm px-3 py-2 rounded-sm focus:border-cyan-500 outline-none placeholder-white/20"
              />
            </div>

            <button
              onClick={() => saveDraft(false)}
              disabled={status === "saving"}
              className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs rounded-sm transition-colors whitespace-nowrap disabled:opacity-40"
            >
              {selectedDraftId ? "Save Draft" : "Save as Draft"}
            </button>

            {selectedDraftId && (
              <button
                onClick={() => saveDraft(true)}
                disabled={status === "saving"}
                className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs rounded-sm transition-colors whitespace-nowrap disabled:opacity-40"
                title="Save as a new copy"
              >
                Save Copy
              </button>
            )}
          </div>

          {selectedDraftId && (
            <div className="flex justify-end">
              <button onClick={deleteDraft} className="text-[10px] text-red-500 hover:text-red-400 transition-colors">
                Delete this draft
              </button>
            </div>
          )}
        </div>

        {/* JSON Editor */}
        <div className="flex-1 flex flex-col bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden min-h-0">
          <div className="flex justify-between items-center bg-white/[0.03] border-b border-white/10 px-4 py-2">
            <span className="text-xs font-mono text-white/40 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${editingMode === "draft" ? "bg-yellow-400" : "bg-green-500"}`} />
              {editingMode === "draft" ? `Draft: ${selectedDraft?.draftName || "unnamed"}` : "Live Page"}
              {isDirty && (
                <span className="ml-2 text-[9px] px-1.5 py-0.5 bg-orange-500/20 text-orange-300 rounded-sm border border-orange-500/20 uppercase tracking-wider">
                  Unsaved
                </span>
              )}
            </span>
            <button
              onClick={handleFormat}
              disabled={!isValidJson}
              className="text-[10px] uppercase text-cyan-400 hover:text-cyan-300 disabled:opacity-30 tracking-wide font-semibold"
            >
              Format JSON
            </button>
          </div>

          {/* Title field */}
          <div className="px-4 pt-3 pb-1">
            <input
              type="text"
              value={title}
              onChange={(e) => markDirty(setTitle)(e.target.value)}
              placeholder="Page title"
              className="w-full bg-transparent border-b border-white/10 text-white text-sm py-1 focus:border-cyan-500 outline-none placeholder-white/20 transition-colors"
            />
          </div>

          <div className="relative flex-1">
            <textarea
              value={jsonContent}
              onChange={(e) => markDirty(setJsonContent)(e.target.value)}
              className="absolute inset-0 w-full h-full bg-[#050505] p-4 text-sm font-mono text-cyan-100/90 focus:outline-none resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>
          <div className={`px-4 py-1.5 text-[10px] border-t border-white/10 font-mono ${isValidJson ? "text-green-500" : "text-red-400"}`}>
            {isValidJson ? "✓ Valid JSON" : `⚠ ${jsonError}`}
          </div>
        </div>

        {/* Actions bar */}
        <div className="flex items-center gap-4 border-t border-white/5 pt-3">
          <button onClick={() => router.back()} className="text-white/30 hover:text-white text-sm transition-colors">
            ← Back
          </button>

          <div className="flex-1 text-center text-sm font-medium">
            {status === "saving" && <span className="text-yellow-400 animate-pulse">{message}</span>}
            {status === "success" && <span className="text-green-400">{message}</span>}
            {status === "error" && <span className="text-red-400">{message}</span>}
          </div>

          <button
            onClick={publishLive}
            disabled={status === "saving" || !isValidJson}
            className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-sm shadow-lg shadow-cyan-900/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Publish Live
          </button>
        </div>
      </div>

      {/* RIGHT — Preview */}
      <div className="hidden lg:flex flex-col h-full bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden">
        <div className="px-4 py-2.5 border-b border-white/10 bg-white/[0.02] flex justify-between items-center">
          <h3 className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Live Preview</h3>
          <span className={`text-[10px] ${editingMode === "draft" ? "text-yellow-400/60" : "text-green-500/60"}`}>
            {editingMode === "draft" ? "Previewing Draft" : "Previewing Live"}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-[#050505]">
          {isValidJson
            ? <LivePreview data={previewData} />
            : <div className="text-white/20 text-center italic mt-10 text-sm">Fix JSON errors to see preview</div>
          }
        </div>
      </div>
    </div>
  );
}
