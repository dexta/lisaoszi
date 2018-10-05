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

  manageList (x,y) {
    BUFFER.beginPath();
    BUFFER.arc(y,x,1,2 * Math.PI, false);
    BUFFER.stroke();
    // const archiveImage = BUFFER.getImageData(this.X-(this.radius/2),this.Y-(this.radius/2),this.radius, this.radius);
    // ctx.putImageData(archiveImage,this.X-(this.radius/2),this.Y-(this.radius/2));
    // let dLen = this.dotLineList.length;
    // if(dLen>1500) {
    //   console.log("collect your carbage");
    //   this.dotLineList = this.dotLineList.slice(100);
    //   let oldLen = dLen;
    //   dLen = this.dotLineList.length;
    //   console.log(`Length before ${oldLen} and after ${dLen}`);
      
    // }
    // this.dotLineList.push([Math.floor(y),Math.floor(x)]);
    // let canvasData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    // ctx.beginPath();
    // for(let d=0;d<=dLen;d++) {
    //   ctx.arc(this.dotLineList[d][0],this.dotLineList[d][1],1,2 * Math.PI, false);
      // let ty = Math.floor(this.dotLineList[d][0]);
      // let tx = Math.floor(this.dotLineList[d][1]);
      // let index = (ty + tx * WIDTH ) * 4;
      // canvasData.data[index + 0] = this.dotDotColor;
      // canvasData.data[index + 1] = this.dotDotColor;
      // canvasData.data[index + 2] = this.dotDotColor;
      // canvasData.data[index + 3] = 255; // alpha channel

    // }
    // ctx.stroke();
    // ctx.putImageData(canvasData, 0, 0);
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.boxOutlineColor;
    ctx.lineWidth = this.boxOutlineStroke;
    let x1 = this.X-(this.radius/2);
    let y1 = this.Y-(this.radius/2);
    
    ctx.strokeRect(x1, y1, this.radius, this.radius);
    ctx.stroke();

    this.manageList(this.extAxesObjY.pointOnCY,this.extAxesObjX.pointOnCX);
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = "1";
    ctx.arc(this.extAxesObjX.pointOnCX,this.extAxesObjY.pointOnCY , 5 ,2 * Math.PI, false)
    ctx.stroke();
  }
}

class infoText extends canvasObj {
  constructor(x,y,r) {
    super(x,y,r);
    this.font = 'bold 23px serif';
    this.gridText = '';
    this.pointCountObj = {};

  }

  draw() {
    ctx.font = this.font;
    // ctx.fillText(this.gridText, this.X-(this.radius*.9), this.Y-(this.radius*.9));
    let pCount = this.pointCountObj.dotLineList.length;
    let sumPointCount = pCount * this.gridText;
    ctx.fillText(pCount, this.X-this.radius, this.Y - (this.radius*.2));
    ctx.fillText(FPS, this.X+(this.radius*.2), this.Y - (this.radius*.2));
    ctx.fillText(sumPointCount, this.X-this.radius, this.Y + (this.radius*.9));
    ctx.font = 'italic 16px serif';
    ctx.fillText("Point/p", this.X-this.radius, this.Y - (this.radius*.7));
    ctx.fillText("FPS", this.X+(this.radius*.2), this.Y - (this.radius*.7));
    ctx.fillText("Sum Points", this.X-this.radius, this.Y + (this.radius*.5));
    ctx.font = 'italic 14px serif';
    ctx.fillStyle = 'yellow';
    ctx.fillText(MINFPS, this.X+(this.radius*.01), this.Y + (this.radius*.1));
    ctx.fillStyle = 'green';
    ctx.fillText(MAXFPS, this.X+(this.radius*.6), this.Y + (this.radius*.1));
  }
}