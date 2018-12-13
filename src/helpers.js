import * as tf from "@tensorflow/tfjs";

// //-----------------------------------------------
// // preprocess the canvas to be CNN friendly
// //-----------------------------------------------
function preprocessCanvas(canvas) {
  // resize the input image to CNN's target size of (1, 28, 28)
  let tensor = tf
    .fromPixels(canvas)
    .resizeNearestNeighbor([28, 28])
    .mean(2)
    .expandDims(2)
    .expandDims()
    .toFloat();
  return tensor.div(255.0);
}

async function predict(canvas, model) {
  // preprocess canvas
  const tensor = preprocessCanvas(canvas);
  // make predictions on the preprocessed image tensor
  const predictions = await model.then(result => result.predict(tensor).data());

  // get the model's prediction results
  const results = Array.from(predictions);

  return results;
}

function indexOfMax(arr) {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}

export { predict };
