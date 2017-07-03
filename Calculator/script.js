var num = document.querySelectorAll(".num");
var operators = document.querySelectorAll(".operators");
var decimal = document.querySelector("#decimal");
var equals = document.querySelector("#equal");
var screen = document.querySelector("#screen");
var result;
var current = [];
var op = [];
var sign = false;
var dflag = false;
var eqflag = false;


decimal.addEventListener("click", function(){
	if(sign){
		screen.innerHTML = this.textContent;
		current.push(this.textContent);
		sign = false;
		dflag = true;
	}

	else if(dflag == false){
		screen.innerHTML += this.textContent;
		current.push(this.textContent);
		dflag = true;
	}

});

for(var i=0; i<num.length; i++){
	num[i].addEventListener("click", function(){
		if(sign){
			screen.innerHTML = this.textContent;
			sign=false;
		}
		else{
			screen.innerHTML += this.textContent;
		}
	current.push(this.textContent);
});
}


for(var i=0; i<operators.length; i++){
	operators[i].addEventListener("click", function(){
		if(eqflag){
			current.push(result);
			eqflag = false;
		}

		sign = true;
		dflag=false;
		 if(this.textContent == '÷'){
				if(op[op.length-1] == '*' || op[op.length-1] == '/'){
				screen.innerHTML = eval(current.join(''));
			}
			current.push('/')
			op.push('/');
		}
		
		else if(this.textContent == 'x' ){
				if(op[op.length-1] == '*' || op[op.length-1] == '/'){
				screen.innerHTML = eval(current.join(''));
			}
			current.push('*');
			op.push('*');
		}

		else{
			
			screen.innerHTML = eval(current.join(''));
			current.push(this.textContent);
		}
	});
}

equals.addEventListener("click", function(){
	if(eqflag){
		screen.innerHTML;
	}

	else{
	eqflag = true;
	console.log(eqflag);
	sign = true;
	dflag=false;
	console.log(current.join(''));
	result=eval(current.join(''));
	if((Math.max(Math.floor(Math.log10(Math.abs(result))), 0) + 1)>10){
		screen.innerHTML = 'Error';
		current = [];
		var result;
	}
	else if(result.toString().indexOf('.')!=-1){
		screen.innerHTML = result.toPrecision(10);
		result = result.toPrecision(10);
		console.log(result);
		current = [];
	}

	else{
		screen.innerHTML = result;
		current = [];
	}
	
	}
});


