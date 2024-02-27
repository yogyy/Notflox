function tanggal(dateStr: string | undefined) {
  const date = new Date(dateStr!);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const formatDate = (date: Date) => date.toISOString().split("T")[0];

const date = new Date();
const date2 = new Date();
date2.setDate(date.getDate() - 7);

const date3 = new Date();
date3.setFullYear(date.getFullYear() - 1);

const today = formatDate(date);
const sevenDaysAgo = formatDate(date2);
const lastYear = formatDate(date3);

export { today, sevenDaysAgo, lastYear, tanggal };
