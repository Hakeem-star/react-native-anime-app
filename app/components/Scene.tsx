import { OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import React from "react";
import { View, Text } from "react-native";
import THREE, { CameraHelper, DirectionalLightHelper } from "three";
import { Room } from "./Room";

interface Props {}

const Scene = (props: Props) => {
  const virtualCamera = React.useRef<THREE.Camera>(null!);
  const directionalLightRef = React.useRef<THREE.DirectionalLight>(null!);

  const [{ cameraPosition, directionalLightPosition }, set] = useControls(
    () => ({
      p: 0,
      cameraPosition: [0, -0.39, 0.51],
      directionalLightPosition: [2, 2, 0.5],
      // 0.51
    })
  );

  useFrame(() => {
    window.addEventListener("mousemove", (event) => {
      if (virtualCamera.current) {
        virtualCamera.current.rotation.x +=
          -(
            (event.clientY - window.innerHeight / 2) /
            (window.innerHeight / 2)
          ) *
            0.1 -
          virtualCamera.current.rotation.x;

        virtualCamera.current.rotation.y =
          -((event.clientX - window.innerWidth / 2) / (window.innerWidth / 2)) *
          0.7;
      }
    });
  });

  useHelper(directionalLightRef, DirectionalLightHelper, 1, "green");

  return (
    <>
      <PerspectiveCamera
        fov={60}
        makeDefault
        ref={virtualCamera}
        position={cameraPosition}
      />
      {/* <OrbitControls
        camera={virtualCamera.current}
        // enablePan={false}
        enableZoom={false}
        enableRotate={true}
      /> */}

      <ambientLight />
      <directionalLight
        ref={directionalLightRef}
        castShadow
        position={directionalLightPosition}
        intensity={0.5}
      />
      <Room />
    </>
  );
};

export default Scene;
