"use client";

import { Button, Input } from "@losensky-systems/web-components-react";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [count, setCount] = useState(0);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {/* Demo Section for Web Components */}
      <section className="mt-16 p-8 bg-gray-50 dark:bg-gray-800 rounded-lg max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          🚀 Web Components Demo
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Button Components</h3>
            <div className="flex gap-4 flex-wrap">
              <Button 
                variant="primary" 
                onClick={() => setCount(count + 1)}
              >
                Count: {count}
              </Button>
              
              <Button 
                variant="secondary" 
                onClick={() => setCount(0)}
              >
                Reset
              </Button>
              
              <Button 
                disabled
              >
                Disabled
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Input Components</h3>
            <div className="space-y-4">
              <Input
                placeholder="Enter some text..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              
              <Input
                type="email"
                placeholder="Enter your email"
              />
              
              <Input
                placeholder="Disabled input"
                disabled
              />
              
              {inputValue && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  You typed: <strong>{inputValue}</strong>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
