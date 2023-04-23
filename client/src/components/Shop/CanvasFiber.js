import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Plane, Sky, OrbitControls } from "@react-three/drei";
import useWindowDimensions from "../../common/hooks/useWindowDimensions";
import pause from "../../common/images/pause.png";
import play from "../../common/images/play.png";
import glassZoomIn from "../../common/images/glassZoomIn.png";
import glassZoomOut from "../../common/images/glassZoomOut.png";
import backOfTheCanvas from "../../common/images/backOfTheCanvas.png";
import curlyArrowLeft from "../../common/images/curlyArrowLeft.png";
import curlyArrowRight from "../../common/images/curlyArrowRight.png";
import { useImageSize } from "react-image-size";
function Box({ image, setCanvasLoading, isCanvasRunning, isFramePlaying }) {
  const [dimensions, { loading, error }] = useImageSize(image?.imageUrl);
  const mesh = useRef();
  if (isFramePlaying) {
    useFrame(() => (mesh.current.rotation.y += 0.009));
  } else {
    useFrame(() => (mesh.current.rotation.y = 0));
  }
  useEffect(() => {
    setCanvasLoading(false);
  }, []);
  return (
    <>
      <mesh ref={mesh} castShadow>
        <boxGeometry
          args={[
            !loading && (dimensions?.width * 0.01).toFixed(10) * 0.5,
            !loading && (dimensions?.width * 0.01).toFixed(10) * 0.5,
            0.22,
          ]}
        />
        <meshBasicMaterial attach="material-0" color="grey" />
        <meshBasicMaterial attach="material-1" color="grey" />
        <meshBasicMaterial attach="material-2" color="grey" />
        <meshBasicMaterial attach="material-3" color="grey" />
        <meshStandardMaterial
          attach="material-4"
          map={useLoader(TextureLoader, backOfTheCanvas)}
        />
        {image && (
          <meshStandardMaterial
            attach="material-5"
            map={useLoader(TextureLoader, image.imageUrl)}
          />
        )}
      </mesh>
      {isCanvasRunning && (
        <OrbitControls
          minAzimuthAngle={-Math.PI}
          maxAzimuthAngle={Math.PI}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          maxDistance={15}
          makeDefault
        />
      )}
    </>
  );
}
function CameraRig({ position: [x, y, z] }) {
  useFrame((state) => {
    state.camera.position.lerp({ x, y, z }, 0.1);
    state.camera.lookAt(0, 0, 0);
  });
}
export const CanvasFiber = ({ image, setCanvasLoading, isCanvasRunning }) => {
  const { width } = useWindowDimensions();
  const [isFramePlaying, setFramePlaying] = useState(true);
  const [position, setPosition] = useState();
  const [isZoomedIn, setIsZoomedIn] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  function returnWidth() {
    if (width < 1366 && width > 1024) {
      return "90%";
    } else if (width > 766 && width < 1024) {
      return "95%";
    } else if (width > 1366) {
      return "69.9%";
    } else if (width < 766) {
      return "96.5%";
    }
  }

  function zoomIn() {
    setPosition([0, 0, -5]);
    setIsZoomedIn(true);
    setFramePlaying(false);
  }
  function zoomOut() {
    if (isZoomedIn) {
      setPosition([10, 0, -5]);
      setTimeout(() => {
        setIsZoomedIn(false);
      }, 550);
    }
  }

  document.addEventListener("scroll", zoomOut);
  return (
    <>
      <div className="sign">blackbellart.com</div>
      <div className="tools">
        <button
          onClick={() => setRotationDirection("left")}
          className="tools-item"
        >
          <img src={curlyArrowLeft} alt="" />
        </button>
        <button onClick={zoomIn} className="tools-item">
          <img src={glassZoomIn} alt="" />
        </button>
        <button
          onClick={() => setFramePlaying(!isFramePlaying)}
          className="tools-item"
        >
          <img src={isFramePlaying ? pause : play} alt="" />
        </button>
        <button onClick={zoomOut} className="tools-item">
          <img src={glassZoomOut} alt="" />
        </button>
        <button
          onClick={() => setRotationDirection("right")}
          className="tools-item"
        >
          <img src={curlyArrowRight} alt="" />
        </button>
      </div>
      <Canvas
        id="canvas"
        dpr={1}
        style={{
          height: "70vh",
          width: returnWidth(),
          margin: "0 auto",
          boxShadow: "0px 0px 12px black",
          cursor: isGrabbing ? "grabbing" : "grab",
        }}
        onMouseDownCapture={() => setIsGrabbing(true)}
        onMouseUpCapture={() => setIsGrabbing(false)}
        eventPrefix="client"
        camera={{ position: [5, 0, -5], fov: 45 }}
        shadows
      >
        {isZoomedIn && <CameraRig position={position} />}
        <ambientLight intensity={0.3} />
        <spotLight
          intensity={0.3}
          angle={0.05}
          penumbra={1.3}
          position={[13, 50, -100]}
          castShadow
        />
        {image && (
          <Box
            isFramePlaying={isFramePlaying}
            image={image}
            setCanvasLoading={setCanvasLoading}
            isCanvasRunning={isCanvasRunning}
            castShadow
            receiveShadow
            position={[0, 0, 0]}
          />
        )}
        <Plane
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -5, 0]}
          args={[55, 55, 10]}
        >
          <meshPhongMaterial attach="material" color="grey" />
        </Plane>
        <Sky inclination={0.51} scale={20} />
      </Canvas>
    </>
  );
};
