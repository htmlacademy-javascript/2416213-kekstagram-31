const checkMeetingTime = (
  timeStartWork,
  timeEndWork,
  timeStartMeeting,
  durationMeeting
) => {
  const timesArray = [timeStartWork, timeEndWork, timeStartMeeting];
  const timeInMinutesArray = [];
  for (let i = 0; i < 3; i++) {
    const partTime = timesArray[i].split(':');
    const timeInMinutes = Number(partTime[0]) * 60 + Number(partTime[1]);
    timeInMinutesArray.push(timeInMinutes);
  }
  return (
    timeInMinutesArray[2] >= timeInMinutesArray[0] &&
    timeInMinutesArray[2] + durationMeeting <= timeInMinutesArray[1]
  );
};

checkMeetingTime('08:00', '17:30', '14:00', 90); // true
checkMeetingTime('8:0', '10:0', '8:0', 120); // true
checkMeetingTime('08:00', '14:30', '14:00', 90); // false
checkMeetingTime('14:00', '17:30', '08:0', 90); // false
checkMeetingTime('8:00', '17:30', '08:00', 900); // false
