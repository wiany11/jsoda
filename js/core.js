
var mousedown = false;
var x1 = -1;
var y1 = -1;
var x2 = -1;
var y2 = -1;
var clickedArea = {box: -1, pos:'o'};
document.getElementById("jsoda-canvas").onmousedown = function(e) {
  mousedown = true;
  clickedArea = findCurrentArea(e.offsetX, e.offsetY);
  x1 = e.offsetX;
  y1 = e.offsetY;
  x2 = e.offsetX;
  y2 = e.offsetY;
};
document.getElementById("jsoda-canvas").onmouseup = function onmouseupEvent(e) {
  // if (clickedArea.box == -1) {
  //   if (tmpBox != null) {
  //     boxes.push(tmpBox);
  //   }
  // }
  mousedown = false;
  clickedArea = {box: -1, pos:'o'};
  tmpBox = null;
  // console.log(boxes);
};
document.getElementById("jsoda-canvas").onmouseout = function onmouseupEvent(e) {
  mousedown = false;
  clickedArea = {box: -1, pos:'o'};
  tmpBox = null;
};
document.getElementById("jsoda-canvas").onmousemove = function(e) {
  if (mousedown && clickedArea.box == -1) {
    // x2 = e.offsetX;
    // y2 = e.offsetY;
    // redraw();
  } else if (mousedown && clickedArea.box != -1) {
    x2 = e.offsetX;
    y2 = e.offsetY;
    xOffset = adjustXOffset();
    yOffset = adjustYOffset();
    x1 = x2;
    y1 = y2;


    if (clickedArea.pos == 'i'  ||
        clickedArea.pos == 'tl' ||
        clickedArea.pos == 'l'  ||
        clickedArea.pos == 'bl') {
      boxes[clickedArea.box].x1 += xOffset;
    }
    if (clickedArea.pos == 'i'  ||
        clickedArea.pos == 'tl' ||
        clickedArea.pos == 't'  ||
        clickedArea.pos == 'tr') {
      boxes[clickedArea.box].y1 += yOffset;
    }
    if (clickedArea.pos == 'i'  ||
        clickedArea.pos == 'tr' ||
        clickedArea.pos == 'r'  ||
        clickedArea.pos == 'br') {
      boxes[clickedArea.box].x2 += xOffset;
    }
    if (clickedArea.pos == 'i'  ||
        clickedArea.pos == 'bl' ||
        clickedArea.pos == 'b'  ||
        clickedArea.pos == 'br') {
      boxes[clickedArea.box].y2 += yOffset;
    }
    redraw();
  } else {
    //
  }
}

function adjustXOffset() {
  var xOffset = x2 - x1;
  var selectedBox = boxes[clickedArea.box];
  if (xOffset < 0) {
    if (clickedArea.pos == 'i'  ||
        clickedArea.pos == 'tl' ||
        clickedArea.pos == 'l'  ||
        clickedArea.pos == 'bl' ) {
      if (selectedBox.x1 + xOffset < 0) {
        xOffset = selectedBox.x1;
      }
    } else if (clickedArea.pos == 'tr' ||
               clickedArea.pos == 'r'  ||
               clickedArea.pos == 'br') {
      if (selectedBox.x2 + xOffset < selectedBox.x1 + 2 * lineOffset) {
        xOffset = selectedBox.x1 + 2 * lineOffset - selectedBox.x2;
      }
    }
  } else {
    if (clickedArea.pos == 'i'  ||
        clickedArea.pos == 'tr' ||
        clickedArea.pos == 'r'  ||
        clickedArea.pos == 'br' ) {
      if (selectedBox.x2 + xOffset > image.width) {
        xOffset = image.width - selectedBox.x2;
      }
    } else if (clickedArea.pos == 'tl' ||
               clickedArea.pos == 'l'  ||
               clickedArea.pos == 'bl') {
      if (selectedBox.x1 + xOffset > selectedBox.x2 - 2 * lineOffset) {
        xOffset = selectedBox.x2 - 2 * lineOffset - selectedBox.x1;
      }
    }
  }
  return xOffset;
}

