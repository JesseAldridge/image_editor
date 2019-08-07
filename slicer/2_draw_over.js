
function after_init($scope) {
  for(var key in $scope.slice_vars)
    $scope.$watch('slice_vars["()"].val'.replace('()', key),
      function(key) {
        return function(new_val, old_val) {
          console.log('change, saving')
          localStorage.setItem(key, new_val)
          $scope.draw()
        }
      }(key))

  $scope.var_keydown = function(var_obj, event) {
    // Save inputs.  Allow adjusting value with arrow keys and ctrl.

    // (40:down, 38:up, 37:left, 39:right)
    var amount = event.altKey ? .1 : 1
    function adjust(amount) {
      var_obj.val += amount
    }

    if(event.keyCode == 38)
      adjust(amount)
    else if(event.keyCode == 40)
      adjust(-amount)
  }
}

function draw_over(ctx, $scope) {
  ctx.strokeStyle = $('#alt_line_color').is(':checked') ? 'black' : 'red'
  ctx.fillStyle = $('#alt_gap_color').is(':checked') ? 'red' : 'white'

  var canvas_width = $("#my_canvas").width()
  var canvas_height = $('#my_canvas').height()

  // Draw gap rectangles.  Draw lines.

  for(var key in $scope.slice_vars) {
    var val = $scope.slice_vars[key].val
    var eval_str = 'var ' + key + ' = parseFloat(' + val + ')'
    eval(eval_str)
  }

  // Draw the gaps

  for(var row = 0; row < 30; row++)
    ctx.fillRect(x1, y1 + height * (row + 1) + ygap * row, x1 + canvas_width, ygap)

  for(var col = 0; col < 30; col++)
    ctx.fillRect(x1 + width * (col + 1) + xgap * col, y1, xgap, y1 + canvas_height)

  // Draw the lines

  for(var row = 0; row < 30; row++) {
    var y = y1 + (height + ygap) * row
    line(ctx, x1, y, x1 + canvas_width, y)
  }

  for(var col = 0; col < 30; col++) {
    var x = x1 + (width + xgap) * col
    line(ctx, x, y1, x, y1 + canvas_height)
  }

  for(var row = 0; row < 30; row++)
    for(var col = 0; col < 30; col++)
      ctx.strokeRect(
        x1 + (width + xgap) * col + 10, y1 + (height + ygap) * row + 10, 1, 1)
}
