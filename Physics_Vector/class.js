class Mover { // noun
  // properties - adjectives
  //   radius
  //   velocity (dx,dy)
  //   position (x,y)
  //   color
  // behaviors - verb
  //   move
  //   draw
  //   collide/bounce
  
  // initialize all the properties
  constructor(x,y,dx,dy,r,c) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.r = r
    this.c = c
  }
  
  update() {
    this.applyGravity()
    this.applyWind()
    this.move()
    this.containWithinWindow()
    this.draw()     
  }
  
  draw() {
    fill(this.c)
    circle(this.x,this.y,this.r)
  }
  
  move() {
    this.x += this.dx
    this.y += this.dy
  }
  
  applyGravity() {
    this.dy += G
  }
  
  applyWind() {
    this.dx += wind
  }
  
  containWithinWindow() {
    if( this.x < this.r ) { // moved off the left hand side
      this.x = this.r
      this.dx *= -0.9
    }
    if( this.x > width - this.r ) { // right
      this.x = width-this.r
      this.dx *= -0.9
    }
    if( this.y < this.r ) { // top
      this.y = this.r
      this.dy *= -0.9
    }
    if( this.y > height - this.r ) { // bottom
      this.y = height-this.r
      this.dy *= -0.9
    }    
      
  }
  
  checkCollision(other) {
    let xDiff = other.x - this.x
    let yDiff = other.y - this.y
    let distance = sqrt(xDiff * xDiff + yDiff * yDiff)
    let minDist = this.r + other.r

    if (distance < minDist) {
      // Push circles apart slightly to avoid stacking together
      let overlap = (minDist - distance) / 2
      let pushX = (xDiff / distance) * overlap
      let pushY = (yDiff / distance) * overlap

      this.x -= pushX
      this.y -= pushY
      other.x += pushX
      other.y += pushY

      // Decide which axis the collision happened on
      if (abs(xDiff) > abs(yDiff)) {
        // x axis collision, bounce horizontally
        this.dx *= -0.9
        other.dx *= -0.9
      } else {
        // y axis collision, bounce vertically
        this.dy *= -0.9
        other.dy *= -0.9
      }
    }
  }
  
  attractTo(hole) {
    let dx = hole.x - this.x
    let dy = hole.y - this.y
    let distanceSq = dx * dx + dy * dy
    let distance = sqrt(distanceSq)
    let limitDistance = max(distance, 10) // if the distance ever becomes 0, the ball might just disappear
    let force = hole.strength / (limitDistance * limitDistance) // inverse square law, so farther = less force
    
    this.dx += (dx / limitDistance) * force
    this.dy += (dy / limitDistance) * force
    
    
  }

}