var numSquares=6;
var colors = generateColor(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor(colors);
var colorDisplay = document.querySelector("#pickedColor");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#resetButton");
var modeButtons = document.querySelectorAll(".mode");


for(var i = 0; i < modeButtons.length; i++){
	modeButtons[i].addEventListener("click", function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");
		if(this.textContent === "Easy"){
			numSquares = 3;
		}
		else {
			numSquares = 6;
		}
		reset();
	});
}


	function reset(){
		colors = generateColor(numSquares);
		pickedColor = pickColor();
		colorDisplay.textContent = pickedColor;
		message.textContent = "";
		resetButton.textContent = "New Colors"
		h1.style.background = "steelblue";
		for(var i=0; i < squares.length; i++){
		//add initial colors
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
			} else{
			squares[i].style.display = "none";
			}
		}
	}


resetButton.addEventListener("click", function(){
	reset();
});

colorDisplay.textContent = pickedColor;

for(var i=0; i < squares.length; i++){
	//add initial colors
	squares[i].style.background = colors[i];

	
	squares[i].addEventListener("click",function(){
		
		//select the clicked square
		var selectedColor=this.style.background;
		
		//compare color to pickedColor
		if(selectedColor === pickedColor){
			
			//display correct if correct
			message.textContent = "Correct";
			changeColor(selectedColor);	
			h1.style.background = selectedColor;
			resetButton.textContent = "Play Again?"
		 } 
		//display wrong if wrong
		else{
			message.textContent = "Try Again";
			this.style.background = "#232323";
			}
	});
	
}


function changeColor(color){
	for(var i=0; i<squares.length; i++){
		squares[i].style.background = color; 
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateColor(num) {
	var arr = [];
	for(var i=0; i<num; i++){
		arr.push(randomColor());
		}
	return arr;
}


function randomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";

}