import React, { useContext, useEffect, useState } from "react";
import { useActive, useMousePosition } from "use-events";
import { ControlsContext } from "./Controls.js";

const Answer = React.forwardRef(() => {
  const { ref } = useContext(ControlsContext);
  const [isActive, bindActive] = useActive();
  const [x, y, bindMousePosition] = useMousePosition();
  const [lastX, setLastX] = useState();
  const [lastY, setLastY] = useState();

  useEffect(() => {
    const ctx = ref.current.getContext("2d");

    function drawLine() {
      ctx.beginPath();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 12;
      ctx.lineJoin = "round";
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
    }

    isActive && drawLine();

    setLastX(x);
    setLastY(y);

    return null;
  });

  return (
    <div className="answer-wrapper">
      <div>
        <canvas
          {...bindActive}
          {...bindMousePosition}
          height={320}
          ref={ref}
          width={320}
        />
      </div>
    </div>
  );
});

export default Answer;
