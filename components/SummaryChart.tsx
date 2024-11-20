import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { BarChart, barDataItem } from "react-native-gifted-charts";
import Card from "./Card";
import collegeService from "@/api/collegeService";
import { processWeeklyAttendanceData } from "@/scripts/chartHelper";

enum Period {
  week = "week",
  month = "month",
  year = "year",
}

interface WeekData {
  startDate: string;
  totalAttendance: number;
  lectures: { date: string; dayOfWeek: number; totalAttendance: number }[];
}

const SummaryChart = () => {
  const [chartPeriod, setChartPeriod] = React.useState<Period>(Period.week);
  const [barData, setBarData] = React.useState<barDataItem[]>([]);
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  const [currentEndDate, setCurrentEndDate] = React.useState<Date>(new Date());
  const [chartKey, setChartKey] = React.useState(0);
  const [AttendenceType, setAttendeceType] = React.useState<"Daily" | "Weekly">(
    "Weekly"
  );

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        if (chartPeriod === Period.week) {
          const { startDate, endDate } = getWeekRange(currentDate);

          setCurrentEndDate(() => new Date(endDate));
          const weeklyAttendanceData = await fetchAttendanceData(
            startDate,
            endDate,
            AttendenceType
          );
          const processedData = processWeeklyAttendanceData(
            weeklyAttendanceData,
            6
          );

          setBarData(processedData);
          setChartKey((prev) => prev + 1);
        }
      } catch (error) {}
    };
    fetchAnalyticsData();
  }, []);

  const getWeekRange = (date: Date) => {
    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
    const endOfWeek = new Date(date.setDate(startOfWeek.getDate() + 6));
    return {
      startDate: Math.floor(startOfWeek.getTime()),
      endDate: Math.floor(endOfWeek.getTime()),
    };
  };

  const fetchAttendanceData = async (
    startDate: number,
    endDate: number,
    type: "Daily" | "Weekly"
  ) => {
    try {
      // Fetch the attendance data from the API
      const response = await collegeService.getMockAnalyticsData();
      const { lectures } = response;

      // Process the data to extract attendance info per day
      const formattedResult = lectures.map((lecture: any) => {
        const dayOfWeek = new Date(lecture.date).getDay(); // Get the day of the week (0-6)

        // Sum of all student IDs in the studentsPresent array
        const totalAttendance = lecture.studentsPresent.reduce(
          (sum: number, studentId: number) => sum + studentId,
          0
        );

        return {
          date: lecture.date, // Include the date
          dayOfWeek,
          totalAttendance, // Sum of student IDs present
          studentsPresent: lecture.studentsPresent, // Include the students' array for total calculation
        };
      });

      console.log(formattedResult); // Logs the result with summed student IDs for each day

      if (type === "Daily") {
        // Filter and return all lectures for the specified day
        const currentDate = new Date(startDate).toISOString().split("T")[0];
        const lecturesForCurrentDay = formattedResult.filter(
          (item) => item.date === currentDate
        );

        return {
          date: currentDate,
          lectures: lecturesForCurrentDay,
        };
      }

      if (type === "Weekly") {
        // If "Daily", return data for each day within the date range
        return formattedResult.filter((item) => {
          const lectureDate = new Date(item.date).getTime();
          return lectureDate >= startDate && lectureDate <= endDate;
        });
      }

      return []; // Return empty if no valid type is selected
    } catch (e) {
      console.error("Error fetching attendance data:", e);
      return [];
    }
  };

  return (
    <Card style={{ marginTop: 10, width: "98%" }}>
      <BarChart
        key={chartKey}
        data={barData}
        height={200}
        width={300}
        barWidth={18}
        minHeight={3}
        barBorderRadius={3}
        spacing={20}
        noOfSections={4}
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelsVerticalShift={2}
        xAxisLabelTextStyle={{ color: "gray" }}
        yAxisTextStyle={{ color: "gray" }}
        isAnimated
        animationDuration={300}
      />
    </Card>
  );
};

export default SummaryChart;
