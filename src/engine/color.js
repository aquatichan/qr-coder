// #rrggbbaa format

export function hexToRgba(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const a = hex.length === 9 ? parseInt(hex.slice(7, 9), 16) / 255 : 1;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function rgbaToHex(rgba) {
  const [r, g, b, a] = rgba.match(/\d+/g).map(Number);
  const alpha = a !== undefined ? Math.round(a * 255) : 255;
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}${alpha.toString(16).padStart(2, '0')}`;
}