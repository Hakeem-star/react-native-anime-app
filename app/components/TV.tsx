import { useGLTF } from "@react-three/drei";
import React from "react";
import { View, Text } from "react-native";
import { Mesh } from "three";
import { Asset } from "expo-asset";
import { useControls } from "leva";

interface Props {}

const TV = (props: Props) => {
  const asset = Asset.fromModule(require("../assets/TV.gltf"));

  const { nodes, materials } = useGLTF(asset.uri || "", true);

  console.log(asset.uri, nodes, materials);

  const [{ tvPosition, tvRotation }, set] = useControls(() => ({
    tvPosition: [0, -0.5, -0.41],
    tvRotation: { value: [0, 3.14, 0], step: Math.PI / 2 },
  }));

  return (
    <group position={tvPosition} rotation={tvRotation}>
      <primitive
        scale={[0.2, 0.2, 0.2]}
        object={nodes.Scene}
        ma
        dispose={null}
      />
    </group>
  );
};

function UseGLTFScene() {
  return (
    <React.Suspense fallback={null}>
      <TV />
    </React.Suspense>
  );
}

export default UseGLTFScene;
