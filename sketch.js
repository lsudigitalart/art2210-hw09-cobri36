let car1, car2, car3, car4;
let raceStarted = false;
let countdown = 3;
let raceOver = false;
let car1Speed, car2Speed, car3Speed, car4Speed;
let displayWinnerFlag = false; // Flag to control winner text display
let winnerText = ""; // Store the winner text
let finishLineX;

function setup()
{
    createCanvas(800, 400);
    car1 = new Car(50, 100, color(255, 105, 180)); // Pink car
    car2 = new Car(50, 150, color(173, 216, 230)); // Blue car
    car3 = new Car(50, 200, color(193, 205, 193)); // Green car
    car4 = new Car(50, 250, color(255, 165, 0)); // Gold car
    frameRate(30); // 
    finishLineX = width - 100; // Finish Line Position
}

function draw()
{
    drawRoad(); //road
  if (!raceStarted) 
  {
    drawCountdown(); //countdown
  } 
  else if (raceStarted && !raceOver) 
  {
    moveCars();
    checkRaceStatus();
  }
  if (displayWinnerFlag) //display winner text
  {
    displayWinnerText();
  }

  if (raceOver && mouseIsPressed) //reset race if clicked
  {
    resetRace();
  }
}

function drawRoad() {
    background(50); // dark grey road
    // finish line appears after countdown
    if (raceStarted) {
      drawCheckeredFinishLine(finishLineX, 0, width - finishLineX, height);
    }
  }

  function drawCheckeredFinishLine(x, y, w, h) 
  {
    let squareSize = 20; // square size in finish line
    for (let i = x; i < x + w; i += squareSize) {
      for (let j = y; j < y + h; j += squareSize) {
        if ((Math.floor((i / squareSize) + (j / squareSize)) % 2) === 0) {
          fill(255); // White square
        } 
        else 
        {
          fill(0); // Black square
        }
        noStroke();
        rect(i, j, squareSize, squareSize); // Draw each square
      }
    }
  }

  function drawCountdown() 
  {
    fill(255, 215, 0); // Gold color for the countdown and words
    textSize(100); // Larger countdown text size
    textStyle(BOLD); // Bold text
    textAlign(CENTER, CENTER);
    text(countdown, width / 2, height / 2);
  
    // Countdown logic (sped up to appear every half-second)
    if (frameCount % 30 === 0 && countdown > 0) {
      countdown--;
    } else if (countdown === 0) {
      raceStarted = true;
      initializeCarSpeeds();
    }
  }

  function initializeCarSpeeds() 
  {
    car1Speed = random(2, 5);
    car2Speed = random(2, 5);
    car3Speed = random(2, 5);
    car4Speed = random(2, 5);
  }

  function moveCars() 
  {
    car1.move(car1Speed);
    car2.move(car2Speed);
    car3.move(car3Speed);
    car4.move(car4Speed);
  
    // Display the cars
    car1.show();
    car2.show();
    car3.show();
    car4.show();
  }  

  function checkRaceStatus() //check to see if any car crossed finish line
  {
    if (car1.x > finishLineX || car2.x > finishLineX || car3.x > finishLineX || car4.x > finishLineX) {
      raceOver = true;
      winnerText = getWinnerText(); // Set the winner text
      displayWinnerFlag = true; // Enable winner text display
    }
  }

  function displayWinnerText() //display winner text when race is over
  {
    noStroke();
    fill(255, 215, 0); // Gold color for winner text
    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("Race Over!", width / 2, height / 2 - 50);
    text(winnerText, width / 2, height / 2);
  }

  function getWinnerText() {
    if (car1.x > finishLineX) {
      return "Pink Car Wins!";
    } else if (car2.x > finishLineX) {
      return "Light Blue Car Wins!";
    } else if (car3.x > finishLineX) {
      return "Sage Green Car Wins!";
    } else if (car4.x > finishLineX) {
      return "Yellow-Orange Car Wins!";
    }
  }

  //car prop and behaviors
  class Car 
  {
    constructor(x, y, col) 
    {
      this.x = x;
      this.y = y;
      this.col = col;
      this.width = 90; // Car width
      this.height = 40; // Car height
      this.wheelRadius = 10; // Wheel size
    }
  
    show() 
    {
      // car body
      fill(this.col);
      noStroke();
      rect(this.x, this.y, this.width, this.height, 12); //rounding of car corners
  
      // Car windows
      fill(255);
      rect(this.x + 15, this.y + 10, this.width - 30, this.height - 20, 6); //window corners
  
      // wheels
      fill(0);
      ellipse(this.x + 20, this.y + this.height, this.wheelRadius * 2, this.wheelRadius * 2); // front wheel
      ellipse(this.x + this.width - 20, this.y + this.height, this.wheelRadius * 2, this.wheelRadius * 2); // back wheel
    }
  
    move(speed) {
      this.x += speed; // Move the car based on its speed
    }
  }
  
  // reset race
  function resetRace() {
    car1.x = 50;
    car2.x = 50;
    car3.x = 50;
    car4.x = 50;
    countdown = 3;
    raceStarted = false;
    raceOver = false;
    displayWinnerFlag = false; // reset winner text flag
    winnerText = ""; // reet winner text
  }