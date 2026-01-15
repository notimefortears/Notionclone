"use client";
import { ReactNode } from "react";
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense";

export function Room({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_NHObOlOK4KqpkpolNANHk9mbV92LupReMm0NFOXJj4-hLqSSjjmLFPdad-FqKrtH"}>
      <RoomProvider id="notion-room-1" initialPresence={{ cursor: null }}>
        <ClientSideSuspense fallback={<div>Loading Editor...</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}