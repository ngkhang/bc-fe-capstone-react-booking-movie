export const formatDate = (isoStr) => {
  const date = new Date(isoStr);

  const formatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour12: false, // Ensures 24-hour format (HH)
  });

  const parts = formatter.formatToParts(date).reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});

  return `${parts.hour}:${parts.minute} ${parts.day}/${parts.month}/${parts.year}`;
};
