import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './../../axioseConfig/instance';

// Define asynchronous thunk actions
export const getAllJobs = createAsyncThunk('jobs/getAllJobs', async () => {
    const res = await axiosInstance.get('/jobs/get');
    return res.data.jobs;
});

export const getJobsBySalary = createAsyncThunk('jobs/getJobsBySalary', async () => {
    const res = await axiosInstance.get('/jobs/getJobsBySalary');
    return res.data.jobs;
});


export const getJobById = createAsyncThunk('jobs/getJobById', async (id) => {
    const res = await axiosInstance.get(`/jobs/get/${id}`);
    return res.data.foundedJob;
});


export const getJobsByCompanyName = createAsyncThunk('jobs/getJobsByCompanyName', async (companyName) => {
    const res = await axiosInstance.get(`/jobs/getCompany/${companyName}`);
    return res.data.jobs;
});
export const getAllJobsByCompanyId = createAsyncThunk('jobs/getAllJobsByCompanyId', async (companyId) => {
    const res = await axiosInstance.get(`/jobs/getAllJobsByCompanyId/${companyId}`);
    console.log('his is slice', res.data.jobs);
    return res.data.jobs;
});

export const filterJobsByLocationState = createAsyncThunk('jobs/filterJobsByLocationState', async (state) => {
    const res = await axiosInstance.get(`/jobs//FilterJobsByLoactionState/${state}`);
    return res.data.jobs;
});

export const getJobsByLocationGovernment = createAsyncThunk('jobs/getJobsByLocationGovernment', async (government) => {
    const res = await axiosInstance.get(`/jobs/FilterJobsByLoactionGovernment/${government}`);
    return res.data.Jobs;
});


export const countJobs = createAsyncThunk('jobs/countJobs', async () => {
    const res = await axiosInstance.get('/jobs/countAll');
    return res.data.count;
});

export const countByState = createAsyncThunk('jobs/countByState', async (state) => {
    const res = await axiosInstance.get(`/jobs/CountByState/${state}`);
    return res.data.JobCount;
});

export const countByCompanyName = createAsyncThunk('jobs/countByCompanyName', async (companyName) => {
    const res = await axiosInstance.get(`/jobs/CountByCompanyName/${companyName}`);
    return res.data.count;
});

export const postJob = createAsyncThunk('jobs/postJob', async (jobData) => {
    const res = await axiosInstance.post('/jobs/create', jobData);
    return res.data;
});


//filter the range of salary
export const filterSalary = createAsyncThunk('jobs/filter', async ({ minBudget, maxBudget }) => {
    const res = await axiosInstance.patch(`/jobs/filter`, { minBudget, maxBudget });
    return res.data;
})



export const updateJob = createAsyncThunk('jobs/updateJob', async ({ id, updatedJob }) => {
    const res = await axiosInstance.patch(`/jobs/update/${id}`, updatedJob);
    return res.data;
});

export const deleteJob = createAsyncThunk('jobs/deleteJob', async (id) => {
    const res = await axiosInstance.delete(`/jobs/delete/${id}`);
    return res.data;
});

export const deleteAllJobs = createAsyncThunk('jobs/deleteAllJobs', async () => {
    const res = await axiosInstance.delete('/jobs/delete');
    return res.data;
});

// Create a slice for jobs
const jobsSlice = createSlice({
    name: 'jobs',
    initialState: {
        jobs: [],
        job: {},
        count: 0,
        loading: false,
          status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(getAllJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getJobById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getJobById.fulfilled, (state, action) => {
                state.loading = false;
                state.job = action.payload;
            })
            .addCase(getJobById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getJobsByCompanyName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getJobsByCompanyName.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(getJobsByCompanyName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getAllJobsByCompanyId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllJobsByCompanyId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.jobs = action.payload;
            })
            .addCase(getAllJobsByCompanyId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


            .addCase(filterJobsByLocationState.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(filterJobsByLocationState.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(filterJobsByLocationState.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getJobsByLocationGovernment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getJobsByLocationGovernment.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = action.payload;
            })
            .addCase(getJobsByLocationGovernment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(countJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(countJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload;
            })
            .addCase(countJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(countByState.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(countByState.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload;
            })
            .addCase(countByState.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(countByCompanyName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(countByCompanyName.fulfilled, (state, action) => {
                state.loading = false;
                state.count = action.payload;
            })
            .addCase(countByCompanyName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteJob.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteAllJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAllJobs.fulfilled, (state) => {
                state.loading = false;
                state.jobs = [];
            })
            .addCase(deleteAllJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(postJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postJob.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs.push(action.payload);
            })
            .addCase(postJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateJob.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.jobs.findIndex(job => job.id === action.payload.id);
                if (index !== -1) {
                    state.jobs[index] = action.payload;
                }
            })
            .addCase(updateJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default jobsSlice.reducer;
