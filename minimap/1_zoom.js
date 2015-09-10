
var zoom = 1

function draw_image() {
  var canvas_width = $('img').width() * zoom,
      canvas_height = $('img').height() * zoom
  $('#main_canvas').attr('width', canvas_width)
  $('#main_canvas').attr('height', canvas_height)
  var canvas = $("#main_canvas")
  var ctx = canvas[0].getContext("2d")
  ctx.imageSmoothingEnabled = false
  ctx.drawImage($('img')[0], 0, 0, canvas_width, canvas_height)
  after_draw_image()
}

function after_draw_image() {}

function move_canvas() {
  $('#main_canvas').css({left:-view_x * zoom, top:-view_y * zoom})
}

$('.zoom_input').change(function(e) {
  zoom = parseFloat($(this).val())
  move_canvas()
  draw_image()
})
