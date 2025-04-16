let colorlist = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']

let movers = []
let G = 0.1
let wind 
let blackHoles = []

function setup() {
  createCanvas(400, 400);
  for( let i = 0; i < 10; i++ ) {
    movers.push( 
      new Mover(random(width),random(height),random(-1,1),random(-1,1),10,random(colorlist))
    )  
  }
  wind = random(-0.2,0.2)
  ellipseMode(RADIUS)
}

function draw() {
  background(220);
  for( let mover of movers ) {
    // mover.mouseClicked()
    mover.update()
  }
  for (let i = 0; i < movers.length; i++) {
    for (let j = i + 1; j < movers.length; j++) {
      movers[i].checkCollision(movers[j])
    }
  }

  createBlackHole()
  
  drawLegend()
}

function drawLegend() {
  // Wind Speed
  fill(0)
  text(`Wind: ${wind.toFixed(4)}`, 50, 50)
}


function createBlackHole() {
  for (let hole of blackHoles) {
    for (let mover of movers) {
      mover.attractTo(hole)
    }
    
    fill(0)
    noStroke()
    circle(hole.x, hole.y, 15)
  }
}

function mouseClicked() {  
  blackHoles.push({
    x: mouseX,
    y: mouseY,
    strength: random(100,1000)
  })
}

function keyPressed() {
  if (key === ' ') {
    wind += 2 * -wind
  }
}
