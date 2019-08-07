import os
import shutil

from PIL import Image, ImageDraw

if os.path.exists('pieces'):
  shutil.rmtree('pieces')
os.mkdir('pieces')
image = Image.open('hero_oh_hero.png')
x1, y1, slice_width, slice_height, right_gap, bottom_gap = (
    5, 3, 91, 117, 11, 5)
source_width, source_height = image.size
for x in range(x1, source_width, slice_width + right_gap):
  for y in range(y1, source_height, slice_height + bottom_gap):
    piece = image.crop((x, y, x + slice_width, y + slice_height))
    piece.save('pieces/{x}x{y}.png'.format(**locals()))
