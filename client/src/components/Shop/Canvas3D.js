import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import arrowHorizontal from "../../common/images/doubleArrowHorizontal.png";
import arrowVertical from "../../common/images/doubleArrow.png";
import placeholder from "./1.jpg";

import { CanvasFiber } from "./CanvasFiber";
const Canvas3D = ({ img }) => {
  // const canvasRef = useRef();
  const wrapperRef = useRef();

  // const [isLoaded, setIsLoaded] = useState();

  // useEffect(() => {
  //   setTimeout(() => {
  //     const scene = new THREE.Scene();
  //     const camera = new THREE.PerspectiveCamera(
  //       60,
  //       wrapperRef.current.offsetWidth / wrapperRef.current.offsetHeight,
  //       0.1,
  //       1000
  //     );
  //     camera.lookAt(15, -5.75, 50);
  //     camera.position.set(5, 5, 0);
  //     const renderer = new THREE.WebGLRenderer({ antialias: true });
  //     renderer.setClearColor("#e5e5e5");
  //     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  //     const pointLight = new THREE.PointLight(0xffffff, 0.75);
  //     const light = new THREE.DirectionalLight(0xffffff);
  //     light.position.set(-3, -3, 3);
  //     light.castShadow = true;
  //     light.position.set(1, 3, 8);

  //     const geometry = new THREE.BoxGeometry(5, 8, 1);
  //     const geometrySquare = new THREE.BoxGeometry(5, 5, 1);
  //     const ambient = new THREE.HemisphereLight(0x111111, 0xffffff);

  //     const cubeMaterials = [
  //       new THREE.MeshPhongMaterial({ color: 0x888888 }),
  //       new THREE.MeshPhongMaterial({ color: 0x888888 }),
  //       new THREE.MeshPhongMaterial({ color: 0x888888 }),
  //       new THREE.MeshPhongMaterial({ color: 0x888888 }),
  //       new THREE.MeshBasicMaterial({
  //         map: new THREE.TextureLoader().load(img?.imageUrl),
  //         side: THREE.DoubleSide,
  //       }),
  //       new THREE.MeshPhongMaterial({ color: 0x888888 }),
  //     ];
  //     const cube = new THREE.Mesh(geometry, cubeMaterials);
  //     scene.add(cube);
  //     scene.add(light);
  //     scene.add(camera);
  //     scene.add(ambientLight);
  //     scene.add(pointLight);
  //     scene.add(ambient);

  //     const controls = new OrbitControls(camera, canvasRef.current);
  //     camera.position.z = 10;
  //     controls.update();

  //     renderer.setSize(
  //       wrapperRef.current.offsetWidth - 100,
  //       wrapperRef.current.offsetHeight - 100
  //     );
  //     !isLoaded && canvasRef.current.appendChild(renderer.domElement);

  //     const animate = () => {
  //       cube.rotation.y += 0.001;
  //       requestAnimationFrame(animate);
  //       renderer.render(scene, camera);
  //     };
  //     animate();
  //     setIsLoaded(true);
  //   }, 1500);
  // }, []);

  return (
    <>
      {/* <div className="canvas"> */}

      {/* <h1>podgląd na płótnie 3D</h1> */}
      {/* <div className="animationWrapper"> */}
      {/* <div id="widthWrapper" className="widthWrapper"> */}
      {/* <div className="widthWrapper-value"> */}
      {/* <strong> 30cm</strong> */}
      {/* </div> */}
      {/* <img src={arrowHorizontal} alt="" /> */}
      {/* </div> */}
      {/* <div className="heightWrapper"> */}
      {/* <img src={arrowVertical} alt="" /> */}
      {/* <div className="heightWrapper-value"> */}
      {/* <strong> 45cm</strong> */}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default Canvas3D;
