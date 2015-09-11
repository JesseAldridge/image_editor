angular.module('myApp',[])

.controller('MyController', ['$scope', '$timeout', function($scope, $timeout) {

  $scope.slice_vars = {}
  var var_names = $scope.var_names = ['x1', 'y1', 'width', 'height', 'xgap', 'ygap']
  var_names.forEach(function(var_name) {
    $scope.slice_vars[var_name] = {default_val: 100, val: 100}
  })

  $('canvas').attr('width', $('img').width())
  $('canvas').attr('height', $('img').height())

  // Load saved input values.

  for(var i in var_names) {
    var var_obj = $scope.slice_vars[var_names[i]]
    var_obj.val = parseFloat(localStorage.getItem(var_names[i])) || var_obj.default_val
  }

  $scope.draw = function() {
    var canvas = $("#my_canvas")
    var canvas_width = canvas.width(), canvas_height = canvas.height()
    var ctx = canvas[0].getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    var img = document.getElementById("main-img")
    ctx.drawImage(img,0,0)
    draw_over(ctx, $scope)
  }

  $timeout(function() {
    $('#inputs_div > .labeled_var > input').first().focus()
    $scope.draw()
  })

  after_init($scope, $timeout)
}]);

function after_init($scope, $timeout) {
  for(var i = 0; i < 10; i++)
    $scope.draw()
}

function draw_over(ctx, $scope) {
  line(ctx, Math.random() * 10, Math.random() * 10, Math.random() * 100, Math.random() * 100)
}

function line(ctx, x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}
