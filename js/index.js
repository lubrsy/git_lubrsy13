/*
 * 定义一个函数，用来获取指定元素的当前的样式
 * 参数：
 * 		obj 要获取样式的元素
 * 		name 要获取的样式名
 */
getStyle = (obj, name) => {
  if (window.getComputedStyle) {
    // 正常浏览器
    return getComputedStyle(obj, null)[name];
  } else {
    // 可兼容 IE8
    return obj.currentStyle[name];
  }
};

//创建一个可以执行简单动画的函数
/*
 * 参数：
 * 	obj:要执行动画的对象
 * 	attr:要执行动画的样式，比如：left top width height
 * 	target:执行动画的目标位置
 * 	speed:移动的速度(正数向右移动，负数向左移动)
 *  callback:回调函数，这个函数将会在动画执行完毕以后执行
 */
move = (obj, attr, target, speed, callback) => {
  // 关闭上一个定时器
  clearInterval(obj.timer);
  // 获取元素当前的位置
  let current = parseInt(getStyle(obj, attr));
  // 判断移动方向，若为反向则将速度改为负数
  if (current >= target) {
    speed = -speed;
  }
  // 开启一个定时器，用来执行动画效果
  obj.timer = setInterval(() => {
    // 获取原来的 left 值
    let oldValue = parseInt(getStyle(obj, attr));
    // 在旧的 left 值的基础上增加
    let newValue = oldValue + speed;
    //判断newValue是否大于800
    //从800 向 0移动
    //向左移动时，需要判断newValue是否小于target
    //向右移动时，需要判断newValue是否大于target
    if ((speed < 0 && newValue <= target) || (speed > 0 && newValue >= target)) {
      newValue = target;
    }
    // 将新值设置给 imgList
    obj.style[attr] = newValue + 'px';
    // 当元素移动到0px时，使其停止执行动画
    if (newValue == target) {
      //达到目标，关闭定时器
      clearInterval(obj.timer);
      //动画执行完毕，调用回调函数
      callback();
    }
  }, 30);
};

window.onload = () => {
  // 定义一个自动切换的定时器的标识
  let timer;

  // 定义一个函数，用来设置选中的 a
  setA = () => {
    // 判断当前是否是最后一张图片（第6张）
    if (index >= imgArr.length - 1) {
      // 是则将索引设置为 0
      index = 0;
      // 最后一张图片和第一张一模一样，通过 CSS 将最后一张图片替换为第一张
      imgList.style.left = 10 + 'px';
    }
    // 将所有的 a 的背景颜色设置为红色（空字符串会使用 CSS 中的红色）
    for (let i = 0; i < allA.length; i++) {
      allA[i].style.backgroundColor = '';
    }
    // 将选中的 a 设置为黑色
    allA[index].style.backgroundColor = 'black';
  };

  // 定义一个函数，用来开启自动切换图片
  autoChange = () => {
    // 开启一个定时器，用于自动切换图片
    timer = setInterval(() => {
      index++;
      index %= imgArr.length;
      // 执行动画，切换图片
      move(imgList, 'left', -index * 510 + 10, 20, () => {
        // 修改导航按钮
        setA();
      });
    }, 3000);
  };

  const imgList = document.getElementById('imgList');
  const imgArr = document.getElementsByTagName('img');
  // 设置 imgList 的宽度
  imgList.style.width = imgArr.length * 510 + 'px';
  const navDiv = document.getElementById('navDiv');
  // 设置导航按钮居中
  navDiv.style.marginLeft = -navDiv.offsetWidth / 2 + 'px';
  const allA = document.getElementsByTagName('a');
  let index = 0;
  // 设置导航按钮默认选中的效果
  allA[index].style.backgroundColor = 'black';

  // 为所有的超链接都绑定单击响应函数
  for (let i = 0; i < allA.length; i++) {
    // allA[i].num = i;
    allA[i].onclick = () => {
      // 关闭自动切换的定时器
      clearInterval(timer);
      // index = this.num;
      // 将 index 设置为点击超链接的索引
      index = i;
      // imgList.style.left = -index * 510 + 10 + "px";
      // 设置选中的a
      setA();
      // 使用 move 函数来切换图片
      move(imgList, 'left', -index * 510 + 10, 20, () => {
        // 动画执行结束，开启自动切换图片
        autoChange();
      });
    };
  }
  // 开启自动切换图片
  autoChange();
};
