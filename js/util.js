function addBoxType() {
  var inputNewBoxTypeText = document.getElementById("jsoda-new-box-type-text");
  if (inputNewBoxTypeText.value && !(inputNewBoxTypeText.value in boxColorOf)) {
    addBoxTypeWithNameAndColor(inputNewBoxTypeText.value, "#"+((1<<24)*Math.random()|0).toString(16));
    inputNewBoxTypeText.value = "";
  }
}

function addBoxTypeWithNameAndColor(cls, rgb) {
  var boxType = document.createElement("span");
  boxType.classList.add("jsoda-box-type");
  var color = document.createElement("input");
  color.type = "color";
  color.value = rgb;
  color.onchange = function() {
    boxColorOf[cls] = this.value;
    redraw();
  };
  boxColorOf[cls] = color.value;

  var input = document.createElement("input");
  input.type = "text";
  input.value = cls;
  input.size = cls.length;
  input.readOnly = true;
  input.onclick = function() {
    // var rgb = this.parentNode.childNodes[0].value.match(/[A-Za-z0-9]{2}/g).map(function(v) {return parseInt(v, 16)});
    var box = newBox(cls, 0, 0, 200, 200);
    boxes.push(box);
    redraw();
  }

  var boxTypeRemoveBtn = document.createElement("a");
  boxTypeRemoveBtn.onclick = function() {
    boxType.parentNode.removeChild(boxType);
  };
  boxTypeRemoveBtn.appendChild(document.createTextNode('\u2716'));
  // boxTypeRemoveBtn.appendChild(document.createTextNode('\u2297'));

  var boxClass = document.createElement("a");
  boxClass.appendChild(document.createTextNode(' ' +  + ' '));

  boxType.appendChild(color);
  boxType.appendChild(input);
  boxType.appendChild(boxTypeRemoveBtn);

  var jsodaBoxList = document.getElementById("jsoda-box-list");
  jsodaBoxList.removeChild(jsodaBoxList.lastChild);
  jsodaBoxList.appendChild(boxType);
  jsodaBoxList.appendChild(newBoxTypeInput());
}

function newBoxTypeInput() {
  var jsodaBoxTypeInputClass = document.createElement("input");
  jsodaBoxTypeInputClass.id = "jsoda-new-box-type-text";
  jsodaBoxTypeInputClass.type = "text";
  jsodaBoxTypeInputClass.placeholder = "class";
  jsodaBoxTypeInputClass.size = 4;
  jsodaBoxTypeInputClass.onkeydown = function() {
    this.size = this.value.length > 4 ? this.value.length : 4;
  }

  var jsodaBoxTypeInputAdd = document.createElement("a");
  jsodaBoxTypeInputAdd.appendChild(document.createTextNode(" \u271A"));
  jsodaBoxTypeInputAdd.onclick = addBoxType;

  var jsodaBoxTypeInput = document.createElement("span");
  jsodaBoxTypeInput.id = "jsoda-box-type-input";
  jsodaBoxTypeInput.appendChild(jsodaBoxTypeInputClass);
  jsodaBoxTypeInput.appendChild(jsodaBoxTypeInputAdd);

  return jsodaBoxTypeInput;
}
document.getElementById("jsoda-box-list").appendChild(newBoxTypeInput());

function clickInputFile() {
  document.getElementById("jsoda-menu").childNodes[3].click();
}
