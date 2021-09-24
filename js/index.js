function getStyle(obj, name){
	if(window.getComputedStyle){
		return getComputedStyle(obj, null)[name];
	}else{
		return obj.currentStyle[name];
	}
}
function move(obj, attr, target, speed, callback){
	clearInterval(obj.timer);
	var current = parseInt(getStyle(obj, attr));
	if(current >= target){
		speed = -speed;
	}
	obj.timer = setInterval(function(){
		var oldValue = parseInt(getStyle(obj, attr));
		var newValue = oldValue + speed;
		if((speed < 0 && newValue <= target) || (speed > 0 && newValue >= target)){
			newValue = target;
		}
		obj.style[attr] = newValue + "px";
		if(newValue == target){
			clearInterval(obj.timer);
			callback && callback();
		}
	}, 30);
}
var timer;
window.onload = function(){
	var imgList = document.getElementById("imgList");
	var imgArr = document.getElementsByTagName("img");
	imgList.style.width = imgArr.length * 510 + "px";
	var navDiv = document.getElementById("navDiv");
	navDiv.style.marginLeft = -navDiv.offsetWidth / 2 + "px";
	var allA = document.getElementsByTagName("a");
	var index = 0;
	allA[index].style.backgroundColor = "black";
	for (var i = 0; i < allA.length; i++){
		allA[i].num = i;
		allA[i].onclick = function(){
			clearInterval(timer);
			index = this.num;
			// imgList.style.left = -index * 510 + 10 + "px";
			setA();
			move(imgList, "left", (-index * 510 + 10), 20, function(){
				autoChange();
			});
		};
	}
	autoChange();
	function setA(){
		if(index >= imgArr.length -1){
			index = 0;
			imgList.style.left = 10 + "px";
		}
		for(var i = 0; i < allA.length; i++){
			allA[i].style.backgroundColor = "";
		}
		allA[index].style.backgroundColor = "black";
	};
	function autoChange(){
		timer = setInterval(function(){
			index++;
			index %= imgArr.length;
			move(imgList, "left", (-index * 510 + 10), 20, function(){
				setA();
			});
		}, 3000);
	};
};