
function stampTool() {
    this.name = "Stamp";
    this.icon = "assets/stamp.png";
    // Default stamp image
    this.image = loadImage('./assets/stamps/stamp.png'); 
    this.stampSizeSlider = null;

    var stamps;
    var stampSize = 20;

    var stampImages = {
        "Default": './assets/stamps/stamp.png',
        "Star": './assets/stamps/star.png',
        "Heart": './assets/stamps/heart.png',
        "Smile": './assets/stamps/smile.png'
    };
    
    var dropdown; 

    this.draw = function() {
        if (mouseIsPressed) {
            var stampsX = mouseX - stampSize / 2;
            var stampsY = mouseY - stampSize / 2;
            image(this.image, stampsX, stampsY, stampSize + 10, stampSize + 10);
        }
    };

    this.populateOptions = function() {
        // Clear any previous options
        select(".options").html("");

        // Create a container for the slider and its value
        var sliderContainer = createDiv().parent(select(".options"));
        sliderContainer.style("margin-top", "20px");

        var sliderLabel = createSpan("Stamp size: ").parent(sliderContainer);
        
        // Create the slider
        this.stampSizeSlider = createSlider(1, 100, stampSize); // min, max, default
        this.stampSizeSlider.parent(sliderContainer);
        this.stampSizeSlider.input(() => {
            stampSize = this.stampSizeSlider.value(); // Update the stamp size
            valueLabel.html(stampSize); // Update the displayed current value
        });

        // Create a label to display the current slider value
        var valueLabel = createSpan(stampSize.toString()).parent(sliderContainer);
        valueLabel.style("margin-left", "10px"); // Add some spacing
        
        // Dropdown menu for selecting stamp images
        var dropdownContainer = createDiv().parent(select(".options"));
        dropdownContainer.style("margin-top", "20px");

        var dropdownLabel = createSpan("Select Stamp: ").parent(dropdownContainer);

        dropdown = createSelect().parent(dropdownContainer); // Store dropdown for later use
        for (var name in stampImages) {
            dropdown.option(name); // Add each option to the dropdown
        }

        // Handle dropdown selection changes
        dropdown.changed(() => {
            var selected = dropdown.value(); // Get the selected value from the dropdown menu
            this.image = loadImage(stampImages[selected]); // Load the selected image
        });

        // File input for uploading custom images
        var uploadContainer = createDiv().parent(select(".options"));
        uploadContainer.style("margin-top", "20px");

        var uploadLabel = createSpan("Upload Your Image: ").parent(uploadContainer);

        var fileInput = createFileInput((file) => handleFile(file, this)).parent(uploadContainer);
        fileInput.style("margin-left", "10px");
    };

    // Function to handle uploaded files
    function handleFile(file, context) {
        if (file.type === "image") {
            // Generate a unique key for the new image
            var customImageKey = "Uploaded Image";

            // Add the new image to the stampImages object
            stampImages[customImageKey] = file.data;

            // Add the new option to the dropdown
            dropdown.option(customImageKey);

            // Automatically set the new image as the active stamp
            context.image = loadImage(file.data);
            dropdown.value(customImageKey); // Update dropdown to show the new selection
        } else {
            alert("This is not a valid image file.");
        }
    }
}
