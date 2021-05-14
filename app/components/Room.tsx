import React, { useRef } from "react";

interface Props {}

export const Room = (props: Props) => {
  const floor = useRef<THREE.Mesh>(null!);
  const wall = useRef<THREE.Mesh>(null!);

  return (
    <group>
      <mesh
        visible
        {...props}
        scale={[2, 2, 2]}
        rotation={[Math.PI * 0.5, 0, 0]}
        position={[1, 0, 0]}
        ref={floor}
      >
        <planeGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"red"} />
      </mesh>
      <mesh {...props} rotation={[0, 0, 0]} ref={wall}>
        <planeGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"blue"} />
      </mesh>
    </group>
  );
};
