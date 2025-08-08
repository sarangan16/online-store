import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Toast = ({ message, onClose }) => {
  const toastRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onClose, // remove toast after animation ends
    });

    tl.fromTo(
      toastRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    )
      .to(toastRef.current, { opacity: 1, duration: 2 }) // visible duration
      .to(toastRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      });
  }, [onClose]);

  return (
    <div
      ref={toastRef}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50"
    >
      {message}
    </div>
  );
};

export default Toast;
