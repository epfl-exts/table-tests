import * as tf from "@tensorflow/tfjs";

// //-----------------------------------------------
// // preprocess the canvas to be CNN friendly
// //-----------------------------------------------
function preprocessCanvas(canvas) {
  let tensor = tf
    .browser.fromPixels(canvas) // Shape: (300, 300, 3) - RGB image
    .resizeNearestNeighbor([28, 28]) // Shape: (28, 28, 3) - RGB image
    .mean(2) // Shape: (28, 28) - grayscale
    .expandDims(2) // Shape: (28, 28, 1) - network expects 3d values with channels in the last dimension
    .expandDims() // Shape: (1, 28, 28, 1) - network makes predictions for "batches" of images
    .toFloat(); // Network works with floating points inputs
  return tensor.div(255.0); // Normalize [0..255] values into [0..1] range
}

async function predict(canvas, model) {
  // preprocess canvas
  const tensor = preprocessCanvas(canvas);
  // make predictions on the preprocessed image tensor
  const predictions = await model.then(result => result.predict(tensor).data());

  // get the model's prediction results
  const results = Array.from(predictions);

  return indexOfMax(results).toString();
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
