//init////////////////

intermediaChart = new Firebase('https://flickering-fire-8187.firebaseio.com/');


// get width and height of window
w = $("#canvas-div").width();
h = window.innerHeight;

//reload canvas on window resize
$( window ).resize(function() {
  location.reload();
});

// create a wrapper around native canvas element (with id="canvas")
var canvas = new fabric.Canvas('canvas');
canvas.setHeight(h);
canvas.setWidth(w);
canvas.setBackgroundColor('rgba(0, 0, 0, 00)', canvas.renderAll.bind(canvas)); //pink

// create the main intermedia circle
mainCircle = new fabric.Circle({
  radius:               w / 4, 
  fill:                 'transparent', 
  centeredScaling:      "true",
  stroke:               'black',
  strokeWidth:          7,
  left:                 w / 4, 
  top:                  100,
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


// add main circle and intermedia title to canvas
canvas.add(mainCircle);
canvas.add(intermediaTitle);

//TODO: populate with circles from firebase, if there are any


//ADD CIRCLE/////////////////////////////////////////////
// function for onClick event in dom button. index.html
function addCircle() {   

  labelText = $('#circleinput').val();

  
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
       
     });  

     label = new fabric.Text(labelText, {
      
      left:               10, //padding left from circle's originX 
      top:                -25, //padding center from circle's originY
      fontSize:           18,
      hasRotatingPoint:   false, 

     });

      // IText doesn't work well, especially attached to objects. Just set label value externally and Group for now.
      circleLabelGroup = new fabric.Group([ circle, label ], {
          
        //set position of group on canvas
        left: 100,
        top: 100,
        hasRotatingPoint:  false, 

      }); // end circleLabelGroup

  //add labeled circle group to the canvas
  canvas.add(circleLabelGroup);

  //get the local object as json
  var circleObj = circleLabelGroup.toObject();
  //push the object to firebase and get its firebase ID
  var circleObjId = intermediaChart.push(circleObj);
  //set local name the same as remote name
  circleLabelGroup.name = circleObjId.name();

} //end addCircle


  canvas.on('object:modified', function(object) {
    
    //get the remote circle with the same name as the one modified locally
    var firebaseCircle = intermediaChart.child(object.target.name); 
    //get local object as json
    var clientCircle = object.target.toObject();
    //update remote values with local values
    firebaseCircle.update({

      scaleX: clientCircle.scaleX,
      scaleY: clientCircle.scaleY,
      top:    clientCircle.top,
      left:   clientCircle.left,

    });       
    
  });