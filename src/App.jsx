import { useEffect, useRef } from "react";
import gsap from "gsap";

function App() {
  const boxRef = useRef();

  useEffect(() => {
    gsap.to(boxRef.current, {
      x: 200,
      rotation: 360,
      duration: 2,
      ease: "power2.out",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div
        ref={boxRef}
        className="w-32 h-32 bg-blue-500 rounded-lg"
      ></div>
    </div>
  );
}

export default App;
