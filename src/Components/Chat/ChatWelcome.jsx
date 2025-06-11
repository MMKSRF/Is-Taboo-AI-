import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ChatWelcome({ show }) {
  const welcomeRef = useRef();

  useEffect(() => {
    const el = welcomeRef.current;

    if (show) {
      // Animate in
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 200 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    } else {
      // Animate out
      gsap.to(el, {
        autoAlpha: 0,
        y: -30,
        duration: 1,
        ease: "power2.in",
      });
    }
  }, [show]);


 useEffect(() => {
  gsap.to('.glow-letter', {
    textShadow: '0 0 10px #0ff, 0 0 20px #0ff',
    color: '#007FFF',
    repeat: -1,
    yoyo: true,
    duration: 1,
    stagger: {
      each: 0.05,
      repeat: -1,
      yoyo: true,
    },
    ease: 'power1.inOut',
  });
}, []);






  return (
    <div
      ref={welcomeRef}
      className="flex flex-col justify-center items-center h-full w-full text-center px-6 max-w-xl mx-auto opacity-0"
    >
      <h2 className="text-3xl font-bold mb-4 text-text">
  {'Welcome'.split('').map((char, i) => (
    <span key={`w-${i}`} className="glow-letter">{char}</span>
  ))}{' '}
  {'to'.split('').map((char, i) => (
    <span key={`t-${i}`} className="glow-letter">{char}</span>
  ))}{' '}
  {'Taboo'.split('').map((char, i) => (
    <span key={`taboo-${i}`} className="glow-letter">{char}</span>
  ))}{' '}
  {'Chat'.split('').map((char, i) => (
    <span key={`chat-${i}`} className="glow-letter">{char}</span>
  ))}
</h2>
      <p className="text-text mb-6 leading-relaxed">
        Here, we talk about untalkable things. We address taboo practices and provide help to those who need it. Just share what’s on your mind, and we’ll support you with the help you need.
      </p>
      <a
        href="https://your-docs-link.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition"
      >
        📚 View Docs
      </a>
    </div>
  );
}