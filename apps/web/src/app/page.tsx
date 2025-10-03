"use client";

import { Button } from "@losensky-systems/web-components-react";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Button onClick={() => console.log("clicked")}>Click me</Button>
      <Button variant="secondary">Click me</Button>
    </div>
  );
}
