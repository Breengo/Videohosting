export default function timeConverter(time: number) {
  if (time > 3600) {
    let hours = Math.floor(time / 3600).toString();
    if (Number(hours) < 10) {
      hours = '0' + hours;
    }
    let minutes = Math.floor((time % 3600) / 60).toString();
    if (Number(minutes) < 10) {
      minutes = '0' + minutes;
    }
    let seconds = Math.floor((time % 3600) % 60).toString();
    if (Number(seconds) < 10) {
      seconds = '0' + seconds;
    }
    return `${hours}:${minutes}:${seconds}`;
  }
  if (time >= 60) {
    let minutes = Math.floor((time % 3600) / 60).toString();
    if (Number(minutes) < 10) {
      minutes = '0' + minutes;
    }
    let seconds = Math.floor((time % 3600) % 60).toString();
    if (Number(seconds) < 10) {
      seconds = '0' + seconds;
    }
    return `${minutes}:${seconds}`;
  }
  let seconds = time.toString();
  if (Number(seconds) < 10) {
    seconds = '0' + seconds;
  }
  return `0:${seconds}`;
}
