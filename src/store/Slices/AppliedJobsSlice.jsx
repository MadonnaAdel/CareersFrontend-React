import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axioseConfig/instance';

export const fetchAppliedJobsByJobSeeker = createAsyncThunk(
  'appliedJobs/fetchAppliedJobsByJobSeeker',
  async ({ userId, page, limit }) => {
    const response = await axiosInstance.get(`/appliedJobs/get/${userId}`, { params: { page, limit } });
    return response.data.data;
  }
);

export const getAllAppliedJobsByJobId = createAsyncThunk(
  'appliedJobs/getAllAppliedJobsByJobId',
  async ({ jobId }) => {
    const response = await axiosInstance.get(`/appliedJobs/${jobId}`);
    return response.data.data;
  }
);

export const countAppliedJobsByUser = createAsyncThunk(
  'appliedJobs/countAppliedJobsByUser',
  async ({ userId }) => {
    const response = await axiosInstance.get(`/appliedJobs/counts/${userId}`);
    return response.data.count;
  }
);

export const applyForJob = createAsyncThunk(
  'appliedJobs/applyForJob',
  async ({ userId, jobId, FirstAnswer, SecondAnswer, thirdAnswer, FourthAnswer }, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/appliedJobs', {
        userId, jobId, FirstAnswer, SecondAnswer, thirdAnswer, FourthAnswer
      });
      console.log('Response:', response.data);
      return response.data.data._id;
    } catch (error) {
      if (error.response) {
        console.error('Response error:', error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
      } else if (error.request) {
        console.error('Request error:', error.request);
        return thunkAPI.rejectWithValue('No response received from server');
      } else {
        console.error('Error:', error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const deleteAppliedJob = createAsyncThunk(
  'appliedJobs/deleteAppliedJob',
  async (applicationId) => {
    const response = await axiosInstance.delete(`/appliedJobs/${applicationId}`);
    return response.data.data;
  }
);

const appliedJobsSlice = createSlice({
  name: 'appliedJobs',
  initialState: {
    appliedJobs: [],
    appliedJob: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyForJob.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(applyForJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appliedJobs=action.payload;
      })
      .addCase(applyForJob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchAppliedJobsByJobSeeker.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppliedJobsByJobSeeker.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appliedJobs = action.payload;
      })
      .addCase(fetchAppliedJobsByJobSeeker.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteAppliedJob.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAppliedJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appliedJobs = state.appliedJobs.filter(
          (job) => job._id !== action.meta.arg
        );
      })
      .addCase(deleteAppliedJob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getAllAppliedJobsByJobId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllAppliedJobsByJobId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload;
      })
      .addCase(getAllAppliedJobsByJobId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(countAppliedJobsByUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(countAppliedJobsByUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload;

      })
      .addCase(countAppliedJobsByUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default appliedJobsSlice.reducer;

