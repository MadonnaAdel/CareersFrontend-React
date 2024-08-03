import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './../../axioseConfig/instance';

// Define asynchronous thunk actions
export const getAllFormJobs = createAsyncThunk('jobForm/getAllFormJobs', async () => {
  const res = await axiosInstance.get('/additionalQuestions');
  return res.data;
});

// Get form by job ID
export const getFormByJobId = createAsyncThunk('jobForm/getFormByJobId', async (id) => {
  const res = await axiosInstance.get(`/additionalQuestions/${id}`);
  return res.data;
});

export const postForm = createAsyncThunk('jobForm/postForm', async (newFormData) => {
  const res = await axiosInstance.post('/additionalQuestions', newFormData);
  return res.data;
});

export const updateForm = createAsyncThunk('jobForm/updateForm', async ({ updateId, updatedFormData }) => {
  const res = await axiosInstance.put(`/additionalQuestions/${updateId}`, updatedFormData);
  return res.data;
});

export const deleteForm = createAsyncThunk('jobForm/deleteForm', async (id) => {
  const res = await axiosInstance.delete(`/additionalQuestions/${id}`);
  return res.data;
});

// Create a slice for jobForm
const formSlice = createSlice({
  name: 'jobForm',
  initialState: {
    jobForms: [],
    jobForm: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getAllFormJobs
      .addCase(getAllFormJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFormJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobForms = action.payload;
      })
      .addCase(getAllFormJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle getFormByJobId
      .addCase(getFormByJobId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFormByJobId.fulfilled, (state, action) => {
        state.loading = false;
        state.jobForm = action.payload;
      })
      .addCase(getFormByJobId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle postForm
      .addCase(postForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postForm.fulfilled, (state, action) => {
        state.loading = false;
        state.jobForms.push(action.payload);
      })
      .addCase(postForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle updateForm
      .addCase(updateForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateForm.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.jobForms.findIndex((form) => form.id === action.payload.id);
        if (index !== -1) {
          state.jobForms[index] = action.payload;
        }
      })
      .addCase(updateForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle deleteForm
      .addCase(deleteForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteForm.fulfilled, (state, action) => {
        state.loading = false;
        state.jobForms = state.jobForms.filter((form) => form.id !== action.payload);
      })
      .addCase(deleteForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default formSlice.reducer;
