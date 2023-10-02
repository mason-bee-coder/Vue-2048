const COLORS = {
  2: '#eee4da',
  4: '#eee1c9',
  8: '#f3b27a',
  16: '#f69664',
  32: '#f77c5f',
  64: '#f75f3b',
  128: '#edd073',
  256: '#edcc62',
  512: '#edc950',
  1024: '#edc950',
  2048: '#edc950'
}

const TEXT_COLORS = {
  2: '#776e65',
  4: '#776e65',
  8: '#776e65',
  16: '#776e65',
  32: '#776e65',
  64: '#fff',
  128: '#776e65',
  256: '#776e65',
  512: '#776e65',
  1024: '#776e65',
  2048: '#776e65'
}

export const getColor = (value: number) => (COLORS as any)[value] ?? '#edc950'
export const getTextColor = (value: number) => (TEXT_COLORS as any)[value] ?? '#776e65'
