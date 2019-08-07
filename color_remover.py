import glob, os

import numpy as np
from PIL import Image

if not os.path.exists('cleaned_pieces'):
  os.mkdir('cleaned_pieces')

paths = glob.glob('slicer/pieces/*.png')
for image_index, path in enumerate(paths):
  print '{}/{} {}'.format(image_index + 1, len(paths), path)
  im = Image.open(path)
  im = im.convert('RGBA')
  data = np.array(im)

  remove_color = data[15][15]

  mask = np.all(data == remove_color, axis = -1)
  data[mask] = [0,0,0,0]

  new_im = Image.fromarray(data)
  new_im.save(os.path.join('cleaned_pieces', '{}.png'.format(str(image_index).zfill(3))))
