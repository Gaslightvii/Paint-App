
function jigsawTool(){
	//set an icon and a name for the object
	this.icon = "assets/jigsaw.jpg";
	this.name = "Jigsaw";
    
    var allowedSquares = [4, 9, 16, 25, 36, 49, 64, 81, 100];
    var numberOfPieces = allowedSquares[0];
    var dropdown; 
    var jumbleButton;
    
    this.draw = function()
    {
        
    };
    
    // Ensure the options container is cleared
	this.populateOptions = function() 
	{
    	select(".options").html(""); 
	
       // Dropdown menu for selecting jigsaw size
        var dropdownContainer = createDiv().parent(select(".options"));
        dropdownContainer.style("margin-top", "20px");

        var dropdownLabel = createSpan("Select jigsaw size: ").parent(dropdownContainer);

        dropdown = createSelect().parent(dropdownContainer); // Store dropdown for later use
        for (i = 0; i < allowedSquares.length; i++) {
            dropdown.option(allowedSquares[i]); // Add each option to the dropdown
        }

        // Handle dropdown selection changes
        dropdown.changed(() => {
            numberOfPieces = int(dropdown.value()); // Get the selected value from the dropdown menu
        });
        
        // Button to jumble
        // Add a "Jumble" button
        jumbleButton = createButton("Jumble"); // Create the button
        jumbleButton.parent(select(".options")); // Attach it to the .options container
        jumbleButton.style("margin-top", "20px"); // Add some spacing

        jumbleButton.mousePressed(() => {
            
            this.jumblePieces(); // Call the jumblePieces method when clicked
            });
    };
        
    // Define the jumblePieces method
    this.jumblePieces = function() {
        
    // Calculate the number of rows and columns
    var gridSize = Math.sqrt(numberOfPieces);
    
    // Get the width and height of each piece
    var pieceWidth = width / gridSize;
    var pieceHeight = height / gridSize;

    // Array to hold the pieces
    var pieces = [];

    // Take each piece from the canvas
    for (var row = 0; row < gridSize; row++) {
        for (var col = 0; col < gridSize; col++) {
            var x = col * pieceWidth;
            var y = row * pieceHeight;
            pieces.push(get(x, y, pieceWidth, pieceHeight));
        }
    }

    // Shuffle the pieces (Fisher-Yates Shuffle)
    for (var i = pieces.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }

    // Redraw the shuffled pieces onto the canvas
    var index = 0;
    for (var row = 0; row < gridSize; row++) {
        for (var col = 0; col < gridSize; col++) {
            var x = col * pieceWidth;
            var y = row * pieceHeight;
            image(pieces[index], x, y, pieceWidth, pieceHeight);
            index++;
            }   
        }   
    };
}