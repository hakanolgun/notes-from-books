const dayStart = "07:30";
const dayEnd = "17:45";

// start time (in 24-hour format as a string "hh:mm")
// meeting duration (number of minutes).
function scheduleMeeting(startTime, durationMinutes) {
  const [startHour, startMinute] = startTime
    .split(":")
    .map((item) => Number(item));

  if (startHour < 7) return false;
  if (startHour === 7 && startMinute < 30) return false;

  function addMinutesToTime(hour, minutes, minutestoadd) {
    let newHour = hour;
    let newMinutes = minutes;
    const totalminutes = minutes + minutestoadd;
    if (totalminutes >= 60) {
      newMinutes = totalminutes - 60;
      newHour += 1;
    } else {
      newMinutes = totalminutes;
    }
    return { newHour, newMinutes };
  }
  const { newHour, newMinutes } = addMinutesToTime(
    startHour,
    startMinute,
    durationMinutes
  );

  if (newHour > 17) return false;
  if (newHour === 17 && newMinutes > 45) return false;
  console.log(newHour, newMinutes);
  return { newHour, newMinutes };
}

scheduleMeeting("7:00", 15); // false
scheduleMeeting("07:15", 30); // false
scheduleMeeting("7:30", 30); // true
scheduleMeeting("11:30", 60); // true
scheduleMeeting("17:00", 45); // true
scheduleMeeting("17:30", 30); // false
scheduleMeeting("18:00", 15); // false
