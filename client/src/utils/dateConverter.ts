export default function dateConverter(dateVideo: string) {
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
  const years = Math.floor(passedTime / (1000 * 60 * 60 * 24 * 30 * 12));
  const months = Math.floor((passedTime / (1000 * 60 * 60 * 24 * 30)) % 12);
  const days = Math.floor((passedTime / (1000 * 60 * 60 * 24)) % 30);
  const hours = Math.floor((passedTime / (1000 * 60 * 60)) % 24) - 7;
  const minutes = Math.floor((passedTime / (1000 * 60)) % 60);
  const seconds = Math.floor((passedTime / 1000) % 60);
  if (years) {
    return `${years} years ago`;
  }
  if (!years && months) {
    return `${months} months ago`;
  }
  if (!years && !months && days) {
    return `${days} days ago`;
  }
  if (!years && !months && !days && hours) {
    return `${hours} hours ago`;
  }
  if (!years && !months && !days && !hours && minutes) {
    return `${minutes} minutes ago`;
  }
  if (!years && !months && !days && !hours && !minutes && seconds) {
    return `${seconds} seconds ago`;
  }
}