function adjustYOffset() {
  var yOffset = y2 - y1;
  var selectedBox = boxes[clickedArea.box];
  if (yOffset < 0) {
    if (clickedArea.pos == 'i'  ||
        clickedArea.pos == 'tl' ||
        clickedArea.pos == 't'  ||
        clickedArea.pos == 'tr' ) {
      if (selectedBox.y1 + yOffset < 0) {
        yOffset = selectedBox.y1;
      }
    } else if (clickedArea.pos == 'bl' ||
               clickedArea.pos == 'b'  ||
               clickedArea.pos == 'br') {
      if (selectedBox.y2 + yOffset < selectedBox.y1 + 2 * lineOffset) {
        yOffset = selectedBox.y1 + 2 * lineOffset - selectedBox.y2;
      }
    }
  } else {
    if (clickedArea.pos == 'i'  ||
        clickedArea.pos == 'bl' ||
        clickedArea.pos == 'b'  ||
        clickedArea.pos == 'br' ) {
      if (selectedBox.y2 + yOffset > image.height) {
        yOffset = image.height - selectedBox.y2;
      }
    } else if (clickedArea.pos == 'tl' ||
               clickedArea.pos == 't'  ||
               clickedArea.pos == 'tr') {
      if (selectedBox.y1 + xOffset > selectedBox.y2 - 2 * lineOffset) {
        yOffset = selectedBox.y2 - 2 * lineOffset - selectedBox.y1;
      }
    }
  }
  return yOffset;
}

var image;
var fn;
function loadImage(input) {
  if (input.files && input.files[0]) {
    var fr = new FileReader();
    fr.onload = function(e) {
      image = document.getElementById("jsoda-image");
      image.onload = function() {
        var jsodaCanvas = document.getElementById("jsoda-canvas");
        jsodaCanvas.width = image.width;
        jsodaCanvas.height = image.height;
        // jsodaCanvas.width = jsodaCanvas.width;
        // var context = canvas.getContext("2d");
        // context.clearRect(0, 0, canvas.width, canvas.height);
        // context.beginPath();
        mousedown = false;
        x1 = -1;
        y1 = -1;
        x2 = -1;
        y2 = -1;

        boxes = [];
        boxes.push({class: 'eyes',
                    x1: 10,
                    y1: 10,
                    x2: 110,
                    y2: 35,
                    lineWidth: 1,
                    color: '#00ff00'});
        boxes.push({class: 'mouth',
                    x1: 10,
                    y1: 50,
                    x2: 110,
                    y2: 75,
                    lineWidth: 1,
                    color: '#ff0000'});

        redraw();
      }
      image.src = e.target.result;
    }
    fr.readAsDataURL(input.files[0]);
    fn = input.files[0].name;
    fn = fn.replace('.jpg', '.txt');
    fn = fn.replace('.JPG', '.txt');
    fn = fn.replace('.png', '.txt');
    fn = fn.replace('.PNG', '.txt');
  }
}

function redraw() {
  // canvas.width = canvas.width;
  var context = document.getElementById("jsoda-canvas").getContext('2d');
  context.clearRect(0, 0, 800, 600);
  context.beginPath();
  for (var i = 0; i < boxes.length; i++) {
    drawBoxOn(boxes[i], context);
  }
  if (clickedArea.box == -1) {
    tmpBox = newBox("mouth", x1, y1, x2, y2);
    if (tmpBox != null) {
      drawBoxOn(tmpBox, context);
    }
  }
}

var boxes = [];
var tmpBox = null;

var lineOffset = 4;

