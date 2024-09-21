export const convertToUnixTimestamp = (date: any) => {
  const dateObj = new Date(date);
  const unixTimestamp = Math.floor(dateObj.getTime() / 1000);
  return unixTimestamp;
};

export const formatUnixTimestamp = (unixTimestamp: number): string => {
  const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
};
