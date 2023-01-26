import { Card } from "@mui/material";
import React from "react";
import "../css/styles.css";
import CampaignIcon from "@mui/icons-material/Campaign";

export default function MeetingUpdateNotification() {
  return (
    <div
      style={{
        backgroundColor: "red",
        color: "#fff",
        textAlign: "center",
        paddingTop: 15,
        paddingBottom: 8,
        marginBottom: 15,
      }}
    >
      <h3>
        <CampaignIcon />
        New Semester please update your availability
      </h3>
    </div>
  );
}
