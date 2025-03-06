function FreehandTool(){
	//set an icon and a name for the object
	this.icon = "assets/freehand.jpg";
	this.name = "Freehand";
	this.thicknessSlider = null;
	
	//to smoothly draw we'll draw a line from the previous mouse location
	//to the current mouse location. The following values store
	//the locations from the last frame. They are -1 to start with because
	//we haven't started drawing yet.
	var previousMouseX = -1;
	var previousMouseY = -1;

	this.draw = function(){
		//if the mouse is pressed
		if(mouseIsPressed){
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1){
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else{
				strokeWeight(thickness);
				line(previousMouseX, previousMouseY, mouseX, mouseY);
				previousMouseX = mouseX;
				previousMouseY = mouseY; 
			}
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		//try and comment out these lines and see what happens!
		else{
			previousMouseX = -1;
			previousMouseY = -1;
		}
	};
	
	// Ensure the options container is cleared
	this.populateOptions = function() 
	{
    	select(".options").html(""); 
	
       // Create a container for the slider and its value
        var sliderContainer = createDiv().parent(select(".options"));
        sliderContainer.style("margin-top", "40px");
		
		var sliderLabel = createSpan("Thickness: ").parent(sliderContainer);
		
        // Create the slider
        this.thicknessSlider = createSlider(1, 100, thickness); // min, max, default
        this.thicknessSlider.parent(sliderContainer);
        this.thicknessSlider.input(() => {
            thickness = this.thicknessSlider.value(); // Update the thickness value
            valueLabel.html(thickness); // Update the displayed current value
        });

        // Create a label to display the current slider value
        var valueLabel = createSpan(thickness.toString()).parent(sliderContainer);
        valueLabel.style("margin-left", "10px"); // Add some spacing
	};
}