/**
 * Color interpolation utility
 * Interpolates between two RGB/RGBA color strings
 */
export function interpolate(
  color1: string,
  color2: string
): (progress: number) => string {
  // Parse RGB/RGBA color strings
  const parseColor = (color: string): number[] => {
    const match = color.match(
      /rgba?\((\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s*(?:\/\s*(\d+(?:\.\d+)?%?))?\)/
    );
    if (!match) return [0, 0, 0, 1];

    const r = parseFloat(match[1]);
    const g = parseFloat(match[2]);
    const b = parseFloat(match[3]);
    let a = match[4] ? parseFloat(match[4]) : 1;
    
    // Handle percentage alpha
    if (match[4]?.includes("%")) {
      a = a / 100;
    }

    return [r, g, b, a];
  };

  const c1 = parseColor(color1);
  const c2 = parseColor(color2);

  return (progress: number): string => {
    const p = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
    
    const r = Math.round(c1[0] + (c2[0] - c1[0]) * p);
    const g = Math.round(c1[1] + (c2[1] - c1[1]) * p);
    const b = Math.round(c1[2] + (c2[2] - c1[2]) * p);
    const a = c1[3] + (c2[3] - c1[3]) * p;

    return `rgb(${r} ${g} ${b} / ${a})`;
  };
}
