var words = [
	"我是陳祖培，歡迎來到我的部落格",
	"現在在東京工業大學交換留學中",
	"喜歡創作屬於自己的東西，例如這個部落格",
	"個性雖然隨和，但對自己決定的事情很固執",
	"在這裡是我紀錄生活，還有留下學習軌跡的地方"
]
var i=0;
var j=0;
var speed = 100;

function typeWriter() {
	txt = words[j];
	if (i < txt.length) {
	    document.getElementById("intro").innerHTML += txt.charAt(i);
	    i++;
	    setTimeout(typeWriter, speed);
	}else{
		if(j+1 < words.length){
			document.getElementById("intro").innerHTML += "<br>"
			j++;
			i=0;
			setTimeout(typeWriter, speed);
		}
	}
}
typeWriter()