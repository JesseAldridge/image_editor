image = Image.open(image_path)
if not os.path.exists('pieces'):
  os.mkdir('pieces')
width, height = image.size
for x in range(0, width, 100):
  for y in range(0, height, 100):
    piece = image.crop((x, y, x + 100, y + 100))
    piece.save('pieces/{x}x{y}.png'.format(**locals()))