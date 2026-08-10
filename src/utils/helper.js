const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const dateTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const toParts = (formatter, isoStr) => {
  const date = new Date(isoStr);
  if (Number.isNaN(date.getTime())) return null;
  return formatter.formatToParts(date).reduce((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});
};

export const formatDate = (isoStr) => {
  const parts = toParts(dateFormatter, isoStr);
  return parts ? `${parts.day}/${parts.month}/${parts.year}` : "";
};

export const formatTime = (isoStr) => {
  const parts = toParts(timeFormatter, isoStr);
  return parts ? `${parts.hour}:${parts.minute}` : "";
};

export const formatDateTime = (isoStr) => {
  const parts = toParts(dateTimeFormatter, isoStr);
  return parts ? `${parts.hour}:${parts.minute} ${parts.day}/${parts.month}/${parts.year}` : "";
};

export const getYoutubeEmbedUrl = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

export const formatCurrency = (price) => {
  return new Intl.NumberFormat("vi-VN").format(price);
};
