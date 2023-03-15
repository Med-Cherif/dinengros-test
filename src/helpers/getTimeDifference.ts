export default function getTimeDifference(startDate: Date, endDate: Date) {

    const startTimestamp = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate).getTime();

    let milliseconds = endTimestamp - startTimestamp;

    if (milliseconds <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    }
  
    let days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    milliseconds -= days * (1000 * 60 * 60 * 24);
  
    let hours = Math.floor(milliseconds / (1000 * 60 * 60));
    milliseconds -= hours * (1000 * 60 * 60);
  
    let minutes = Math.floor(milliseconds / (1000 * 60));
    milliseconds -= minutes * (1000 * 60);
  
    let seconds = Math.floor(milliseconds / 1000);
  
    return {
        days,
        hours,
        minutes,
        seconds
    };
  }