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
    this.position = createVector(x,y)
    this.velocity = createVector(dx,dy)
    this.acceleration = createVector(0,0)
    this.r = r
    this.c = c
  }
  
  update() {
    this.applyForce(createVector(wind,G))
    this.velocity.add(this.acceleration)
    this.move()
    this.containWithinWindow()
    this.draw()     
    this.acceleration.mult(0)
  }
  
  draw() {
    fill(this.c)
    circle(this.position.x,this.position.y,this.r)
  }
  
  move() {
    this.position.add(this.velocity)
  }
  
  applyForce(f) {
    this.acceleration.add(f)
  }
  
  containWithinWindow() {
    if( this.position.x < this.r ) { // moved off the left hand side
      this.position.x = this.r
      this.velocity.x *= -0.9
    }
    if( this.position.x > width - this.r ) { // right
      this.position.x = width-this.r
      this.velocity.x *= -0.9
    }
    if( this.position.y < this.r ) { // top
      this.position.y = this.r
      this.velocity.y *= -0.9
    }
    if( this.position.y > height - this.r ) { // bottom
      this.position.y = height-this.r
      this.velocity.y *= -0.9
    }    
      
  }
  
  checkCollision(other) {
    let diff = p5.Vector.sub(other.position, this.position)
    let distance = diff.mag()
    let minDist = this.r + other.r

    if (distance < minDist) {
      // Push circles apart slightly to avoid stacking together
      let overlap = (minDist - distance) / 2
      let correction = diff.copy().setMag(overlap)
      this.position.sub(correction)
      other.position.add(correction)

      // Decide which axis the collision happened on
      if (abs(diff.x) > abs(diff.y)) {
        // x axis collision, bounce horizontally
        this.velocity.x *= -0.9
        other.velocity.x *= -0.9
      } else {
        // y axis collision, bounce vertically
        this.velocity.y *= -0.9
        other.velocity.y *= -0.9
      }
    }
  }

  attractTo(hole) {
    let force = createVector(hole.x, hole.y).sub(this.position)
    let distanceSq = constrain(force.magSq(), 100, 10000)
    let strength = hole.strength / distanceSq
    force.setMag(strength)
    this.applyForce(force)
  }

}
