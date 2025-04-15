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
      this.velocity.mult(-1,1)
    }
    if( this.position.x > width - this.r ) { // right
      this.position.x = width-this.r
      this.velocity.mult(-1,1)
    }
    if( this.position.y < this.r ) { // top
      this.position.y = this.r
      this.velocity.mult(1,-1)
    }
    if( this.position.y > height - this.r ) { // bottom
      this.position.y = height-this.r
      this.velocity.mult(1,-1)
    }    
      
  }
}
