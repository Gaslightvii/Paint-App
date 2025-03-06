// My own code
function shapesTool() {
    this.name = "Shapes";
    this.icon = "assets/shapes.png";
    this.thicknessSlider = null;

    var currentShape = [];
    var isFinishingShape = false;
    var editMode = false;
    var draggingPoint = null;
    
    // Function to check if the mouse is within the canvas bounds
    function mousePressOnCanvas(canvas) {
        
        var rect = canvas.elt.getBoundingClientRect();
        return (
            mouseX >= rect.left &&
            mouseX <= rect.right &&
            mouseY >= rect.top &&
            mouseY <= rect.bottom
        );
    }

    this.draw = function () {
        updatePixels();
        noFill();
        
        var canvas = select("canvas");
        strokeWeight(thickness);
        
        // Add points if mouse is pressed within canvas bounds
        if (mouseIsPressed && mousePressOnCanvas(canvas) && !isFinishingShape && !editMode) 
        {
            //  Use mouseX and mouseY without offsets
            currentShape.push({ x: mouseX, y: mouseY });
        }

        // Keypress to finish shape
        if (keyIsPressed && key === "f") {
            isFinishingShape = true; // Temporarily block updates
            
            // Finalize and draw the shape permanently
            beginShape();
            for (var i = 0; i < currentShape.length; i++) {
                vertex(currentShape[i].x, currentShape[i].y);
            }
            endShape();

            // Finalize the shape
            loadPixels(); // Save the canvas state
            currentShape = []; // Clear the shape array
            isFinishingShape = false; // Allow updates again
        }
        
        // Keypress to edit shape
        if (keyIsPressed && key === "e") {
            editMode = true; // Temporarily block updates
            // Small circles on vertices
            fill(0, 255, 0);
            strokeWeight(0);
            ellipse(mouseX, mouseY, 15, 15);
            
        }
        if (editMode == true) {
            for(var i = 0; i < currentShape.length; i++){
                if(dist(currentShape[i].x, currentShape[i].y, mouseX, mouseY) < 15){
                    currentShape[i].x = mouseX;
                    currentShape[i].y = mouseY;
                }
            }
        }
        
        // Draw the current shape
        beginShape();
        for (var i = 0; i < currentShape.length; i++) {
            
            vertex(currentShape[i].x, currentShape[i].y);
            if(editMode){
                fill(255, 0, 0);
                strokeWeight(0);
                ellipse(currentShape[i].x, currentShape[i].y, thickness + 7);
                noFill();
                strokeWeight(thickness);
            }
        }
        endShape();
        editMode = false;
    };

    // When the tool is deselected, update the pixels to show the drawing and clear options
    this.unselectTool = function () {
        updatePixels();
        select(".options").html(""); // Clear options
    };

    // Adds options to the interface
    this.populateOptions = function () {
        // Clear options
        select(".options").html("");

        // Add instructions for finishing shape and editting shape
        var instructions = createP(
                            "Hold 'E' to edit the shape. " +
                            "If the mouse is within 15 pixels of a vertex, it will move.<br>" +
                            "Press 'F' to finish the shape." 
                            );
        instructions.parent(select(".options"));
        instructions.style("margin-top", "0px");
        
        // Create a container for the slider and its value
        var sliderContainer = createDiv().parent(select(".options"));
        sliderContainer.style("margin-top", "10px");
		
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