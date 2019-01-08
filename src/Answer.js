import React, { useContext, useEffect } from "react";
import { ControlsContext } from "./Controls.js";

const Answer = React.forwardRef(() => {
  const { ref } = useContext(ControlsContext);
  let ctx;
  let mouseDown = false;
  let lastX;
  let lastY;

  function drawLine(x, y, lastX, lastY) {
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
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
    ctx = ref.current.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 320,320)
    return null;
  });

  return (
    <div className="answer-wrapper">
      <div>
        <canvas
          onMouseDown={() => (mouseDown = true)}
          onMouseMove={e => handleMouseMove(e)}
          onMouseUp={() => {
            mouseDown = false;
            [lastX, lastY] = [undefined, undefined];
          }}
          height={320}
          ref={ref}
          width={320}
        />
      </div>
    </div>
  );
});

export default Answer;
