var num = document.querySelectorAll(".num");
var operators = document.querySelectorAll(".operators");
var decimal = document.querySelector("#decimal");
var equals = document.querySelector("#equal");
var screen = document.querySelector("#screen");
screen.innerHTML = 0;
var result;
var ipCheck;
var prev;
var current = [];
var op = [];
var number = [];
var sign = false;
var dflag = false;
var eqflag = false;



//Event Listener for the decimal key
decimal.addEventListener("click", function(){
// if sign is true, then the number that starts with the decimal is a new number
	if(sign){
		screen.innerHTML = this.textContent;
		current.push(this.textContent);
		sign = false;
		dflag = true;
	}
// if dflag is false, then this is the first decimal in the number

	else if(current.length==0){
		screen.innerHTML += this.textContent;
		current.push('0','.');
		number.push('0');
	}

	else if(dflag==false){
		screen.innerHTML += this.textContent;
		current.push(this.textContent);
		dflag = true;
	}

});

for(var i=0; i<num.length; i++){
// Event listener for the numeric keys
		num[i].addEventListener("click", function(){
		current.push(this.textContent);
		number.push(this.textContent);

// if "equals" is already pressed, then the incoming digit is the start of the new expression
		if(eqflag){
			eqflag=false;
			result=undefined;
			screen.innerHTML = this.textContent;
		}

// if sign is already pressed, then the incoming digit is the start of the new number 
		else if(sign){
			screen.innerHTML = this.textContent;
			sign=false;
		}
		
//to erase the 0 from the screen if the incoming digit is the first 
		else if(current.length==1){
			screen.innerHTML = this.textContent;
		}

// to check if the incoming digit is the 11th digit. Only 10 digits are taken as the input
		else{ 
				ipCheck = number.join('');
				if(checkBitsip(ipCheck)){
				screen.innerHTML;
				current.pop();  	//pop the digits if the number of inputs exceed 10
				number.pop();		//pop the digits if the number of inputs exceed 10
				}
				else {
					screen.innerHTML += this.textContent; //if the incoming digit is not the 11th, print it
					
				}
			}
	
	});
}

for(var i=0; i<operators.length; i++){
// Event listener for the operator keys
	operators[i].addEventListener("click", function(){
// indicates the start of the new number
		number = [];

		
// if equals is pressed, the incoming operator will operate on the result of the previous expression
		if(eqflag){
			current.push(result);
			eqflag = false;
		}
		
		sign = true;
		dflag=false;

// if the incoming operator is a division operator
		if(this.textContent == '÷'){
		 		result = calculate(current,'/',op);
		 	}
			
		
// if the incoming operator is a multiplication operator
		else if(this.textContent == 'x'){
				result = calculate(current,'*',op);
			}
	
// if the incoming operator is a addition operator
		else if(this.textContent == '+'){
			result = calculate(current,'+',op);
		}

// if the incoming operator is a subtraction operator
		else{	//when the incoming '-' is the first key pressed or if there is any sign before the incoming '-' sign (eg. 3+-2 is valid as 3+ -2 = 1)
				if(current.length==0) {
				screen.innerHTML = '-';
				current.push('-');
				sign = false;
				}
				
				else{ 
				result = calculate(current,'-',op);
				}
			}			
	});
}

//Event Listener for the equal sign
equals.addEventListener("click", function(){
//if equals already pressed, no change in the display
	if(eqflag){
		screen.innerHTML;
	}
	
//if equals is pressed after division by zero, the conventional javascript answer of Infinity will change to undefined. 
	else if(op[op.length-1] == '/' && current[current.length-1] == '0'){
		screen.innerHTML = 'undefined';
		result = undefined;
		current = [];
		eqflag = true;
	}
	
//calculation of the result after pressing equals
	else{ 
		eqflag = true;
		dflag=false;
		result = constrain(current);
		current = [];
	}
});

//to constrain the result
function constrain(current){
	result=eval(current.join(''));

//check if the result digit count is >10	
	if(checkBitsop(result)){
		screen.innerHTML = "Error";
		return result;
	}

	else if(result.toString().indexOf('.')!=-1){
		screen.innerHTML = (result.toString()).substring(0,11);
		result = (result.toString()).substring(0,11);
		return result;
	}

//to print the result	
	else {
		screen.innerHTML = result;
		return result;
	}
}

//to check if the incoming digit count or the result digit count is above 10
function checkBitsip(ipCheck){ //input
	return (ipCheck.length)>10
}

function checkBitsop(result){
	if(result.toString().indexOf('.')==-1){
		return (result.toString().length>10);
	}
	
}

//for calculating the result
function calculate(current,operator,op){
	prev = op[op.length-1];

// if the first key pressed is an operator || if there are 2 consecutive operators
	if(current.length==0 || current[current.length-1]==prev){
		op = [];
		current = [];
		return undefined;
	}
//calculate the result with test cases depending on the chain operation rules
	else if(prev == '*' || prev == '/'|| op.length==0 || (prev=='+' && operator=='+') || (prev=='-' && operator=='-')||(prev=='+' && operator=='-')||(prev=='-' && operator=='+')){
		result = constrain(current);
		current.push(operator);
		op.push(operator);
		return result;
	}

	else if(prev == '+'|| prev == '-'){
		current.push(operator);
		op.push(operator);
		return result;
	}

}