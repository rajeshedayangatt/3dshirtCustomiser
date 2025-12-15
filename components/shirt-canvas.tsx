import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { ShirtModel } from "./shirt-modal";
import {
  SRGBColorSpace,
  LinearToneMapping,
} from "three";


export default function ShirtCanvas({ selectedSleeve, selectedFabric }: any) {
  return (
    <>
    <Canvas
      shadows
      camera={{ position: [3, 2, 5], fov: 45 }}
      className="w-full h-full"
      gl={{ antialias: true }}
      onCreated={(state) => {
        state.gl.outputColorSpace = SRGBColorSpace;
        state.gl.toneMapping = LinearToneMapping;
        state.gl.toneMappingExposure = 1;
      }}
    >
      <Environment preset="city" background={true} blur={0.5} />
      <ambientLight intensity={1} />
      <directionalLight position={[3, 5, 2]} intensity={0.8} castShadow />
      <directionalLight position={[-3, 3, -2]} intensity={0.4} />
      <Suspense fallback={null}>
          <ShirtModel
            selectedFabric={selectedFabric}
            selectedSleeve={selectedSleeve}
          />
      </Suspense>
      <OrbitControls enableZoom />
    </Canvas>
    </>
  );
}


      {/* HDR environment lighting */}
      {/* <Environment
        // files="/images/hdr/studio_small_08_2k.hdr"
        files="/images/hdr/brown_photostudio_02_2k.hdr"
         background={true}
        blur={0.5}
        backgroundBlurriness={0.5}
        backgroundIntensity={0.2}

        // files="/images/hdr/brown_photostudio_02_2k.hdr"
        // background={false}        // IMPORTANT
        // backgroundIntensity={0.4}
        // blur={0.2}
      />   */}