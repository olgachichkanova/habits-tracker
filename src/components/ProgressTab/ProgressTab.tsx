import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Progress from "antd/lib/progress";
import { getProgressData, getWeekDays, IDate } from "../../helper";
import { IProgressData } from "../../types";
import { useSelector } from "react-redux";
import { getHabits } from "../../store/selectors";

export const ProgressTab = () => {
  const daysOfWeek: IDate[] = getWeekDays();
  const habits = useSelector(getHabits);

  const progressData: IProgressData = getProgressData(habits);

  return (
    <Row justify="space-around" align="middle">
      {daysOfWeek.map((day, index) => (
        <Col span={3} className="day" key={index}>
          <Progress
            type="circle"
            percent={
              (progressData[day.name].completed /
                progressData[day.name].total) *
              100
            }
            size={40}
            format={() => (
              <div>
                <div className="day-name">{day.name}</div>
                <div className="day-date">{day.date.getDate()}</div>
              </div>
            )}
          />
        </Col>
      ))}
    </Row>
  );
};
