import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Course = ({ subject = "DF", title, number, ...other }) => {
  return (
    <Card variant="outlined" sx={{ width: 220, height: '100%' }} {...other}>
      <CardContent>
        <Typography variant="h5" fontWeight={700}>{`${subject}-${number}`}</Typography>
        <Typography>{title}</Typography>
      </CardContent>
    </Card>
  );
};

export default Course;
