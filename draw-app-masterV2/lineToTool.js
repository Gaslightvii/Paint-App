//a tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the 
//pixel array.
function LineToTool(){
	this.icon = "assets/lineTo.jpg";
	this.name = "Line To";
	
	this.lineToSizeSlider = null;
	
	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	//draws the line to the screen 
	this.draw = function(){

		//only draw when mouse is clicked
		if(mouseIsPressed){
			//if it's the start of drawing a new line
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//save the current pixel Array
				loadPixels();
			}

			else{
				//update the screen with the saved pixels to hide any previous
				//line between mouse pressed and released
				updatePixels();
				//draw the line
				strokeWeight(thickness);
				line(startMouseX, startMouseY, mouseX, mouseY);
			}

		}

		else if(drawing){
			//save the pixels with the most recent line and reset the
			//drawing bool and start locations
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};
	
	// Ensure the options container is cleared
	this.populateOptions = function() {
    select(".options").html(""); 
		
	// Create a container for the slider and its value
        var sliderContainer = createDiv().parent(select(".options"));
        sliderContainer.style("margin-top", "40px");
		
		var sliderLabel = createSpan("Thickness: ").parent(sliderContainer);

        // Create the slider
        this.lineToSlider = createSlider(1, 100, thickness); // min, max, default
        this.lineToSlider.parent(sliderContainer);
        this.lineToSlider.input(() => {
            thickness = this.lineToSlider.value(); // Update the variable's value
            valueLabel.html(thickness); // Update the displayed current value
        });

        // Create a label to display the current slider value
        var valueLabel = createSpan(thickness.toString()).parent(sliderContainer);
        valueLabel.style("margin-left", "10px"); // Add some spacing
	};
}