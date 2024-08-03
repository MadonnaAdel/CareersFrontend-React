import { useEffect, useMemo } from 'react';
import Stack from '@mui/material/Stack';
import { PieChart } from '@mui/x-charts/PieChart';
import { fetchAppliedJobsByJobSeeker } from '../../store/Slices/AppliedJobsSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './JobTrackingCircleChart.module.css';

export default function JobTrackingCircleChart() {
  const appliedJobs = useSelector((state) => state.appliedJobs.appliedJobs) || [];
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Fetch the applied jobs when the component mounts
    dispatch(fetchAppliedJobsByJobSeeker({ userId }));
  }, [dispatch, userId]);

  // Process the applied jobs data to count the number of jobs in each status category
  const chartData = useMemo(() => {
    // Initialize an object to hold the count of each status
    const statusCounts = appliedJobs.reduce((acc, job) => {
      const status = job.appliedJobStatus; // Get the job status
      if (status) {
        // Increment the count for this status
        if (acc[status]) {
          acc[status]++;
        } else {
          acc[status] = 1;
        }
      }
      return acc;
    }, {});

    // Calculate total jobs
    const totalJobs = appliedJobs.length;

    // Convert the statusCounts object into an array of { label, value, percentage } objects with colors
    const statusColors = {
      pending: "#96E3B9",
      accepted: "#01A84D",
      rejected: "#989DA6"
    };

    const chartData = Object.keys(statusCounts).map((status) => ({
      label: status,
      value: statusCounts[status],
      color: statusColors[status],
      percentage: ((statusCounts[status] / totalJobs) * 100).toFixed(2) + "%"
    }));

    return chartData;
  }, [appliedJobs]);

  return (
    <>
      <Stack className='pt-5' direction="row">
        <PieChart
          series={[
            {
              paddingAngle: 5,
              innerRadius: 60,
              outerRadius: 80,
              data: chartData,
            },
          ]}
          margin={{ right: 5 }}
          width={200}
          height={200}
          legend={{ hidden: true }}
        />
      </Stack>
      <div className={`d-flex justify-content-center align-items-center pt-5 ${styles.percentageContainer}`}>
        {chartData.map(({ label, color, percentage }) => (
          <div key={label} className='d-flex justify-content-center align-items-baseline mx-2'>
            <div style={{ width: "20px", height: "8px", backgroundColor: color, borderRadius: "5px" }}></div>
            <div className='mx-2'>
              <p className='m-0'>{label.charAt(0).toUpperCase() + label.slice(1)}</p>
              <p>({percentage})</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
