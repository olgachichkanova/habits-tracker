import React from "react";
import { Row, Col, Progress } from "antd";
import { getProgressData, getWeekDays, IDate } from "../../helper";
import { IProgressData } from "../../types";

export const ProgressTab = () => {
  const daysOfWeek: IDate[] = getWeekDays();

  const progressData: IProgressData = getProgressData();

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
