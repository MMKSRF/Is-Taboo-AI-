import { useEffect, useRef , useState} from "react";
import gsap from "gsap";

export default function Loading() {



  const glassRef = useRef();
  const liquidRef = useRef(); // Ref for the liquid element
  const [dots, setDots] = useState(".");

  useEffect(() => {
    // Animation for the entire wine glass (movement)
    gsap.to(glassRef.current, {
      x: 100,
      rotation: 360,
      duration: 1,
      ease: "circ",
      repeat: -1,
      yoyo: true,
    });

    // Animation for filling the liquid
    gsap.fromTo(
      liquidRef.current,
      { height: "0%" }, // Start from empty
      {
        height: "90%", // Fill up to 70% (adjust as desired)
        duration: 1,
        ease: "power1.inOut",
        delay: 0, // Start filling after a small delay
        repeat: -1,
        yoyo: true,
      }
    );
     // Dots animation
    const interval = setInterval(() => {
      setDots((prev) =>
        prev === "..." ? "." : prev === ".." ? "..." : ".."
      );
    }, 333);

    return () => clearInterval(interval);
  }, []);


  

  return (
  <div className="flex justify-center items-center h-screen w-screen absolute top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/30">

<div className="flex justify-center items-center h-screen w-screen absolute top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/10">
    <div
        className="
          w-auto
          inline-block
          h-20           
          bg-text    
          border-l-8    
          border-text
          rounded-md "    
      >
      
      </div>
      <div
        ref={glassRef}
        className="
          relative
          w-10 h-12 
          bg-text
          rounded-full
          overflow-hidden
          border-t-2 border-x-2 border-gray-300


          before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-2 before:h-12 before:bg-gray-200/50 /* Stem */
          after:content-[''] after:absolute after:bottom-[-15px] after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-4 after:bg-gray-200/50 after:rounded-full /* Base */
        "
      >
        {/* The "liquid" element */}
        <div
          ref={liquidRef}
          className="absolute bottom-0 left-0 w-full bg-gray-600 rounded-b-full" /* Red liquid, positioned at the bottom */
          style={{ height: "0%" }} // Initial height for GSAP animation
        ></div>

      </div>
       
    </div>
     <p className="text-text text-xl font-semibold ml-20 mt-16">
        Loading<span>{dots}</span>
      </p>
  </div>
  );
}



