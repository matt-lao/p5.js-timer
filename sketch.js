let startTime;
let timerIsRunning = false;
let backgroundColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(0, 100, 0); // Green

  startButton = createButton('Start Timer');
  resetButton = createButton('Reset Timer');

  customizeButton(startButton, backgroundColor);
  customizeButton(resetButton, backgroundColor);

  startButton.position(width / 2 - startButton.width / 2 - 110, height / 1.5);
  resetButton.position(width / 2 - resetButton.width / 2 + 30, height / 1.5);

  startButton.mousePressed(startTimer);
  resetButton.mousePressed(resetTimer);
}

function customizeButton(button, buttonColor) {
  // Adjust the RGB values to make the color a little lighter
  let lighterColor = color(
    red(buttonColor) + 50,
    green(buttonColor) + 50,
    blue(buttonColor) + 50
  );

  button.style('background-color', lighterColor.toString()); // Convert color to string
  button.style('color', 'white');
  button.style('padding', '10px 20px');
  button.style('font-size', '16px');
  button.style('border', 'none');
  button.style('text-align', 'center');
  button.style('text-decoration', 'none');
  button.style('display', 'inline-block');
  button.style('margin', '4px 2px');
  button.style('cursor', 'pointer');
}

function draw() {
  background(backgroundColor);

  if (timerIsRunning) {
    let elapsedTime = millis() - startTime;

    let elapsedHours = Math.floor(elapsedTime / 3600000);
    let elapsedMinutes = Math.floor((elapsedTime % 3600000) / 60000);
    let elapsedSeconds = Math.floor((elapsedTime % 60000) / 1000);

    textAlign(CENTER, CENTER);
    textSize(200);

    // flash if above 12 minutes
    let isVisible = elapsedMinutes < 12 || (elapsedMinutes >= 12 && frameCount % 60 < 30);
    if (isVisible) {
      fill(255);
    } else {
      noFill();
    }

    text(nf(elapsedHours, 2) + ':' + nf(elapsedMinutes, 2) + ':' + nf(elapsedSeconds, 2), width / 2, height / 2);

    if (elapsedMinutes >= 8 && elapsedMinutes < 10) {
      backgroundColor = color(255, 191, 0); // Yellow
      customizeButton(startButton, backgroundColor);
      customizeButton(resetButton, backgroundColor);
    } else if (elapsedMinutes >= 10) {
      backgroundColor = color(220, 166, 0); // Red
      customizeButton(startButton, backgroundColor);
      customizeButton(resetButton, backgroundColor);
    }
  }
}

function startTimer() {
  if (!timerIsRunning) {
    startTime = millis();
    timerIsRunning = true;
  }
}

function resetTimer() {
  timerIsRunning = false;
  backgroundColor = color(0, 100, 0); // Green
  customizeButton(startButton, backgroundColor);
  customizeButton(resetButton, backgroundColor);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  startButton.position(width / 2 - startButton.width / 2 - 70, height / 1.5);
  resetButton.position(width / 2 - resetButton.width / 2 + 70, height / 1.5);
}