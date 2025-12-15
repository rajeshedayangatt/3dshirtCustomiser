import { useEffect, useMemo, useRef, useState } from "react";
import { DoubleSide } from "three";
import { useGLTF } from "@react-three/drei";
import { textureManager } from "../util/textureManager";

export function ShirtModel({
  selectedSleeve,
  selectedFabric,
}: {
  selectedSleeve: string;
  selectedFabric: string;
}) {
  const size = 0.8;
  const plain = useGLTF("/models/Plain.gltf");
  const band = useGLTF("/models/Band.gltf");
  const cuff = useGLTF("/models/Cuff.gltf");
  const inside1 = useGLTF("/models/Inside.gltf");
  const longsleeve = useGLTF("/models/Long-Sleeve.gltf");
  const outside = useGLTF("/models/Outside.gltf");
  const round = useGLTF("/models/Round.gltf");
  const york = useGLTF("/models/York.gltf");
  const wristband = useGLTF("/models/Wristband.gltf");
  const Button = useGLTF("/models/Button.gltf");
  const LongSleeveRollUp = useGLTF("/models/Long-Sleeve-Roll-Up.gltf");
  const ShortSleeve = useGLTF("/models/Short-Sleeve.gltf");
  const Cuff_roll_sleeve = useGLTF("/models/rollup/Cuff.gltf");

  

  const FABRIC_MAP:any = {
    cotton_white: "/images/fabric/7.jpg",
    cotton_blue: "/images/fabric/454515 (1).jpg",
    linen_beige: "/images/fabric/fabric2.jpg",
  };

  const fabricUrl = FABRIC_MAP[selectedFabric] ?? "/images/fabric/454521.jpg";

  const [activeTexture, setActiveTexture] = useState<any>(null);
  const requestIdRef = useRef(0);

  console.log("selectedSleeve", selectedSleeve);

  const SLEEVE_RULES:any = {
    long_sleeve: ["longSleeve", "cuff", "wristband"],
    long_sleeve_roll_up: ["longSleeveRollUp","Cuff_roll_sleeve"],
    short_sleeve: ["shortSleeve"], // no cuff
  };

  const isPartVisible = (part: any, selectedSleeve: string) => {
    return SLEEVE_RULES[selectedSleeve]?.includes(part);
  };

  const fabricMaterials = useMemo(() => {
    const collect = (gltf: any) => Object.values(gltf.materials ?? {});

    const parts = [
      plain,
      band,
      cuff,
      inside1,
      longsleeve,
      outside,
      round,
      york,
      wristband,
      Button,
      LongSleeveRollUp,
      ShortSleeve,
      Cuff_roll_sleeve
    ];

    return parts.flatMap(collect);
  }, []);

  // 🔹 Load texture via TextureManager (NO suspend)
  useEffect(() => {
    const requestId = ++requestIdRef.current;

    textureManager.load(fabricUrl, (tex) => {
      if (requestId !== requestIdRef.current) return;
      setActiveTexture(tex);
    });
  }, [fabricUrl]);

  useEffect(() => {
    if (!activeTexture) return;

    fabricMaterials.forEach((mat: any) => {
      mat.map = activeTexture;
    });
  }, [activeTexture, fabricMaterials]);

  // 🔹 Optional: dispose textures when component unmounts
  useEffect(() => {
    return () => {
      textureManager.disposeAll();
    };
  }, []);

  return (
    <group>
      <primitive object={plain.scene} scale={size} />
      <primitive object={band.scene} scale={size} />
      <primitive object={inside1.scene} scale={size} />
      <primitive object={outside.scene} scale={size} />
      <primitive object={round.scene} scale={size} />
      <primitive object={york.scene} scale={size} />
      <primitive object={Button.scene} scale={size} />

      <primitive
        object={LongSleeveRollUp.scene}
        scale={size}
        visible={isPartVisible("longSleeveRollUp", selectedSleeve)}
      />

      <primitive
        object={longsleeve.scene}
        scale={size}
        visible={isPartVisible("longSleeve", selectedSleeve)}
      />

      <primitive
        object={ShortSleeve.scene}
        scale={size}
        visible={isPartVisible("shortSleeve", selectedSleeve)}
      />

      <primitive
        object={cuff.scene}
        scale={size}
        visible={isPartVisible("cuff", selectedSleeve)}
      />
      <primitive
        object={wristband.scene}
        scale={size}
        visible={isPartVisible("wristband", selectedSleeve)}
      />

        <primitive
        object={Cuff_roll_sleeve.scene}
        scale={size}
        visible={isPartVisible("Cuff_roll_sleeve", selectedSleeve)}
      />

    </group>
  );
}
