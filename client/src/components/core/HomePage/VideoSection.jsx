import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Banner from "../../../assets/Images/banner.mp4";

const VideoSection = () => {
  const sectionRef = useRef(null);
  const videoBoxRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop animation - only on larger screens
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "-15% top",
          end: "200% top",
          scrub: 1.5,
          pin: true,
        },
      });

      tl.to(videoBoxRef.current, {
        clipPath: "circle(100% at 50% 50%)",
        ease: "power1.inOut",
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center w-full my-12"
    >
      <div
        ref={videoBoxRef}
        className="mx-3 w-full max-w-5xl rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] border border-richblack-700"
        style={{
          clipPath: "circle(6% at 50% 50%)",
        }}
      >
        <video
          className="w-full h-full object-cover"
          muted
          loop
          autoPlay
          playsInline
        >
          <source src={Banner} type="video/mp4" />
        </video>

        {/* Play Button Overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            {/* Spinning Circle Text */}
            <div className="w-32 h-32 md:w-40 md:h-40 animate-spin-slow">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text fill="#FFD60A" fontSize="10" fontWeight="bold">
                  <textPath href="#circlePath">
                     LEARN • GROW • DESIGN • BUILD • THINK • LY •
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Play Button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <button className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-yellow-50 flex items-center justify-center transition-transform hover:scale-110">
                <div className="w-0 h-0 border-l-[12px] md:border-l-[16px] border-l-richblack-900 border-t-[8px] md:border-t-[10px] border-t-transparent border-b-[8px] md:border-b-[10px] border-b-transparent ml-1"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

