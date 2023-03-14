// const dayStart = "07:30";
// const dayEnd = "17:45";

// // start time (in 24-hour format as a string "hh:mm")
// // meeting duration (number of minutes).
// function scheduleMeeting(startTime, durationMinutes) {
//   const [startHour, startMinute] = startTime
//     .split(":")
//     .map((item) => Number(item));

//   if (startHour < 7) return false;
//   if (startHour === 7 && startMinute < 30) return false;

//   function addMinutesToTime(hour, minutes, minutestoadd) {
//     let newHour = hour;
//     let newMinutes = minutes;
//     const totalminutes = minutes + minutestoadd;
//     if (totalminutes >= 60) {
//       newMinutes = totalminutes - 60;
//       newHour += 1;
//     } else {
//       newMinutes = totalminutes;
//     }
//     return { newHour, newMinutes };
//   }
//   const { newHour, newMinutes } = addMinutesToTime(
//     startHour,
//     startMinute,
//     durationMinutes
//   );

//   if (newHour > 17) return false;
//   if (newHour === 17 && newMinutes > 45) return false;
//   console.log(newHour, newMinutes);
//   return { newHour, newMinutes };
// }

// scheduleMeeting("7:00", 15); // false
// scheduleMeeting("07:15", 30); // false
// scheduleMeeting("7:30", 30); // true
// scheduleMeeting("11:30", 60); // true
// scheduleMeeting("17:00", 45); // true
// scheduleMeeting("17:30", 30); // false
// scheduleMeeting("18:00", 15); // false

/** 
The range(..) function takes a number as its first argument, representing the first number in a desired range of numbers.
The second argument is also a number representing the end of the desired range (inclusive).
If the second argument is omitted, then another function should be returned that expects that argument.
*/
function range(start, end) {
  let firstNumber = start;
  let endNumber = end;

  let array = [];
  if (endNumber >= 0) {
    if (endNumber < 1) {
      console.log("end0", array);
      return array;
    }
    for (let i = firstNumber; i <= endNumber; i++) {
      array.push(i);
    }
    console.log("endVar", array);
    return array;
  }
  return (end) => {
    let array2 = [];
    for (let i = firstNumber; i <= end; i++) {
      array2.push(i);
    }
    console.log("endYok2", array2);
    return array;
  };
}

range(3, 3); // [3]
range(3, 8); // [3,4,5,6,7,8]
range(3, 0); // []

var start3 = range(3);
var start4 = range(4);

start3(3); // [3]
start3(8); // [3,4,5,6,7,8]
start3(0); // []

start4(6); // [4,5,6]
