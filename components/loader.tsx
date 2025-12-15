import { Html, useProgress } from "@react-three/drei";

function ModelLoader() {
  const { progress } = useProgress();

  return (
    <Html fullscreen>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          inset: 0,
          background: "rgba(0,0,0,0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "18px",
          zIndex: 999999,
          width: "100%",
          height: "100vh",
        }}
      >
        <div>
          <p className="mb-2 text-lg">Loading shirt models…</p>
          {/* <p>{progress.toFixed(0)}%</p> */}
        </div>
      </div>
    </Html>
  );
}

export default ModelLoader;


export function GlobalModelLoader() {
  const { active, progress } = useProgress();

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur"
    >
      <div className="text-center text-white">
        <p className="text-lg font-semibold">Loading shirt models....</p>
        {/* <p className="mt-2 text-sm">{progress.toFixed(0)}%</p> */}
      </div>
    </div>
  );
}