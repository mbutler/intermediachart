// get width and height of window
w = $("#canvas-div").width();
h = window.innerHeight;

// create a wrapper around native canvas element (with id="canvas")
var canvas = new fabric.Canvas('canvas');
canvas.setHeight(h);
canvas.setWidth(w);
canvas.setBackgroundColor('rgba(255, 73, 64, 0.6)', canvas.renderAll.bind(canvas)); //pink

// create the main Intermedia circle
mainCircle = new fabric.Circle({
  radius: 	            w / 4, 
  fill:                 'transparent', 
  centeredScaling:      "true",
  stroke: 	            'black',
  strokeWidth:          7,
  left: 	              w / 4, 
  top: 		              100,
  selectable:           false,
});

console.log(mainCircle.radius);
textPos = mainCircle.left + mainCircle.radius + 200;

// add circle to canvas
canvas.add(mainCircle);
currentCircle = false;

// function for onClick event
function addCircle() { 
 circle = new fabric.Circle({
   radius:            mainCircle.radius / 6, 
   fill:              'transparent', 
   centeredScaling:   "true",
   stroke:            'black',
   strokeWidth:       1,
   left:              100, 
   top:               100,
   lockRotation:      true,
   hasRotatingPoint:  false,
   originX:           'center'
 });



 label = new fabric.IText('now is the time', {
  left: 0, 
  top: 0,
  editable: true,
  hasRotatingPoint:  false,
  isEditing: true,

 });


circle.toggle(currentCircle)



 canvas.add(circle);
 canvas.add(label);

 circle.on("object:selected", function() {
  label.left = circle.left;

 });


}

var intermediaTitle = new fabric.Text('Intermedia', { 
  left: mainCircle.radius * 3, 
  top: 100,
  fontWeight: 'bold',
  angle: 48,
  selectable: false,
  fontSize: mainCircle.radius / 8,
});
canvas.add(intermediaTitle);

canvas.on('object:selected', function() {

})




canvas.on('object:moving', function(options) {
  label.left = circle.left;
  console.log("label left:" + label.left + " circle:" + circle.left);
  label.top = circle.top;
  console.log("label top:" + label.top + " circle:" + circle.top);
});






