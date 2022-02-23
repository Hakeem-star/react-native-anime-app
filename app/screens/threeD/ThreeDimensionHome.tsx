import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { THREE, Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
const { BoxBufferGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene } =
  THREE;
type Props = {};

const ThreeDimensionHome = (props: Props) => {
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
