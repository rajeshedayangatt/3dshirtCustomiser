"use client";
import { useState } from "react";
import { AccordionItem } from "./accordian-item";
import ShirtCanvas from "./shirt-canvas";
// import { GlobalModelLoader } from "./loader";

const MOBILE_PANEL_HEIGHT = "14rem"; // 224px

export default function ShirtDesign() {
  const [openSection, setOpenSection] = useState<"fabric" | "sleeve" | null>(
    "fabric"
  );
  const [selectedFabric, setSelectedFabric] = useState("cotton_white");
  const [selectedSleeve, setSelectedSleeve] = useState("long_sleeve");

  return (
    <div className="h-screen w-full overflow-hidden ">
      {/* ================= MOBILE LAYOUT ================= */}
      <div className="md:hidden h-screen flex flex-col">
        {/* Canvas (TOP) */}
        <div
          className="w-full"
          style={{ height: `calc(100vh - ${MOBILE_PANEL_HEIGHT})` }}
        >
          <ShirtCanvas
            selectedFabric={selectedFabric}
            selectedSleeve={selectedSleeve}
          />
        </div>

        {/* Bottom Config Panel */}
        <aside
          className="w-full border-t border-slate-800 flex flex-col"
          style={{ height: MOBILE_PANEL_HEIGHT }}
        >
          {/* Header */}
          <div className="px-4 py-2 border-b border-slate-800 shrink-0">
            <h1 className="text-sm font-semibold text-white">
              Shirt Config
            </h1>
            <p className="text-[10px] text-slate-400">
              Customize your shirt
            </p>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-3 pb-4">
            {/* Fabric */}
            <AccordionItem
              title="Fabric"
              isOpen={openSection === "fabric"}
              onToggle={() =>
                setOpenSection((cur) =>
                  cur === "fabric" ? null : "fabric"
                )
              }
            >
              <div className="grid grid-cols-4 gap-2">
                {FABRICS.map((fabric) => (
                  <button
                    key={fabric.id}
                    onClick={() => setSelectedFabric(fabric.id)}
                    className={`relative aspect-square rounded border text-[10px]
                      ${
                        selectedFabric === fabric.id
                          ? "border-sky-500 ring-1 ring-sky-500"
                          : "border-slate-700"
                      }`}
                  >
                    <img
                      src={fabric.src}
                      alt={fabric.label}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] text-white text-center">
                      {fabric.label}
                    </span>
                  </button>
                ))}
              </div>
            </AccordionItem>

            {/* Sleeve */}
            <AccordionItem
              title="Sleeve"
              isOpen={openSection === "sleeve"}
              onToggle={() =>
                setOpenSection((cur) =>
                  cur === "sleeve" ? null : "sleeve"
                )
              }
            >
              <div className="grid grid-cols-3 gap-2">
                {SLEEVES.map((sleeve) => (
                  <button
                    key={sleeve.id}
                    onClick={() => setSelectedSleeve(sleeve.id)}
                    className={`relative aspect-video rounded border text-[10px]
                      ${
                        selectedSleeve === sleeve.id
                          ? "border-sky-500 ring-1 ring-sky-500"
                          : "border-slate-700"
                      }`}
                  >
                    <img
                      src={sleeve.src}
                      alt={sleeve.label}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] text-white text-center">
                      {sleeve.label}
                    </span>
                  </button>
                ))}
              </div>
            </AccordionItem>
          </div>
        </aside>
      </div>

      {/* ================= DESKTOP LAYOUT ================= */}
      <div className="hidden md:flex h-screen">
        {/* Sidebar */}
        <aside className="w-72 border-r border-slate-800 flex flex-col">
          <div className="px-4 py-3 border-b border-slate-800">
            <h1 className="text-lg font-semibold text-white">
              Shirt Config
            </h1>
            <p className="text-xs text-slate-400">
              Customize your shirt
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-3 pb-4">
            {/* Reuse same accordions */}
            <AccordionItem
              title="Fabric"
              isOpen={openSection === "fabric"}
              onToggle={() =>
                setOpenSection((cur) =>
                  cur === "fabric" ? null : "fabric"
                )
              }
            >
              <div className="grid grid-cols-3 gap-2">
                {FABRICS.map((fabric) => (
                  <button
                    key={fabric.id}
                    onClick={() => setSelectedFabric(fabric.id)}
                    className={`relative aspect-square rounded border
                      ${
                        selectedFabric === fabric.id
                          ? "border-sky-500 ring-1 ring-sky-500"
                          : "border-slate-700"
                      }`}
                  >
                    <img
                      src={fabric.src}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </AccordionItem>

            <AccordionItem
              title="Sleeve"
              isOpen={openSection === "sleeve"}
              onToggle={() =>
                setOpenSection((cur) =>
                  cur === "sleeve" ? null : "sleeve"
                )
              }
            >
              <div className="grid grid-cols-2 gap-2">
                {SLEEVES.map((sleeve) => (
                  <button
                    key={sleeve.id}
                    onClick={() => setSelectedSleeve(sleeve.id)}
                    className={`relative aspect-video rounded border
                      ${
                        selectedSleeve === sleeve.id
                          ? "border-sky-500 ring-1 ring-sky-500"
                          : "border-slate-700"
                      }`}
                  >
                    <img
                      src={sleeve.src}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </AccordionItem>
          </div>
        </aside>

        {/* Canvas */}
        <main className="flex-1">
          <ShirtCanvas
            selectedFabric={selectedFabric}
            selectedSleeve={selectedSleeve}
          />
        </main>
      </div>
    </div>
  );
}

type OptionImage = {
  id: string;
  label: string;
  src: string;
};

const FABRICS: OptionImage[] = [
  {
    id: "cotton_white",
    label: "Cotton White",
    src: "/images/fabric_thumb/140136.jpg",
  },
  {
    id: "cotton_blue",
    label: "Cotton Blue",
    src: "/images/fabric_thumb/454515.jpg",
  },
  {
    id: "linen_beige",
    label: "Linen Beige",
    src: "/images/fabric_thumb/454523.jpg",
  },
];

const SLEEVES: OptionImage[] = [
  {
    id: "long_sleeve",
    label: "Long Sleeve",
    src: "/images/sleeve_thumb/Long-Sleeve.png",
  },
  {
    id: "long_sleeve_roll_up",
    label: "Long Sleeve Roll Up",
    src: "/images/sleeve_thumb/Long-Sleeve-Roll-Up.png",
  },
  {
    id: "short_sleeve",
    label: "Short Sleeve",
    src: "/images/sleeve_thumb/Short-Sleeve.png",
  },
];
