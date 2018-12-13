import React, { useEffect, useState } from "react";
import { useActive, useMousePosition } from "use-events";

const Answer = React.forwardRef((props, ref) => {
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
    <canvas
      {...bindActive}
      {...bindMousePosition}
      className="answer-wrapper"
      height={150}
      ref={ref}
      width={150}
    >
      {isActive ? "clicking" : "not clicking"}
      {x} - {y}
    </canvas>
  );
});

export default Answer;
