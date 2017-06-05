var body = document.body;
var height = document.querySelector('.height');
var weight = document.querySelector('.weight');
var btn = document.querySelector('.btn');
var retestbtn = document.querySelector('.retestbtn');
var list = document.querySelector('.list');
var sircle = document.querySelector('.sircle');
var info = document.querySelector('.info');
var result = document.querySelector('.result');
var clear = document.querySelector('.clear');
var data = JSON.parse(localStorage.getItem("bmilist"))||[];//若是空值則放[]

function addbmi(e){
	e.preventDefault();
	if(height.value==''||weight.value==''){alert('請輸入您的身高及體重'); return;}
	var bmi=parseInt(weight.value)/Math.pow(parseInt(height.value)/100,2);
	bmi=bmi.toFixed(2);
	var today=new Date();
	var str={
		height:parseInt(height.value),
		weight:parseInt(weight.value),
		bmi:bmi,
		day:today.getDate(),
		month:today.getMonth(),
		year:today.getFullYear()
	}
	data.push(str);
	localStorage.setItem("bmilist",JSON.stringify(data));
	showlist();
	$('.start').hide();
	$('.result').show();
	if(bmi<18.5){info.textContent='過輕';sircle.textContent=bmi;$('.result').css('color','#31BAF9');$('.result').css('border','#31BAF9');$('.retestbtn').css('background','#31BAF9');}
		else if(bmi>=18.5 && bmi<27){info.textContent='正常';sircle.textContent=bmi;$('.result').css('color','#86D73E');$('.result').css('border','#86D73E');$('.retestbtn').css('background','#86D73E');}
		else if(bmi>=27 && bmi<30){info.textContent='輕度肥胖';sircle.textContent=bmi;$('.result').css('color','#FF982D');$('.result').css('border','#FF982D');$('.retestbtn').css('background','#FF982D');}
		else if(bmi>=30 && bmi<35){info.textContent='中度肥胖';sircle.textContent=bmi;$('.result').css('color','#FF6C02');$('.result').css('border','#FF6C02');$('.retestbtn').css('background','#FF6C02');}
		else{info.textContent='重度肥胖';sircle.textContent=bmi;$('.result').css('color','#FF1200');$('.result').css('border','#FF1200');$('.retestbtn').css('background','#FF1200');}
}

function showlist(){
	var str='';
	var Ethnicity,bar;
	for(i=0;i<data.length;i++){
		if(data[i].bmi<18.5){Ethnicity='過輕';bar='thin';}
		else if(data[i].bmi>=18.5 && data[i].bmi<27){Ethnicity='正常';bar='';}
		else if(data[i].bmi>=27 && data[i].bmi<30){Ethnicity='輕度肥胖';bar='fat';}
		else if(data[i].bmi>=30 && data[i].bmi<35){Ethnicity='中度肥胖';bar='toofat';}
		else{Ethnicity='重度肥胖';bar='pig';}
		var build='<li><div class="bar '+bar+'"></div><h3 class="Ethnicity">'+Ethnicity+'</h3><p>BMI</p><h3 class="bmi">'+data[i].bmi+'</h3><p>weight</p><h3 class="weight">'+data[i].weight+'kg</h3><p>height</p><h3 class="hight">'+data[i].height+'cm</h3><p class="date">'+data[i].day+'-'+(data[i].month+1)+'-'+data[i].year+'</p></li>';
		str=build+str;
	}
	list.innerHTML=str;
}

function clearbmi(){
	data=[];
	localStorage.setItem("bmilist",JSON.stringify(data));
	showlist();
}

body.addEventListener('keydown',function(e){
	if(e.keyCode=='13'){addbmi(e);}
},false);

clear.addEventListener('click',clearbmi,false);
btn.addEventListener('click',addbmi,false);
retestbtn.addEventListener('click',addbmi,false);
showlist();
