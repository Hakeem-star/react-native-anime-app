import { useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { BackSide } from "three";
import Wall from "./Wall";
import { useGLTF } from "@react-three/drei";
import TV from "./TV";

export const Room = () => {
  return (
    <group castShadow>
      {/* Bottom */}
      <TV />
      <Wall
        receiveShadow
        color={"red"}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
      />

      {/* Back */}

      <Wall
        receiveShadow
        color={"red"}
        rotation={[0, 0, 0]}
        position={[0, 0, -0.5]}
      />

      {/* Left */}

      <Wall
        receiveShadow
        castShadow
        color={"blue"}
        rotation={[0, Math.PI / 2, 0]}
        position={[-0.5, 0, 0]}
      />

      {/* Right */}

      <Wall
        color={"green"}
        receiveShadow
        castShadow
        rotation={[0, -Math.PI / 2, 0]}
        position={[0.5, 0, 0]}
      />
    </group>
  );
};
