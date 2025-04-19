import "./app.css";
import { useCallback, useMemo, useRef, useEffect } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";

function App() {
  const ref = useRef(null);
  const ref2 = useRef(null);
  console.log(window.outerWidth);
  const canvasWidth = window.document.body.clientWidth - 3;
  console.log(canvasWidth);
  let canvasHeight = window.innerHeight - 3;
  // canvasHeight = (canvasWidth / 16) * 8;

  const { scrollYProgress } = useScroll({
    target: ref2,
    offset: ["start start", "end end"],
  });
  const images = useMemo(() => {
    const loadedImages = [];
    for (let i = 1; i <= 1920; i++) {
      const img = new Image();
      img.src = `/images/${i}.webp`;
      img.classList.add("image");
      var ratio = img.naturalWidth / img.naturalHeight;
      loadedImages.push(img);
    }
    return loadedImages;
  }, []);
  const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 1920]);
  useEffect(() => {
    const canvas = ref.current;
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // canvas.getContext("2d").
        // Additional canvas operations can be performed here
      }
    };

    resizeCanvas(); // Set initial size
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas); // Clean up
  }, []);

  const render = useCallback(
    (index) => {
      const canvas = ref.current;
      const img = images[index - 1];
      var hRatio = canvas.width / img.width;
      var vRatio = canvas.height / img.height;
      var ratio = Math.min(hRatio, vRatio);
      // var centerShift_x = (canvas.width - img.width * ratio) / 2;
      // var centerShift_y = (canvas.height - img.height * ratio) / 2;
      if (img) {
        // ref.current
        //   ?.getContext("2d")
        //   .clearRect(0, 0, canvas.width, canvas.height);
        // ref.current
        //   ?.getContext("2d")
        //   .drawImage(
        //     img,
        //     0,
        //     0,
        //     img.width,
        //     img.height,
        //     centerShift_x,
        //     centerShift_y,
        //     img.width * ratio,
        //     img.height * ratio
        //   );

        ref.current?.getContext("2d")?.drawImage(
          img,
          0,
          0,
          canvasWidth,
          canvasHeight
          // 0,
          // 0,
          // img.width * ratio,
          // img.height * ratio
        );
      }
    },
    [images]
  );

  useMotionValueEvent(currentIndex, "change", (latest) => {
    render(Number(latest.toFixed()));
  });
  return (
    <div
      style={{
        height: "7000px",
        background: "black",
        display: "flex",
        overflow: "scroll !important",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div style={{ height: "200px" }} />
      <div className="canvas-container" ref={ref2}>
        <canvas
          style={{
            position: "sticky",
            top: "0px",
          }}
          ref={ref}
        ></canvas>
      </div>
      ;
    </div>
  );
}

export default App;
