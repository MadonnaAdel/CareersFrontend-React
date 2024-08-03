import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import { fetchAppliedJobsByJobSeeker } from "../../store/Slices/AppliedJobsSlice";
import { useDispatch, useSelector } from "react-redux";
import  Style  from "./JobSeekerChart1.module.css"
import { width } from "@mui/system";

export default function JobTrackingChart() {
  const appliedJobs =
    useSelector((state) => state.appliedJobs.appliedJobs) || [];
  const dispatch = useDispatch();
  const userId =localStorage.getItem('userId')

  useEffect(() => {
    dispatch(fetchAppliedJobsByJobSeeker({ userId }));
  }, [dispatch, userId]);

  const chartData = useMemo(() => {
    const statusCounts = appliedJobs.reduce((accumulator, job) => {
      const status = job.appliedJobStatus; 
      if (status) {
        if (accumulator[status]) {
          accumulator[status]++;
        } else {
          accumulator[status] = 1;
        }
      }
      return accumulator; 
    }, {}); 

    
    return {
      
      labels: Object.keys(statusCounts),
      data: Object.values(statusCounts),
  
    };
  }, [appliedJobs]);

  const barChartsParams = {
    
    series: [
      {

        id: "applied-jobs",
        data: chartData.data,
        highlightScope: {
          highlighted: "item",
        },
  
      },
    ],
    xAxis: [{ data: chartData.labels, scaleType: "band", id: "axis1" }],
    height: 400,
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 0, md: 4 }}
      sx={{ width: "100%" }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <BarChart
          {...barChartsParams}
          onItemClick={(event, d) => setItemData(d)}
          onAxisClick={(event, d) => setAxisData(d)}
        />
      </Box>
    </Stack>
  );
}
