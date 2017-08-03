$(function() {

  function getShapeData(formArray) {
    shapeData = {};
    formArray.forEach(function(pair) {
      shapeData[pair['name']] = pair['value'];
    })

    return shapeData;
  }

  function createShape(shapeData) {
    var $shape = $('<div />', {
                   'class': shapeData['class'],
                   data: shapeData,
                   css: { left: +shapeData['starting-x'], 
                          top: +shapeData['starting-y'], } 
                  });
    if (shapeData['class'] !== 'star') { 
      $shape.css({ 'background-color': randomColor() });
    }
    return $shape;
  }

  function resetShapes($shapes) {
    $shapes.each(function(i) {
      var self = $(this);
      self.css({ left: +self.data()['starting-x'],
                 top: +self.data()['starting-y'],});
    });
  }

  function animateShapes($shapes) {
    $shapes.each(function(i) {
      var self = $(this);
      self.animate({
        left: +self.data()['ending-x'],
        top: +self.data()['ending-y'],
      }, +self.data()['duration'])
    }); 
  }

  function randomize(maxNum) {
    return Math.floor(Math.random() * (maxNum + 1));
  }

  function randomColor() {
    var HEX = '0123456789abcdef';
    var hexColor = '#';
    for (var i = 0; i < 6; i++) { hexColor += HEX[randomize(15)] }

    return hexColor;
  }

  function randomizeShapeData() {
    return {
      'class': ['star', 'circle', 'square'][randomize(2)],
      'starting-x': randomize(860),
      'starting-y': randomize(460),
      'ending-x': randomize(860),
      'ending-y': randomize(460),
      'duration': randomize(10000),
    }
  }

  $('#custom form').submit(function(event) {
    event.preventDefault();
    var shapeData = getShapeData($(this).serializeArray());
    var $newShape = createShape(shapeData);
    $('#canvas').append($newShape);
  });

  $('#random form').submit(function(event) {
    event.preventDefault();
    var numOfShapes = $(this).serializeArray()[0]['value']
    for (var i = 0; i < numOfShapes; i++) {
      var $newShape = createShape(randomizeShapeData());
      $('#canvas').append($newShape);
    }
  });

  $('#controls').click(function(e) {
    e.preventDefault();
    var $shapes = $('#canvas > div');
    $shapes.stop();

    if ($(e.target).html() === 'Start') {
      resetShapes($shapes);
      animateShapes($shapes)
    }
  });
});