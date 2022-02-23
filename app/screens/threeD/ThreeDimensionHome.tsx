import { View, Text } from "react-native";
import React from "react";
import THREE, {
  BoxBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
} from "three";
import { Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";

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

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    // gl.clearColor(0, 1, 1, 1);
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
    <GLView
      style={{ flex: 1, height: 500, width: 500 }}
      onContextCreate={onContextCreate}
    />
  );
};

export default ThreeDimensionHome;
