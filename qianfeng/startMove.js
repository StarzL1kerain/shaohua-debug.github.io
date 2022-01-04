function startMove(domobj, json, fn) {
  clearInterval(domobj.timer);
  domobj.timer = setInterval(function () {
    let flag = true; // 假设所有的属性都达到了目标值
    for (let attr in json) {
      let iCur;
      if (attr == "opacity") {
        iCur = parseInt(getStyle(domobj, "opacity") * 100); //为了后面运算时有一个持续变化效果
      } else {
        iCur = parseInt(getStyle(domobj, attr)); //当前属性值
      }

      let iTar = json[attr]; //目标值
      let iSpeed = (iTar - iCur) / 10;
      iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
      if (attr == "opacity") {
        domobj.style.opacity = (iCur + iSpeed) / 100;
      } else {
        domobj.style[attr] = iCur + iSpeed + "px";
      }

      if (iCur != iTar) {
        //只要有属性没有达到目标值的假设不成立
        flag = false;
      }
    }
    if (flag) {
      clearInterval(domobj.timer);
      if (fn) {
        fn();
      }

    }
  }, 20);
}

function getStyle(domobj, attr) {
  if (window.getComputedStyle) {
    return getComputedStyle(domobj, null)[attr];
  }
  return domobj.currentStyle[attr];
}