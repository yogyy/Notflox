export function tanggal(dateStr: any) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const today = () => {
  return new Date().toJSON().slice(0, 10).replace(/-/g, '-');
};
