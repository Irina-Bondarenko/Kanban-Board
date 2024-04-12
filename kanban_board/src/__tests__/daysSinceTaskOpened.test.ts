import daysSinceTaskOpened from "../helpres/daysSinceTaskOpened";

describe("daysSinceTaskOpened", () => {
  it("should return 0 if the task was opened today", () => {
    const today = new Date();
    expect(daysSinceTaskOpened(today)).toBe(0);
  });

  it("should return 1 if the task was opened yesterday", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(daysSinceTaskOpened(yesterday)).toBe(1);
  });

  it("should return 7 if the task was opened a week ago", () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    expect(daysSinceTaskOpened(oneWeekAgo)).toBe(7);
  });

  it("should return 30 if the task was opened a month ago (assuming 30 days in a month)", () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
    expect(daysSinceTaskOpened(oneMonthAgo)).toBe(30);
  });
});
