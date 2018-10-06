class canvasObj {
  constructor(x,y,r) {
    this.X = x;
    this.Y = y;
    this.radius = r;
  }
}

class circleCorner extends canvasObj {
  constructor(x,y,r) {
    super(x,y,r);
    this.angle = 90;
    this.speed = -.01;
    this.pointOnCX = 0;
    this.pointOnCY = 0;
    this.isHorizontal = true;
    this.circleOutlineColor = '#003300';
    this.circleDotColor = '#000000';
    this.circleDotRadius = 5;
    this.circleDotLine = 2;
    this.projLineColor = 'rgba(42,23,42,.2)';
    this.projLineWidth = 1;
  }

  set setIsHorizontal(newVal) {
    this.isHorizontal = newVal;
  }

  set setAngle(newAngle) {
    this.angle = newAngle;
  }

  get getAngle() {
    return this.angle;
  }

  draw() {
    this.pointOnCX = this.X + this.radius * Math.sin(this.angle);
    this.pointOnCY = this.Y + this.radius * Math.cos(this.angle);
    this.angle = this.angle + this.speed;

    // Outline Circle
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = this.circleOutlineColor;
    ctx.arc(this.X, this.Y, this.radius, 0, 2 * Math.PI, false);
    ctx.stroke();

    // Dot on the Circle outline
    ctx.beginPath();
    ctx.lineWidth = this.circleDotLine;
    ctx.strokeStyle = this.circleDotColor;
    ctx.arc(this.pointOnCX, this.pointOnCY, this.circleDotRadius , 0, 2 * Math.PI, false);
    ctx.fillStyle = this.circleDotColor;
    ctx.fill();
    ctx.stroke();

    // projected line to the other side
    ctx.beginPath();
    ctx.strokeStyle = this.projLineColor;
    ctx.lineWidth = this.projLineWidth;
    ctx.moveTo(this.pointOnCX,this.pointOnCY);
    if(this.isHorizontal) {
      ctx.lineTo(this.pointOnCX,HEIGHT);
    } else {
      ctx.lineTo(WIDTH,this.pointOnCY);
    }
    ctx.stroke();
  };
}


class littleCanvas extends canvasObj {
  constructor(x,y,r) {
    super(x,y,r);
    this.extAxesObjX = {};
    this.extAxesObjY = {};
    this.dotLineList = [];
    this.boxOutlineColor = "rgba(42,42,42,0.5)";
    this.boxOutlineStroke = 1;
    this.dotDotColor = 42;
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.boxOutlineColor;
    ctx.lineWidth = this.boxOutlineStroke;
    let x1 = this.X-(this.radius/2);
    let y1 = this.Y-(this.radius/2);
    
    ctx.strokeRect(x1, y1, this.radius, this.radius);
    ctx.stroke();

    // draw to the persisted buffer and copy the hole canvas 
    // so this is always under the other both path()
    BUFFER.beginPath();
    BUFFER.arc(this.extAxesObjX.pointOnCX,this.extAxesObjY.pointOnCY,1,2 * Math.PI, false);
    BUFFER.stroke(); 

    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = "1";
    ctx.arc(this.extAxesObjX.pointOnCX,this.extAxesObjY.pointOnCY , 5 ,2 * Math.PI, false);
    ctx.stroke();
  }
}

class infoText extends canvasObj {
  constructor(x,y,r) {
    super(x,y,r);
    
    this.mainFontSize = Math.floor(this.radius/2);
    this.subFontSize = Math.floor(this.radius/Math.PI);
    this.miniFontSize = Math.floor(this.radius/(Math.P2*2));


    this.font = `bold ${this.mainFontSize}px serif`;
    this.subFont = `italic ${this.subFontSize}px serif`;
    // this.gridText = '';
    // this.pointCountObj = {};
  }

  draw() {
    ctx.font = this.font;
    // ctx.fillText(this.gridText, this.X-(this.radius*.9), this.Y-(this.radius*.9));
    // let pCount = this.pointCountObj.dotLineList.length;
    // let sumPointCount = pCount * this.gridText;
    // ctx.fillText(pCount, this.X-this.radius, this.Y - (this.radius*.2));
    
    // ctx.fillText(sumPointCount, this.X-this.radius, this.Y + (this.radius*.9));
    // ctx.font = 'italic 16px serif';
    // ctx.fillText("Point/p", this.X-this.radius, this.Y - (this.radius*.7));

    // ctx.fillText("Sum Points", this.X-this.radius, this.Y + (this.radius*.5));
    
    ctx.fillText("FPS", this.mainFontSize*1.5, this.mainFontSize);
    ctx.fillText(FPS, this.mainFontSize*1.9, this.Y - (this.radius*.2));
    
    ctx.font = this.subFont;
    ctx.fillStyle = 'yellow';
    ctx.fillText(MINFPS, this.X - this.radius , this.Y );
    ctx.fillStyle = 'green';
    ctx.fillText(MAXFPS, this.X+(this.radius/2), this.Y );

  }
}