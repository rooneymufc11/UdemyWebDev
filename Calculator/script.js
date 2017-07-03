var num = document.querySelectorAll(".num");
var operators = document.querySelectorAll(".operators");
var decimal = document.querySelector("#decimal");
var equals = document.querySelector("#equal");
var screen = document.querySelector("#screen");
var result = 0;
var current = [];
var sign = false;
var dflag = false;


decimal.addEventListener("click", function(){
	if(sign||dflag){
		screen.innerHTML;
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
		sign = true;
		 if(this.textContent == '÷'){
		 	// if(opcount[length] == '*' || opcount[length] == '/'){
				if(current[current.length-1] == '*' || current[current.length-1] == '/'){
				screen.innerHTML = eval(current.join(''));
			}
			current.push('/');
			// opcount.push('/');
		}
		
		else if(this.textContent == 'x' ){
			// if(opcount[length] == '/' || opcount[length] == '*' ){
				if(current[current.length-1] == '*' || current[current.length-1] == '/'){
				screen.innerHTML = eval(current.join(''));
			}
			current.push('*');
			// opcount.push('*');
		}

		else{
			
			screen.innerHTML = eval(current.join(''));
			current.push(this.textContent);
			// opcount.push(this.textContent);
		}
		// console.log(current[current.length-1]);
	});
}

equals.addEventListener("click", function(){
	sign = true;
	dflag=false;
	console.log(current.join(''));
	screen.innerHTML=eval(current.join(''));
	current = [];
	});

