# 🚀 Collaborative Notion Clone (Raw Sync)

A high-performance, real-time collaborative text editor built from scratch using **Next.js**, **Tiptap**, and **Yjs**. This project features a custom Node.js binary synchronization server to handle multi-user editing without a heavy third-party backend.

## ✨ Features

- **Real-time Sync:** Powered by Yjs and WebSockets for conflict-free editing.
- **Binary Protocol:** Uses raw `Uint8Array` updates for ultra-low latency and minimal bandwidth.
- **Cyber-Minimalist UI:** A dark-mode, terminal-inspired interface with Emerald accents.
- **Custom Sync Server:** A lightweight Node.js server handling state distribution and document persistence.
- **Modern Tech Stack:** Next.js 15+, Tailwind CSS, Framer Motion, and Lucide Icons.

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), Tiptap (Headless Editor), Tailwind CSS.
- **Collaboration:** Yjs (CRDTs), `lib0` (Decoding).
- **Backend:** Node.js, `ws` (WebSockets).
- **Animations:** Framer Motion.

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/notimefortears/Notionclone.git](https://github.com/notimefortears/Notionclone.git)
cd Notionclone
```
### 2. Install dependencies
```bash
npm install
```

### 3. Start the Sync Server

In one terminal, run the custom WebSocket server:
```bash 
node sync-server.mjs
```
### 4. Start the Frontend

In another terminal, run the Next.js development server:
Bash
```bash
npm run dev
```
Visit http://localhost:3000 to start collaborating!
## 📡 How the Sync Works

Unlike standard JSON-based sync, this project uses Yjs binary updates. When a user types, the change is encoded into a Uint8Array and broadcasted via WebSockets. The server applies these updates to a headless document and relays the binary delta to all other connected collaborators, ensuring 100% state consistency.
