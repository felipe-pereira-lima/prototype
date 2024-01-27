import { formatDate, formatDateFromNow } from "./format-date";

describe("formatDate", () => {
  it("should format the date with time when showTime is true", () => {
    const date = new Date("2022-01-27T12:30:00");
    const formattedDate = formatDate(date, { showTime: true });
    expect(formattedDate).toEqual(expect.stringContaining("12:30:00"));
  });

  it("should format the date without time when showTime is false", () => {
    const date = new Date("2022-01-27T12:30:00");
    const formattedDate = formatDate(date, { showTime: false });
    expect(formattedDate).toEqual(expect.not.stringContaining(":"));
  });

  it("should handle undefined input gracefully", () => {
    const formattedDate = formatDate(undefined);
    expect(formattedDate).toBe("");
  });

  it("should handle invalid date input gracefully", () => {
    const formattedDate = formatDate("invalid-date");
    expect(formattedDate).toBe("");
  });
});

describe("formatDateFromNow", () => {
  it("should format the date from now", () => {
    const date = new Date("2022-01-27T12:30:00");
    const formattedDate = formatDateFromNow(date);
    expect(formattedDate).toEqual(expect.stringContaining("ago"));
  });

  it("should handle undefined input gracefully", () => {
    const formattedDate = formatDateFromNow(undefined);
    expect(formattedDate).toBe("");
  });
});
