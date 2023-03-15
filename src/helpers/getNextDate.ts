interface IArguments {
  day?: number
  hours?: number
  minutes?: number
  date?: Date
}

export default function getNextDate({day = 0, hours = 0, minutes = 0, date = new Date()}: IArguments) {
    const dateCopy = new Date(date.getTime());

    const nextDate = new Date(
        dateCopy.getFullYear(),
        dateCopy.getMonth(),
        dateCopy.getDate() + ((7 - dateCopy.getDay() + day) % 7 || 7),
        // hours,
        // minutes
      );

      return nextDate
}