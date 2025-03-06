// Global variables that will store the toolbox colour palette
// and the helper functions.
var toolbox = null;
var colourP = null;
var helpers = null;

var backgroundColour;
var thickness = 1;
var tooltip;


function setup() {
    // Create a canvas to fill the content div from index.html.
    canvasContainer = select('#content');
    var c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
    c.parent("content");
        
    backgroundColour = 255;

    // Create helper functions and the colour palette.
    helpers = new HelperFunctions();
    colourP = new ColourPalette();

    // Create a toolbox for storing the tools.
    toolbox = new Toolbox();

    // Add the tools to the toolbox.
    toolbox.addTool(new FreehandTool());
    toolbox.addTool(new LineToTool());
    toolbox.addTool(new SprayCanTool());
    toolbox.addTool(new mirrorDrawTool());
    toolbox.addTool(new stampTool());
    toolbox.addTool(new shapesTool());
	toolbox.addTool(new jigsawTool());
    toolbox.addTool(new cutTool());
    background(backgroundColour);
    
    tooltip = document.getElementById('tooltip'); // tooltip element
}

function draw() {
    // Call the draw function from the selected tool.
    // hasOwnProperty is a JavaScript function that tests
    // if an object contains a particular method or property.
    // If there isn't a draw method, the app will alert the user.
    if (toolbox.selectedTool.hasOwnProperty("draw")) {
        toolbox.selectedTool.draw();
    } else {
        alert("It doesn't look like your tool has a draw method!");
    }
    
    // Display the hovered tool name
    if (toolbox.hoveredToolName) {
        tooltip.innerHTML = toolbox.hoveredToolName;
        tooltip.style.display = 'block';
        
        tooltip.style.left = (mouseX+40) + 'px';
        tooltip.style.top = (mouseY) + 'px';
    } 
    else if (colourP.hoveredColourName){
        tooltip.innerHTML = colourP.hoveredColourName;
        tooltip.style.display = 'block';

        tooltip.style.left = (mouseX + 40) + 'px';
        tooltip.style.top = (mouseY) + 'px';
    }
    else {
        tooltip.style.display = 'none';
    }
}
