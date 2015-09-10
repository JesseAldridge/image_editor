
var main_con = $('.main_container')
var view_x = 10, view_y = 10, view_width = main_con.width(), view_height = main_con.height()

var image_width = $('img').width(),
    image_height = $('img').height()

// (the minimap canvas is actually the size of the whole image, scaled down by css.)
$('#mini_canvas').attr('width', image_width)
$('#mini_canvas').attr('height', image_height)

function after_draw_image() {
  draw_minimap()
}

function drag_mini(e) {
  var mini_canvas = $('#mini_canvas')
  var mini_x = e.pageX - mini_canvas.position().left,
      mini_y = e.pageY - mini_canvas.position().top
  view_x = mini_x / mini_canvas.width() * image_width - view_width / 2
  view_y = mini_y / mini_canvas.height() * image_height - view_height / 2

  // Keep view in bounds

  if(view_x < 0)
    view_x = 0
  if(view_y < 0)
    view_y = 0
  if(view_x + view_width > image_width)
    view_x = image_width - view_width
  if(view_y + view_height > image_height)
    view_y = image_height - view_height

  $('#main_canvas').offset({left:-view_x * zoom, top:-view_y * zoom})
  draw_minimap()
}

$(document).on('mousedown', '#mini_canvas', function(e) {
  $(document).on('mousemove', drag_mini)
  drag_mini(e)
})
.on('mouseup', function(e) {
  $(document).unbind('mousemove')
})

function draw_minimap() {
  var canvas = $("#mini_canvas")
  var ctx = canvas[0].getContext("2d")
  ctx.drawImage($('img')[0],0,0)
  ctx.lineWidth = 10
  ctx.strokeStyle = 'red'
  ctx.strokeRect(view_x, view_y, view_width, view_height)
}
