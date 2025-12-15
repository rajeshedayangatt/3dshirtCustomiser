
"use client";
import { useState } from "react";
import { AccordionItem } from "./accordian-item";
import ShirtCanvas from "./shirt-canvas";
import { GlobalModelLoader } from "./loader";

export default function ShirtDesign() {
  const [openSection, setOpenSection] = useState<"fabric" | "sleeve" | null>("fabric");
  const [selectedFabric, setSelectedFabric] = useState<string>("cotton_white");
  const [selectedCollar, setSelectedCollar] = useState<string>("spread");
  const [selectedSleeve, setSelectedSleeve] = useState<string>("long_sleeve");
  return (
    <>
    <GlobalModelLoader />
    
    <div className="h-screen flex ">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-slate-800  backdrop-blur flex flex-col">
        <div className="px-4 py-3 border-b border-slate-800">
          <h1 className="text-lg font-semibold">Shirt Config</h1>
          <p className="text-xs ">Customize your shirt</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Fabric accordion */}
          <AccordionItem
            title="Fabric"
            isOpen={openSection === "fabric"}
            onToggle={() =>
              setOpenSection((cur) => (cur === "fabric" ? null : "fabric"))
            }
          >
            <div className="grid grid-cols-3 gap-2">
              {FABRICS.map((fabric) => (
                <button
                  key={fabric.id}
                  onClick={() => setSelectedFabric(fabric.id)}
                  className={`group relative rounded border text-[10px] overflow-hidden aspect-square ${
                    selectedFabric === fabric.id
                      ? "border-sky-500 ring-1 ring-sky-500"
                      : "border-slate-700 hover:border-slate-500"
                  }`}
                >
                  <img
                    src={fabric.src}
                    alt={fabric.label}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-black/60 text-[9px] px-1 py-0.5 text-center text-white">
                    {fabric.label}
                  </span>
                </button>
              ))}
            </div>
          </AccordionItem>

          {/* Collar accordion */}
          <AccordionItem
            title="Sleeve"
            isOpen={openSection === "sleeve"}
            onToggle={() =>
              setOpenSection((cur) => (cur === "sleeve" ? null : "sleeve"))
            }
          >
            <div className="grid grid-cols-2 gap-2">
              {SLEEVES.map((sleeve) => (
                <button
                  key={sleeve.id}
                  onClick={() => setSelectedSleeve(sleeve.id)}
                  className={`group relative rounded border text-[10px] overflow-hidden aspect-video ${
                    selectedSleeve === sleeve.id
                      ? "border-sky-500 ring-1 ring-sky-500"
                      : "border-slate-700 hover:border-slate-500"
                  }`}
                >
                  <img
                    src={sleeve.src}
                    alt={sleeve.label}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-black/60 text-[9px] px-1 py-0.5 text-center text-white">
                    {sleeve.label}
                  </span>
                </button>
              ))}
            </div>
          </AccordionItem>
        </div>
      </aside>

      {/* Canvas area (same as before, just pass selectedFabric / selectedCollar to your model) */}
      <main className="flex-1 ">
              <ShirtCanvas selectedSleeve={selectedSleeve} selectedFabric={selectedFabric}/>
      </main>
    </div>
    </>
  );
}


type OptionImage = {
    id: string;
    label: string;
    src: string;
  };
  
  const FABRICS: OptionImage[] = [
    { id: "cotton_white", label: "Cotton White", src: "/images/fabric_thumb/140136.jpg" },
    { id: "cotton_blue", label: "Cotton Blue", src: "/images/fabric_thumb/454515.jpg" },
    { id: "linen_beige", label: "Linen Beige", src: "/images/fabric_thumb/454523.jpg" },
  ];

  const SLEEVES: OptionImage[] = [
    { id: "long_sleeve", label: "Long Sleeve", src: "/images/sleeve_thumb/Long-Sleeve.png" },
    { id: "long_sleeve_roll_up", label: "Long Sleeve Roll Up", src: "/images/sleeve_thumb/Long-Sleeve-Roll-Up.png" },
    { id: "short_sleeve", label: "Short Sleeve", src: "/images/sleeve_thumb/Short-Sleeve.png"},
  ];
  

  