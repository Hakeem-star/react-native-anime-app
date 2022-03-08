import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { THREE, Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Asset } from "expo-asset";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { useGLTF } from "@react-three/drei";

const { BoxBufferGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene } =
  THREE;
type Props = {};

const ThreeDimensionHome = (props: Props) => {
  //   console.log({ nodes });

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );

    camera.position.z = 2;

    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const geometry = new BoxBufferGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({
      color: "blue",
    });
    const cube = new Mesh(geometry, material);
    scene.add(cube);

    // TV

    const asset = Asset.fromModule(require("../../assets/TV.glb"));

    const loader = new GLTFLoader();

    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    // loader.setDRACOLoader(dracoLoader);
    // Issues loading custom assets. An error happened [Error: FileReader.readAsArrayBuffer is not implemented]
    loader.load(
      // resource URL
      asset.uri || "",
      // called when the resource is loaded
      function (gltf) {
        console.log({ gltf });

        scene.add(gltf.scene);

        gltf.animations; // Array<THREE.AnimationClip>
        gltf.scene; // THREE.Group
        gltf.scenes; // Array<THREE.Group>
        gltf.cameras; // Array<THREE.Camera>
        gltf.asset; // Object
      },
      // called while loading is progressing
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      function (error) {
        console.log("An error happened", error);
      }
    );

    const render = () => {
      requestAnimationFrame(render);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    render();
  };

  return (
    <View style={{ flex: 1 }}>
      <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
    </View>
  );
};

export default ThreeDimensionHome;
