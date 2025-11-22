export const formatTime = (seconds: number) => {
    const min = Math.floor(seconds/60);
    const sec = seconds%60;
    let time = '';
    if(min<10)
      time = `0${min}`;
    else
      time = `${min}`;

    if(sec < 10)
      time += `:0${sec%60}`;
    else
      time += `:${sec%60}`;

    return time;
  }