"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { List, Hash, Code, Quote, Terminal, Wifi, WifiOff } from "lucide-react";

export default function Editor() {
  const [status, setStatus] = useState("connecting");
  const ydoc = useMemo(() => new Y.Doc(), []);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:1234");
    ws.binaryType = "arraybuffer";
    ws.onopen = () => setStatus("connected");
    ws.onclose = () => setStatus("disconnected");
    ws.onmessage = (e) => Y.applyUpdate(ydoc, new Uint8Array(e.data), "server");
    const handleUpdate = (update: Uint8Array, origin: any) => {
      if (origin !== "server" && ws.readyState === WebSocket.OPEN) ws.send(update);
    };
    ydoc.on("update", handleUpdate);
    return () => { ydoc.off("update", handleUpdate); ws.close(); };
  }, [ydoc]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      (StarterKit as any).configure({ history: false }),
      Collaboration.configure({ document: ydoc }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-invert max-w-2xl mx-auto focus:outline-none min-h-[80vh] py-32 px-4 text-emerald-50/90 font-mono text-sm sm:text-base leading-[2.5] tracking-tight",
      },
    },
  });

  if (!editor) return null;

  return (
    
    <div className="min-h-screen bg-[#080808] text-emerald-50/80 selection:bg-emerald-500/20">
      
      {/* 1. TOP SYSTEM BAR */}
      <nav className="fixed top-0 w-full z-50 border-b border-emerald-500/10 bg-[#080808]/80 backdrop-blur-md px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Terminal size={18} className="text-emerald-500" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">Node_Sync_v2.5</span>
        </div>

        {/* The Heartbeat Connection Indicator */}
        <div className="flex items-center gap-4">
  <div className="flex flex-col items-end">
    <span className={`text-[9px] font-black uppercase tracking-widest leading-none ${status === 'connected' ? 'text-emerald-500' : 'text-red-500'}`}>
      {status === 'connected' ? 'System Online' : 'Link Severed'}
    </span>
    
    {/* Fixed height container prevents the layout from jumping */}
    <div className="flex gap-0.5 mt-1 h-3 items-end overflow-hidden">
      {[1, 2, 3, 4].map((i) => (
        <motion.div 
          key={i}
          animate={status === 'connected' ? { height: [4, 12, 4] } : { height: 2 }}
          transition={{ 
            repeat: Infinity, 
            duration: 1, 
            delay: i * 0.1,
            ease: "easeInOut"
          }}
          className={`w-[2px] rounded-full ${status === 'connected' ? 'bg-emerald-500' : 'bg-red-900'}`}
        />
      ))}
    </div>
  </div>
  {status === 'connected' ? <Wifi size={16} className="text-emerald-500" /> : <WifiOff size={16} className="text-red-500" />}
</div>
      </nav>

      <div className="flex justify-center items-start gap-12 max-w-6xl mx-auto px-4">
  
  {/* 3. MAIN WRITING AREA */}
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }}
    className="flex-1 pt-24 min-h-screen"
  >
    <EditorContent editor={editor} />
  </motion.div>

  {/* 2. THE NEW BRIDGE SIDEBAR */}
  <aside className="sticky top-32 z-40 hidden lg:flex flex-col gap-2 p-1.5 border border-emerald-500/10 rounded-2xl bg-[#0A0A0A] shadow-[0_0_50px_-12px_rgba(16,185,129,0.1)]">
    <div className="px-2 py-1 mb-1 border-b border-emerald-500/10">
      <span className="text-[8px] font-black text-emerald-500/40 uppercase tracking-tighter">Tools</span>
    </div>
    
    <SideButton 
      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
      icon={<Hash size={18} />} 
      active={editor.isActive('heading')} 
    />
    <SideButton 
      onClick={() => editor.chain().focus().toggleBulletList().run()} 
      icon={<List size={18} />} 
      active={editor.isActive('bulletList')} 
    />
    <SideButton 
      onClick={() => editor.chain().focus().toggleCodeBlock().run()} 
      icon={<Code size={18} />} 
      active={editor.isActive('codeBlock')} 
    />
    <SideButton 
      onClick={() => editor.chain().focus().toggleBlockquote().run()} 
      icon={<Quote size={18} />} 
      active={editor.isActive('blockquote')} 
    />
    
    <div className="mt-2 p-2 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
    </div>
  </aside>
</div>

      {/* 4. BACKGROUND GRAIN EFFECT */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}

function SideButton({ icon, onClick, active }: { icon: any, onClick: any, active: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={`p-3 rounded-full transition-all duration-300 ${active ? 'bg-emerald-500 text-black' : 'text-emerald-500/40 hover:text-emerald-500 hover:bg-emerald-500/10'}`}
    >
      {icon}
    </button>
  );
}