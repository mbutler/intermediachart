//init////////////////


// get width and height of window
w = $("#canvas-div").width();
h = window.innerHeight;



// create a wrapper around native canvas element (with id="canvas")
var canvas = new fabric.Canvas('canvas');
canvas.setHeight(h);
canvas.setWidth(w);
canvas.setBackgroundColor('rgba(255, 73, 64, 0.6)', canvas.renderAll.bind(canvas)); //pink

// create the main intermedia circle
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


// create the main intermedia title
var intermediaTitle = new fabric.Text('Intermedia', { 
  left: mainCircle.radius * 3, 
  top: 100,
  fontWeight: 'bold',
  angle: 48,
  selectable: false,
  fontSize: mainCircle.radius / 8,
});


// add circle and intermedia title to canvas
canvas.add(mainCircle);
canvas.add(intermediaTitle);


//ADD CIRCLE/////////////////////////////////////////////

//prepare id for first circle
circleNumber = 1;

// function for onClick event in dom button. index.html
function addCircle() {   

  var id = [circleNumber];
  
     circle = new fabric.Circle({

       originX:           'left',
       originY:           'center',
       radius:            mainCircle.radius / 6, 
       fill:              'transparent', 
       centeredScaling:   "true",
       stroke:            'black',
       strokeWidth:       1,
       lockRotation:      true,
       hasRotatingPoint:  false,   
       stateProperties:   id,     
       
     });  

     label = new fabric.Text("some text is \n better than \n others", {
      
      textAlign:          'left', //alignment when multiline
      left:               10, //padding left from circle's originX 
      top:                -25, //padding center from circle's originY
      fontSize:           18,
      hasRotatingPoint:   false,
      stateProperties:    id,   

     });

      // IText doesn't work well, especially attached to objects. Just set label value externally and Group for now.
      var circleLabelGroup = new fabric.Group([ label, circle ], {
          
        //set position of group on canvas
        left: 100,
        top: 100,

        hasRotatingPoint:  false, 

      }); // end circleLabelGroup

  console.log("circle: " + circle.stateProperties[0] + " label: " + label.stateProperties[0]);

  //group these and change label from dom
  canvas.add(circleLabelGroup);

  //prepare id for next circle
  circleNumber++;

  console.log(label.getBoundingRect());


} //end addCircle