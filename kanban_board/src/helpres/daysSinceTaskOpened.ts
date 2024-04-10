const daysSinceTaskOpened = (openedDateString: Date): number => {
  const today = new Date();
  const openedDate = new Date(openedDateString);

  const openedTime = openedDate.getTime();
  const todayTime = today.getTime();

  const differenceInMs = todayTime - openedTime;

  const daysSinceOpened = Math.round(differenceInMs / (1000 * 60 * 60 * 24));

  return daysSinceOpened;
};

export default daysSinceTaskOpened;
