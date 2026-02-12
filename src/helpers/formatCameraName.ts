export function formatCameraName(value: string) {
    const number = value.split("_")[1];
    return `Camera ${parseInt(number, 10)}`;
  }