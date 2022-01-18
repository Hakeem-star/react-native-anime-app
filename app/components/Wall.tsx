import { Color, MeshProps } from "@react-three/fiber";
import React from "react";
import { BackSide, DoubleSide } from "three";

const Wall = (props: MeshProps & { color?: Color }) => {
  return (
    <mesh {...props} scale={[1.1, 1.1, 1.1]}>
      <planeGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
};

export default Wall;
