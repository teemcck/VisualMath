let a = 0; // Start of interval
let b = 5; // End of interval
let numRectangles = 10; // Number of rectangles for Riemann Sum approximation

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(255);
  
  // Draw axes
  stroke(0);
  line(50, height - 50, width - 50, height - 50); // x-axis
  line(50, height - 50, 50, 50); // y-axis
  
  // Scale for mapping mathematical coordinates to screen
  let scaleX = (width - 100) / (b - a);
  let scaleY = (height - 100) / (b * b);

  // Draw the function f(x) = x^2
  stroke(0, 100, 255);
  beginShape();
  for (let x = a; x <= b; x += 0.01) {
    let screenX = 50 + (x - a) * scaleX;
    let screenY = height - 50 - (x * x) * scaleY;
    vertex(screenX, screenY);
  }
  endShape();

  // Draw Riemann sum rectangles
  fill(100, 200, 100, 150);
  for (let i = 0; i < numRectangles; i++) {
    let xLeft = a + i * (b - a) / numRectangles;
    let xRight = a + (i + 1) * (b - a) / numRectangles;
    
    // Calculate function value at xLeft
    let yHeight = xLeft * xLeft;
    
    // Scale the dimensions to screen coordinates
    let screenXLeft = 50 + (xLeft - a) * scaleX;
    let screenXRight = 50 + (xRight - a) * scaleX;
    let screenYBottom = height - 50;
    let screenYTop = screenYBottom - yHeight * scaleY;
    
    rect(screenXLeft, screenYTop, screenXRight - screenXLeft, screenYBottom - screenYTop);
  }

  // Display info
  fill(0);
  textSize(16);
  text(`Riemann sum approximation with ${numRectangles} rectangles`, 10, 20);
  text(`Function: f(x) = x^2`, 10, 40);
  text(`Interval: [${a}, ${b}]`, 10, 60);
  text(`Adjust the number of rectangles using UP/DOWN arrows.`, 10, 80);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    numRectangles += 1; // Increase number of rectangles
  } else if (keyCode === DOWN_ARROW && numRectangles > 1) {
    numRectangles -= 1; // Decrease number of rectangles
  }
}
