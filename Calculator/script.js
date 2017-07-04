var num = document.querySelectorAll(".num");
var operators = document.querySelectorAll(".operators");
var decimal = document.querySelector("#decimal");
var equals = document.querySelector("#equal");
var screen = document.querySelector("#screen");
screen.innerHTML = 0;
var keys = document.querySelectorAll(".keys");
var result;
var ipCheck;
var prev;
var current = [];
var op = [];
var number = [];
var sign = false;
var dflag = false;
var eqflag = false;




decimal.addEventListener("click", function(){
	if(sign){
		screen.innerHTML = this.textContent;
		current.push(this.textContent);
		// number.push(this.textContent);
		sign = false;
		dflag = true;
	}

	else if(dflag == false){
		screen.innerHTML += this.textContent;
		current.push(this.textContent);
		// number.push(this.textContent);
		dflag = true;
	}

	else if(current.length==0){
		screen.innerHTML = this.textContent;
		console.log("i am here woohoo");
	}

});

for(var i=0; i<num.length; i++){
		num[i].addEventListener("click", function(){
		if(eqflag){
		eqflag=false;
		result=undefined;
		screen.innerHTML = this.textContent;
		}
		else if(sign){
			screen.innerHTML = this.textContent;
			sign=false;
		}
		else if(current[current.length-1] == '-'&&current.length==1){
			screen.innerHTML = current[current.length-1] + this.textContent;
		}
		
		else if(current.length==0){
			screen.innerHTML = this.textContent;
				console.log("i am in num woohoo");
		}
		else{ 	number.push(this.textContent);
				ipCheck = number.join('');
				if(checkBits(ipCheck)){
				console.log("whaaaaaaat");
				screen.innerHTML;
				}
				else screen.innerHTML += this.textContent;
				number.pop(this.textContent);
		}
		current.push(this.textContent);
		number.push(this.textContent);
});
}


for(var i=0; i<operators.length; i++){
	operators[i].addEventListener("click", function(){
		number = [];
		if(eqflag){
			current.push(result);
			eqflag = false;
		}
		sign = true;
		dflag=false;

		 if(this.textContent == '÷'){
		 		result = firstOp(current,'/',op);
		 	}
			// 	if(op[op.length-1] == '*' || op[op.length-1] == '/'){
			// 		// result = eval(current.join(''));
			// 		result = calculate(current);
			// 		// screen.innerHTML = result;
			// 	 //screen.innerHTML = eval(current.join(''));
			// 	 }
			// 	 else if(op.length==0){
			// 	 	console.log("i am empty");
			// 	 }
			// current.push('/')
			// op.push('/');
		
		
		else if(this.textContent == 'x'){
				result = firstOp(current,'*',op);
			}
			// 	if(op[op.length-1] == '*' || op[op.length-1] == '/'){
			// 	// screen.innerHTML = eval(current.join(''));
			// 	// result = eval(current.join(''));
			// 	 result = calculate(current);
			// 	 // screen.innerHTML = result;
				 
			// }
			// current.push('*');
			// op.push('*');

		else if(this.textContent == '+'){
			result = firstOp(current,'+',op);
		}

		else{
				if(current.length==0){
				screen.innerHTML = '-';
				current.push('-');
				sign = false;
				}
				else{
				result = firstOp(current,'-',op);
				}
			}
			// 			result = calculate(current);
			// 	// screen.innerHTML = result;
			//  // screen.innerHTML = eval(current.join(''));
			//  console.log("inside of + - "+current);
			// current.push(this.textContent);
			// op.push(this.textContent);
					
				
				
	});
}

equals.addEventListener("click", function(){
	if(eqflag){
		screen.innerHTML;
	}
	
	else if(op[op.length-1] == '/' && current[current.length-1] == '0'){
			screen.innerHTML = 'undefined';
			result = undefined;
			current = [];
			eqflag = true;
	}
	
	else{
	eqflag = true;
	// sign = true;
	dflag=false;
	// console.log(current.join(''));
	// result=eval(current.join(''));
	// console.log("outside "+ result);
	result = calculate(current);
	current = [];

		// if((Math.max(Math.floor(Math.log10(Math.abs(result))), 0) + 1)>10){
		// screen.innerHTML = 'Error';
		// current = [];
		// result = undefined;
		// // eqflag = false;
		// }

		// else if(result.toString().indexOf('.')!=-1){
		// 	screen.innerHTML = result.toPrecision(10);
		// 	result = result.toPrecision(10);
		// 	console.log(result);
		// 	current = [];
		// 	console.log("inside decimal" + result);
		// }


		// else {
		// 	screen.innerHTML = result;
		// 	current = [];
		// 	console.log("ekdum normal" + result);
		// 	}
	
	}
});

function calculate(current){
	// eqflag = true;
	// console.log(eqflag);
	// // sign = true;
	// dflag=false;
	result=eval(current.join(''));
	// if((Math.max(Math.floor(Math.log10(Math.abs(result))), 0) + 1)>10){
	// 		screen.innerHTML = 'Error';
	// 		result = undefined;
	// 		return result;
	// 	}

		if(checkBits(result)){
			screen.innerHTML = "Error";
			return result;
		}

		else if(result.toString().indexOf('.')!=-1){
			// screen.innerHTML = result.toPrecision(10);
			screen.innerHTML = +(+result.toPrecision(10)).toFixed(10);
			result = result.toPrecision(10);
			return result;
		}


		else {
			screen.innerHTML = result;
			return result;
			}
}

function checkBits(x){
	// if((Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1)>10){
	// 		result = undefined;
	// 		return true;
	// 	}
	if(x.toString().length>10){
		console.log("i am in checkBits and over 10");
		return true;
	}
}

function firstOp(current,operator,op){
		prev = op[op.length-1];
		if(current.length==0){
			
			op = [];
			current = [];
			return undefined;
		}

		else if(prev == '*' || prev == '/'|| op.length==0 || (prev=='+' && operator=='+') || (prev=='-' && operator=='-')||(prev=='+' && operator=='-')||(prev=='-' && operator=='+')){
			
			result = calculate(current);
			current.push(operator);
			op.push(operator);
			return result;
		}

		else if(prev == '+'|| prev == '-'){
			console.log("third + and -");
			current.push(operator);
			op.push(operator);
			return result;
	}

}