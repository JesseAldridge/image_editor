import os
import shutil

from PIL import Image, ImageDraw

if os.path.exists('pieces'):
    shutil.rmtree('pieces')
os.mkdir('pieces')
image = Image.open('1.png')
x, y, slice_width, slice_height, right_gap, bottom_gap = (
    1019, 123, 41.6, 14.4, 0, 12.9)
source_width, source_height = image.size
slice_width, slice_height = 176, 126
for x in range(139, source_width, slice_width + right_gap):
    for y in range(0, source_height, slice_height + bottom_gap):
        piece = image.crop((x, y, x + slice_width, y + slice_height))
        piece.save('pieces/{x}x{y}.png'.format(**locals()))
