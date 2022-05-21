export const GetFormattedDate = (date: string) => {
  if (date) {
    const dateFromString = new Date(date);
    return `${dateFromString.getDate()}/${
      dateFromString.getMonth() + 1
    }/${dateFromString.getFullYear()} ${dateFromString.toLocaleTimeString()}`;
  }
  return "";
};
