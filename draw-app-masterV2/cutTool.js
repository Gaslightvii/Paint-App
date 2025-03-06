function cutTool() {
    this.name = "Cut";
    this.icon = "assets/cut.png";

    var isDragging = false;
    var selectMode = 0; // 0: Draw, 1: Select/Cut, 2: Paste
    var selectedArea = { x: 0, y: 0, w: 100, h: 100 };
    var selectButton;
    var selectedPixels = { x: 0, y: 0, w: 100, h: 100 };
    var size = 50;

    var previousMouseX = -1;
    var previousMouseY = -1;
    

    this.draw = function () {
        if (selectMode === 0) {
            // Drawing mode
            if (mouseIsPressed) {
                if (previousMouseX === -1) {
                    previousMouseX = mouseX;
                    previousMouseY = mouseY;
                } else {
                    strokeWeight(thickness);
                    noFill();
                    line(previousMouseX, previousMouseY, mouseX, mouseY);
                    previousMouseX = mouseX;
                    previousMouseY = mouseY;
                }
            } else {
                previousMouseX = -1;
                previousMouseY = -1;
            }
        } 
        else if (selectMode === 1) {
            // Selection mode: Draw semi-transparent selection rectangle
            updatePixels(); // Restore the canvas before drawing the selection rectangle
            
            push();
            noStroke();
            fill(255, 0, 0, 100); // Red transparent fill
            rect(mouseX, mouseY, size * 2, size * 2);
            pop(); 
            
            if (mouseIsPressed) {
                selectedPixels = get(mouseX, mouseY, size * 2, size * 2); // Get selected area
                
                // Clear the selected area
                push();
                fill(255); 
                noStroke();
                rect(mouseX, mouseY, size * 2, size * 2);
                pop();
                
                //selectMode = 2;
            }

        } 
    };
    

    this.populateOptions = function () {
        select(".options").html("");

        selectButton = createButton("Select area");
        selectButton.parent(select(".options"));
        selectButton.style("margin-top", "40px");
        selectButton.style("width", "100px");

        selectButton.mousePressed(() => {
            if (selectMode === 0) {
                selectMode += 1;
                selectButton.html("Cut");
                loadPixels(); // Store current canvas pixels
            } 
            else if (selectMode === 1) {
                selectMode += 1;
                selectButton.html("End paste");

                updatePixels(); // Refresh canvas
            } 
            else if (selectMode === 2) {
                // End paste mode
                selectMode = 0;
                //selectedArea = { x: 0, y: 0, w: 100, h: 100 };
                //selectedPixels = null;
                selectButton.html("Select area");
                loadPixels(); // Restore canvas state
            }
        });
        
        // Create a container for the slider and its value
        var sliderContainer = createDiv().parent(select(".options"));
        sliderContainer.style("margin-top", "40px");
		
		var sliderLabel = createSpan("Size: ").parent(sliderContainer);
		
        // Create the slider
        
        this.sizeSlider = createSlider(1, 100, size); // min, max, default
        this.sizeSlider.parent(sliderContainer);
        this.sizeSlider.input(() => {
            size = this.sizeSlider.value(); // Update the size value
            valueLabel.html(size); // Update the displayed current value
        });

        // Create a label to display the current slider value
        var valueLabel = createSpan(size.toString()).parent(sliderContainer);
        valueLabel.style("margin-left", "10px"); // Add some spacing
	};


    this.mousePressed = function () {
        if (selectMode === 1) {
            //THIS DOESN'T WORK
            // Start selecting area
            selectedArea.x = mouseX;
            selectedArea.y = mouseY;
            isDragging = true;
        } else if (selectMode === 2 && selectedPixels) {
            // Paste the selected pixels at the clicked location
            image(selectedPixels, mouseX, mouseY);
        }
    };


    this.deselectTool = function () {
        selectMode = 0;
        selectedArea = { x: 0, y: 0, w: 100, h: 100 };
        selectedPixels = null;
        previousMouseX = -1;
        previousMouseY = -1;
        if (selectButton) {
            selectButton.html("Select area");
        }
    };
}