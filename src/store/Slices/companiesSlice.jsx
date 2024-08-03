import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axioseConfig/instance";

// Define the initial state
const initialState = {
  companies: [],
  company: null,
  cityCompanies: [],
  companyCountInCity: 0,
  totalCompanyCount: 0,
  loading: false,
  error: null
};

// Create the asynchronous thunks
export const getAllCompanies = createAsyncThunk(
  'companies/getAllCompanies',
  async () => {
    const res = await axiosInstance.get('/companies');
    return res.data.data;
  }
);

export const getCompanyById = createAsyncThunk(
  'companies/getCompanyById',
  async (id) => {
    const res = await axiosInstance.get(`/companies/${id}`);
    return res.data.data;
  }
);

export const getByCity = createAsyncThunk(
  'companies/getByCity',
  async (city) => {
    const res = await axiosInstance.get(`/companies/city/${city}`);
    return res.data.data;
  }
);

export const countCompaniesInCity = createAsyncThunk(
  'companies/countCompaniesInCity',
  async (city) => {
    const res = await axiosInstance.get(`/companies/count/${city}`);
    return res.data.count;
  }
);

export const countAllCompanies = createAsyncThunk(
  'companies/countAllCompanies',
  async () => {
    const res = await axiosInstance.get('/companies/count-all');
    return res.data.count;
  }
);

export const postNewCompany = createAsyncThunk(
  'companies/postNewCompany',
  async (company) => {
    const res = await axiosInstance.post('/companies/signup', company);
    return res.data;
  }
);

export const loginCompany = createAsyncThunk(
  'companies/loginCompany',
  async (company) => {
    const res = await axiosInstance.post('/companies/login', company);
    return res.data;
  }
);

export const updateCompanyData = createAsyncThunk(
  'companies/updateCompanyData',
  async ({ id, companyData, token }) => {
    const res = await axiosInstance.patch(`/companies/${id}`, companyData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data.data;
  }
);

export const deleteCompanyData = createAsyncThunk(
  'companies/deleteCompanyData',
  async ({ id, token }) => {
    await axiosInstance.delete(`/companies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return id;
  }
);

// Create the slice
const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(getAllCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCompanyById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCompanyById.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(getCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getByCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(getByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.cityCompanies = action.payload;
      })
      .addCase(getByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(countCompaniesInCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(countCompaniesInCity.fulfilled, (state, action) => {
        state.loading = false;
        state.companyCountInCity = action.payload;
      })
      .addCase(countCompaniesInCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(countAllCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(countAllCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.totalCompanyCount = action.payload;
      })
      .addCase(countAllCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postNewCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(postNewCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.companies.push(action.payload);
      })
      .addCase(postNewCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loginCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(loginCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCompanyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCompanyData.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
        state.companies = state.companies.map(company =>
          company.id === action.payload.id ? action.payload : company
        );
      })
      .addCase(updateCompanyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteCompanyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCompanyData.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = state.companies.filter(company => company.id !== action.payload);
      })
      .addCase(deleteCompanyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default companiesSlice.reducer;
