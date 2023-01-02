export default function dateComparator(dateVideo: string) {
  const date = dateVideo.slice(0, 10).split('-');
  const time = dateVideo.slice(11, dateVideo.length - 8).split(':');
  const now = new Date();
  const videoDate = new Date(
    Number(date[0]),
    Number(date[1]) - 1,
    Number(date[2]),
    Number(time[0]),
    Number(time[1]),
    0,
    0,
  );
  const passedTime = now.getTime() - videoDate.getTime();
  return passedTime;
}
