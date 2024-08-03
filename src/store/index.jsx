import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './Slices/FetchJobsSlice';
import formReducer from './Slices/FormJobsSlice';
import userReducer from './Slices/usersSlice' ;
import companiesReducer from './Slices/companiesSlice'
import savedJobsReducer from './Slices/savedJobsSlice'; 
import appliedJobsReducer from "./Slices/AppliedJobsSlice"

const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        jobForm: formReducer,
        users: userReducer,
        companies : companiesReducer,
        savedJobs: savedJobsReducer,
        appliedJobs : appliedJobsReducer

    },
  });
  
  export default store;
  