function findCurrentArea(x, y) {
  for (var i = 0; i < boxes.length; i++) {
    var box = boxes[i];
    xCenter = box.x1 + (box.x2 - box.x1) / 2;
    yCenter = box.y1 + (box.y2 - box.y1) / 2;
    if (box.x1 - lineOffset <  x && x < box.x1 + lineOffset) {
      if (box.y1 - lineOffset <  y && y < box.y1 + lineOffset) {
        return {box: i, pos:'tl'};
      } else if (box.y2 - lineOffset <  y && y < box.y2 + lineOffset) {
        return {box: i, pos:'bl'};
      } else if (yCenter - lineOffset <  y && y < yCenter + lineOffset) {
        return {box: i, pos:'l'};
      }
    } else if (box.x2 - lineOffset < x && x < box.x2 + lineOffset) {
      if (box.y1 - lineOffset <  y && y < box.y1 + lineOffset) {
        return {box: i, pos:'tr'};
      } else if (box.y2 - lineOffset <  y && y < box.y2 + lineOffset) {
        return {box: i, pos:'br'};
      } else if (yCenter - lineOffset <  y && y < yCenter + lineOffset) {
        return {box: i, pos:'r'};
      }
    } else if (xCenter - lineOffset <  x && x < xCenter + lineOffset) {
      if (box.y1 - lineOffset <  y && y < box.y1 + lineOffset) {
        return {box: i, pos:'t'};
      } else if (box.y2 - lineOffset <  y && y < box.y2 + lineOffset) {
        return {box: i, pos:'b'};
      } else if (box.y1 - lineOffset <  y && y < box.y2 + lineOffset) {
        return {box: i, pos:'i'};
      }
    } else if (box.x1 - lineOffset <  x && x < box.x2 + lineOffset) {
      if (box.y1 - lineOffset <  y && y < box.y2 + lineOffset) {
        return {box: i, pos:'i'};
      }
    }
  }
  return {box: -1, pos:'o'};
}

function newBox(cls, x1, y1, x2, y2) {
  boxX1 = x1 < x2 ? x1 : x2;
  boxY1 = y1 < y2 ? y1 : y2;
  boxX2 = x1 > x2 ? x1 : x2;
  boxY2 = y1 > y2 ? y1 : y2;
  if (boxX2 - boxX1 > lineOffset * 2 && boxY2 - boxY1 > lineOffset * 2) {
    return {class: cls,
            x1: boxX1,
            y1: boxY1,
            x2: boxX2,
            y2: boxY2,
            lineWidth: 1,
            color: '#ff0000'};
  } else {
    return null;
  }
}

var anchrSize = 2;

function drawBoxOn(box, context) {
  xCenter = box.x1 + (box.x2 - box.x1) / 2;
  yCenter = box.y1 + (box.y2 - box.y1) / 2;

  context.strokeStyle = box.color;
  context.fillStyle = box.color;

  context.rect(box.x1, box.y1, (box.x2 - box.x1), (box.y2 - box.y1));
  context.lineWidth = box.lineWidth;
  context.stroke();

  context.fillRect(box.x1 - anchrSize, box.y1 - anchrSize, 2 * anchrSize, 2 * anchrSize);
  context.fillRect(box.x1 - anchrSize, yCenter - anchrSize, 2 * anchrSize, 2 * anchrSize);
  context.fillRect(box.x1 - anchrSize, box.y2 - anchrSize, 2 * anchrSize, 2 * anchrSize);
  context.fillRect(xCenter - anchrSize, box.y1 - anchrSize, 2 * anchrSize, 2 * anchrSize);
  // context.fillRect(xCenter - anchrSize, yCenter - anchrSize, 2 * anchrSize, 2 * anchrSize);
  context.fillRect(xCenter - anchrSize, box.y2 - anchrSize, 2 * anchrSize, 2 * anchrSize);
  context.fillRect(box.x2 - anchrSize, box.y1 - anchrSize, 2 * anchrSize, 2 * anchrSize);
  context.fillRect(box.x2 - anchrSize, yCenter - anchrSize, 2 * anchrSize, 2 * anchrSize);
  context.fillRect(box.x2 - anchrSize, box.y2 - anchrSize, 2 * anchrSize, 2 * anchrSize);

  context.font = '12.5pt Calibri';
  context.textAlign = 'center';
  context.fillText(box.class, xCenter, yCenter);
}

function download() {
  var element = document.createElement('a');
  var text = '';
  for (var i = 0; i < boxes.length; i++) {
    var box = boxes[i];
    text += box.class + ' 0 0 0 ' +
            box.x1 + ' ' + box.y1 + ' ' +
            box.x2 + ' ' + box.y2 + ' 0 0 0 0 0 0 0\n';
  }
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', fn);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
