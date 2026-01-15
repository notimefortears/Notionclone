import Editor from "@/components/Editor";
import VisualWrapper from "@/components/VisualWrapper";

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-purple-500/30">
      <div className="mesh-bg" />

      <nav className="flex items-center justify-between px-8 py-6 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <h1 className="text-white/90 font-medium tracking-tight">Personal / <span className="text-white/40">Notion_Solo</span></h1>
        </div>
      </nav>

      <VisualWrapper>
        {/* Removed <Room> wrapper */}
        <Editor />
      </VisualWrapper>
    </main>
  );
}