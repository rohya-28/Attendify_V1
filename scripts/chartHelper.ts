export const processWeeklyAttendanceData = (
  data: { dayOfWeek: number; totalAttendance: number }[]
) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Initialize the bar data for each day of the week
  const barData = days.map(
    (label) =>
      ({
        label,
        value: 0,
        frontColor: "#d1d5db", // default gray color for zero values
        gradientColor: "#d1d5db", // default gray color for zero values
      }) as any
  );

  data.forEach((item) => {
    const dayIndex = item.dayOfWeek;

    if (dayIndex >= 0 && dayIndex < 7) {
      // Set the value for the day
      barData[dayIndex].value = item.totalAttendance;

      // Apply color thresholds
      if (item.totalAttendance > 200) {
        barData[dayIndex].frontColor = "#00ff00"; // Green for >300
        barData[dayIndex].gradientColor = "#00ff00"; // Green gradient for >300
      } else if (item.totalAttendance > 150) {
        barData[dayIndex].frontColor = "#ffab00"; // Orange for >200
        barData[dayIndex].gradientColor = "#ffab00"; // Orange gradient for >200
      } else if (item.totalAttendance > 100) {
        barData[dayIndex].frontColor = "#ff0000"; // Red for >100
        barData[dayIndex].gradientColor = "#ff0000"; // Red gradient for >100
      } else {
        barData[dayIndex].frontColor = "#d1d5db"; // Gray for <=100
        barData[dayIndex].gradientColor = "#d1d5db"; // Gray gradient for <=100
      }
    } else {
      console.error(`Invalid day of week index: ${item.dayOfWeek}`);
    }
  });

  return barData;
};
