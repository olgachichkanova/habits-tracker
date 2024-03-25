import React, { FC } from "react";
import "./Header.css";
import Button from "antd/lib/button";
import Typography from "antd/lib/typography";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import { useAuthContext } from "../../features/auth/AuthContextProvider";
import { useHistory } from "react-router-dom";

export const Header: FC = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = new Date().getDay();
  const dayOfWeek = days[currentDay];

  const { logOut } = useAuthContext();
  const history = useHistory();
  const onLogoutClick = () => {
    logOut();
    history.push("/login");
  };

  return (
    <>
      <div className="Header">
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            className="Button"
            onClick={onLogoutClick}
            icon={<LogoutOutlined />}
          />
        </div>
        <Typography.Title>
          Happy <br />
          {dayOfWeek} 🧘‍♂️
        </Typography.Title>
      </div>
    </>
  );
};
