
import React, { useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/glb/sh1.glb')

    const fabricMap = useTexture("/images/fabric/fabric2.jpg");
  
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Front_Format2010.geometry}
        material={materials.Shirt}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/glb/sh1.glb')