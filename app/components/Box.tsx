// import * as THREE from "three";
// import { useFrame } from "@react-three/fiber";
// import React, { useRef, useState } from "react";
// import { View, Text } from "react-native";

// interface Props {}

// const Box = (props: JSX.IntrinsicElements["mesh"]) => {
//   // This reference will give us direct access to the THREE.Mesh object
//   const mesh = useRef<THREE.Mesh>(null!);
//   // Set up state for the hovered and active state
//   const [hovered, setHover] = useState(false);
//   const [active, setActive] = useState(false);
//   // Subscribe this component to the render-loop, rotate the mesh every frame

//   useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
//   // Return the view, these are regular Threejs elements expressed in JSX
//   return (
//     <mesh
//       {...props}
//       ref={mesh}
//       scale={active ? 1.5 : 1}
//       onClick={(event) => setActive(!active)}
//       onPointerOver={(event) => setHover(true)}
//       onPointerOut={(event) => setHover(false)}
//     >
//       <planeGeometry args={[1, 1, 1]}  />
//       <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
//     </mesh>
//   );
// };

// export default Box;
