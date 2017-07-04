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

	else if(current.length==0){
		screen.innerHTML = this.textContent;
	}

});

for(var i=0; i<num.length; i++){
		num[i].addEventListener("click", function(){
		current.push(this.textContent);
		number.push(this.textContent);

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
		
		else if(current.length==1){
			screen.innerHTML = this.textContent;
		}
		
		else{ 
				ipCheck = number.join('');
				if(checkBits(ipCheck)){
				screen.innerHTML;
				current.pop();
				number.pop();
				}
				else {
					screen.innerHTML += this.textContent;
					
				}
				
		}
	
});
}



for(var i=0; i<operators.length; i++){
	operators[i].addEventListener("click", function(){
		number = [];

		if(current[current.length-1]==op[op.length-1]){
			screen.innerHTML;
		}
		if(eqflag){
			current.push(result);
			eqflag = false;
		}
		sign = true;
		dflag=false;

		 if(this.textContent == '÷'){
		 		result = firstOp(current,'/',op);
		 	}
			
		
		
		else if(this.textContent == 'x'){
				result = firstOp(current,'*',op);
			}
	

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
	
	dflag=false;

	result = calculate(current);
	current = [];
	
	}
});

function calculate(current){
	result=eval(current.join(''));

		if(checkBits(result)){
			screen.innerHTML = "Error";
			return result;
		}

		else if(result.toString().indexOf('.')!=-1){
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

	if((Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1)>10 || (Number(x)<1 && x.length>11)){
			result = undefined;
			return true;
		}
}

function firstOp(current,operator,op){
		prev = op[op.length-1];
		if(current.length==0 || current[current.length-1]==op[op.length-1]){
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
			current.push(operator);
			op.push(operator);
			return result;
	}

}