import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, Typography, CardMedia} from "@mui/material";

const School = ({ title, location, imgSrc }) => {
  return (
    <Card variant="outlined" sx={{ width: 220, height: "100%" }}>
      <CardMedia
        component="img"
        height="140"
        image={imgSrc}
        alt="Purdue"
      />
      <CardContent>
        <Typography variant="h5" fontWeight={700}>{title}</Typography>
        <Typography>{location}</Typography>
      </CardContent>
    </Card>
  );
};

export default School;
