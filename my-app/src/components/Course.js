import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Course = ({ subject = "DF", title, number }) => {
  return (
    <Card variant="outlined" sx={{ width: 220, height: '100%' }}>
      <CardContent>
        <Typography>{`${subject}-${number}`}</Typography>
        <Typography>{title}</Typography>
      </CardContent>
    </Card>
  );
};

export default Course;
