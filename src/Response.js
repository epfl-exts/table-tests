function Prediction() {
    const { prediction, ref, setPrediction } = useContext(ControlsContext);
  
    const [num1, num2] = question;
    const answer = num1 * num2;
    const { wins, losses } = points;
  
    return (
      <div className="response">
        <h2>Did you mean {prediction}?</h2>
        <div>
          <button
            className="btn-yes"
            onClick={() => {
              const [num1, num2] = useRandomNumbers();
              setQuestion([num1, num2]);
  
              if (prediction === answer) {
                setPoints({ losses, wins: wins + 1 });
              } else {
                setPoints({ losses: losses + 1, wins });
              }
  
              setPrediction(null);
              ref.current
                .getContext("2d")
                .clearRect(0, 0, ref.current.width, ref.current.height);
            }}
          >
            Yes
          </button>
          <button
            className="btn-no"
            onClick={() => {
              setPrediction(null);
              ref.current
                .getContext("2d")
                .clearRect(0, 0, ref.current.width, ref.current.height);
            }}
          >
            No
          </button>
        </div>
      </div>
    );
  }
  
  function WinLose() {
    const margin = Math.abs(wins - losses);
    const score = `By ${margin} ${margin === 1 ? "point" : "points"}.`;
  
    const reset = (
      <button
        className="btn-yes"
        onClick={() => {
          // reset the points
          setPoints({ losses: 0, wins: 0 });
          // clear the canvas
          ref.current
            .getContext("2d")
            .clearRect(0, 0, ref.current.width, ref.current.height);
        }}
      >
        Play again!
      </button>
    );
  
    // if (losses + wins === rounds && losses < wins) {
    //   <div className="response">
    //   <h1>
    //     You lose...
    //     <br />
    //     {score}
    //   </h1>
    //   {reset}
    // </div>
  
    return (
      <div className="response">
        <h1>
          You win!
          <br />
          {score}
        </h1>
        {reset}
      </div>
    );
  }
  