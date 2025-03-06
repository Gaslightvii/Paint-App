function ColourPalette() {
    // A list of web colour strings.
    this.colours = ["black", "silver", "white", "red", "blue", "yellow", "green", "purple",
        "orange"];
    this.colourNames = ["Black", "Silver", "White", "Red", "Blue", "Yellow", "Green", "Purple", "Orange"];
    
    // Make the start colour black.
    this.selectedColour = "black";
    this.hoveredColourName = null;

    var self = this;

    var colourClick = function() {
        // Remove the old border.
        var current = select("#" + self.selectedColour + "Swatch");
        current.style("border", "0");

        // Get the new colour from the ID of the clicked element.
        var c = this.id().split("Swatch")[0];

        // Set the selected colour and fill and stroke.
        self.selectedColour = c;
        fill(c);
        stroke(c);

        // Add a new border to the selected colour.
        this.style("border", "2px solid blue");
    };

    // Load in the colours.
    this.loadColours = function() {
        // Set the fill and stroke properties to black at the start of the program.
        fill(this.colours[0]);
        stroke(this.colours[0]);

        // For each colour, create a new div in the HTML for the colourSwatches.
        for (var i = 0; i < this.colours.length; i++) {
            var colourID = this.colours[i] + "Swatch";

            // Using p5.js, add the swatch to the palette and set its background colour
            var colourSwatch = createDiv();
            colourSwatch.class('colourSwatches');
            colourSwatch.id(colourID);
            colourSwatch.colourIndex = i;

            select(".colourPalette").child(colourSwatch);
            select("#" + colourID).style("background-color", this.colours[i]);
            colourSwatch.mouseClicked(colourClick);
            
            // Hover event listeners
            colourSwatch.mouseOver(function() {
                self.hoveredColourName = self.colourNames[this.colourIndex];
            });

            colourSwatch.mouseOut(function() {
                self.hoveredColourName = null;
            });
        }
        
        select(".colourSwatches").style("border", "2px solid blue");
    };

    // Function to reload the colour swatches
    this.reloadColours = function() {
        // Clear existing swatches
        selectAll(".colourSwatches").forEach(function(swatch) {
            swatch.remove();
        });

        // Reload swatches
        for (var i = 0; i < self.colours.length; i++) {
            var colourID = self.colours[i] + "Swatch";

            var colourSwatch = createDiv();
            colourSwatch.class('colourSwatches');
            colourSwatch.id(colourID);
            colourSwatch.colourIndex = i;

            select(".colourPalette").child(colourSwatch);
            select("#" + colourID).style("background-color", self.colours[i]);
            colourSwatch.mouseClicked(colourClick);
            
            // Hover event listeners
            colourSwatch.mouseOver(function() {
                self.hoveredColourName = self.colourNames[this.colourIndex];
            });

            colourSwatch.mouseOut(function() {
                self.hoveredColourName = null;
            });
        }
    };

    // Create a container for the colour picker and button (only once)
    var customColourContainer = createDiv();
    customColourContainer.class("customColourContainer");
    select(".colourPalette").child(customColourContainer);

    // Create a colour picker
    var colourPicker = createInput("#000000", "color"); // Default to black
    colourPicker.class("colourPicker");
    customColourContainer.child(colourPicker);

    // Button to add the selected colour
    var addButton = createButton("Add Colour");
    addButton.class("addButton");
    customColourContainer.child(addButton);

    // Event listener to add the new colour
    addButton.mouseClicked(function() {
        var newColour = colourPicker.value();
        if (newColour) {
            // Add the new colour to the list
            self.colours.push(newColour);
            
            // Name for user-inputted colour
            var newColourName = "Custom Colour " + (self.colours.length - 9);
            self.colourNames.push(newColourName);

            // Reload the colours to display the new swatch
            self.reloadColours();
        }
    });

    // Call the loadColours function now it is declared.
    this.loadColours();
}
