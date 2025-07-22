import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";
import { Grid3x3, Rotate3d } from "lucide-react";

const RollingGallery = ({ images = [] }) => {
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(
    window.innerWidth <= 640
  );
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cylinder configuration (larger size)
  const cylinderWidth = isScreenSizeSm ? 1400 : 2200;
  const faceCount = images.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.8; // Increased size
  const radius = cylinderWidth / (2 * Math.PI);

  // Animation controls
  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const transform = useTransform(
    rotation,
    (val) => `rotate3d(0,1,0,${val}deg)`
  );

  // Start smooth infinite rotation
  useEffect(() => {
    controls.start({
      rotateY: [0, -360],
      transition: {
        duration: 40, // Slower rotation
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, []);

  const handleUpdate = (latest) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  return (
    <div className="relative h-[700px] w-full my-12">
      {/* Mode toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowGrid(!showGrid)}
        className="absolute top-4 right-4 z-20 btn btn-primary btn-sm"
      >
        {showGrid ? <Rotate3d size={18} /> : <Grid3x3 size={18} />}
        <span className="ml-2">{showGrid ? "3D View" : "Grid View"}</span>
      </motion.button>

      {showGrid ? (
        <div className="p-8 overflow-auto h-full">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="card bg-base-100 shadow-xl cursor-pointer group"
                onClick={() => setShowGrid(false)}
              >
                <figure className="relative h-64 overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </figure>
                <div className="card-body p-4">
                  <h3 className="card-title text-sm">{img.alt}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
          <motion.div
            animate={controls}
            onUpdate={handleUpdate}
            style={{
              transform: transform,
              rotateY: rotation,
              width: cylinderWidth,
              transformStyle: "preserve-3d",
            }}
            className="flex min-h-[300px] items-center justify-center [transform-style:preserve-3d]"
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="absolute flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
                style={{
                  width: `${faceWidth}px`,
                  transform: `rotateY(${
                    (360 / faceCount) * i
                  }deg) translateZ(${radius}px)`,
                }}
              >
                <motion.img
                  src={img.src}
                  alt={img.alt}
                  className="h-[250px] w-[400px] rounded-xl object-cover shadow-2xl sm:h-[200px] sm:w-[350px]"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
};

const Gallery = () => {
  const galleryImages = [
    {
      src: "/images/1.png",
      alt: "Therapy session",
    },
    {
      src: "/images/2.png",
      alt: "Clinic interior",
    },
    {
      src: "/images/3.png",
      alt: "Camp activity",
    },
    {
      src: "/images/4.jpg",
      alt: "Equipment in use",
    },
    {
      src: "/images/5.jpg",
      alt: "Group session",
    },
    {
      src: "/images/6.jpg",
      alt: "Outdoor therapy",
    },
    {
      src: "/images/7.jpg",
      alt: "Consultation room",
    },
    {
      src: "/images/8.jpg",
      alt: "Relaxation area",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Our Gallery</h2>
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
          Explore moments from our therapy sessions, clinic spaces, and special
          events
        </p>
      </div>
      Coming Soon...
      {/* <RollingGallery images={galleryImages} /> */}
    </div>
  );
};

export default Gallery;
