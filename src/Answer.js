import React, { useContext, useEffect } from "react";
import { RoundContext } from "./Round.js";

const Answer = React.forwardRef(() => {
  const { ref } = useContext(RoundContext);
  let ctx;
  let mouseDown = false;
  let lastX;
  let lastY;

  function drawLine(x, y, lastX, lastY) {
    ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 12;
    ctx.lineJoin = "round";
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();

    return [x, y];
  }

  function handleMouseMove(event) {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (mouseDown) {
      [lastX, lastY] = drawLine(x, y, lastX, lastY);
    }
  }

  useEffect(() => {
    const canvas = ref.current;
    const scale = canvas.width / canvas.offsetWidth;
    const reverseScale = canvas.offsetWidth / canvas.width;

    ctx = canvas.getContext("2d");

    ctx.scale(scale, scale);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.height, canvas.width);

    return () => ctx.scale(reverseScale, reverseScale);
  });

  return (
    <div className="canvas-wrapper">
      <canvas
        onMouseDown={() => (mouseDown = true)}
        onMouseMove={e => handleMouseMove(e)}
        onMouseUp={() => {
          mouseDown = false;
          [lastX, lastY] = [undefined, undefined];
        }}
        height={500}
        ref={ref}
        width={500}
      />
    </div>
  );
});

export default Answer;
