function SprayCanTool(){
	
	this.name = "Spray Can";
	this.icon = "assets/sprayCan.jpg";
	
	this.SprayCanSizeSlider = null;
	var SprayCanSize = 50;
	
	this.SprayCanPointsSlider = null;
	var SprayCanPoints = 50;
	var freehandSize = 1;
	

	this.draw = function(){
		var r = random(5,10);
		strokeWeight(0);
		if(mouseIsPressed){
			for(var i = 0; i < SprayCanPoints; i++){
				// Random angle between 0 and 2 * PI
				var angle = random(0, TWO_PI);
				// Random radius between 0 and spread
				var radius = random(0, SprayCanSize);
				// Convert from radius/angle to x/y
				var x = mouseX + radius * cos(angle);
				var y = mouseY + radius * sin(angle);

				point(x, y); // Draw the point at the new position
			  }
			}
		
	};
	
	this.populateOptions = function () {
    // Clear the options container
    select(".options").html("");

    // Create a container for the spread slider and its value
    var spreadContainer = createDiv().parent(select(".options"));
    spreadContainer.style("margin-top", "20px");

    // Create the spread slider label and slider
    var spreadSliderLabel = createSpan("Spray Can spread: ").parent(spreadContainer);
    this.SprayCanSizeSlider = createSlider(1, 100, SprayCanSize); // min, max, default
    this.SprayCanSizeSlider.parent(spreadContainer);
    this.SprayCanSizeSlider.input(() => {
        SprayCanSize = this.SprayCanSizeSlider.value(); // Update the variable's value
        spreadValueLabel.html(SprayCanSize); // Update the displayed current value
    });

    // Label to display the current spread value
    var spreadValueLabel = createSpan(SprayCanSize.toString()).parent(spreadContainer);
    spreadValueLabel.style("margin-left", "10px"); // Add some spacing

    // Create a container for the points slider and its value
    var pointsContainer = createDiv().parent(select(".options"));
    pointsContainer.style("margin-top", "30px");

    // Create the points slider label and slider
    var pointsSliderLabel = createSpan("Spray Can points: ").parent(pointsContainer);
    this.SprayCanPointsSlider = createSlider(1, 100, SprayCanPoints); // min, max, default
    this.SprayCanPointsSlider.parent(pointsContainer);
    this.SprayCanPointsSlider.input(() => {
        SprayCanPoints = this.SprayCanPointsSlider.value(); // Update the variable's value
        pointsValueLabel.html(SprayCanPoints); // Update the displayed current value
    });

    // Label to display the current points value
    var pointsValueLabel = createSpan(SprayCanPoints.toString()).parent(pointsContainer);
    pointsValueLabel.style("margin-left", "10px"); // Add some spacing
	};
}