import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { GrFormSearch } from "react-icons/gr";
import styles from './style.module.css';
import Horizontal from '../../component/RangeSlider';
import JobCard from '../../component/JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from '../../store/Slices/FetchJobsSlice';
import {DebounceInput} from 'react-debounce-input';
import ReactDOM from 'react-dom';
const BrowseJobs = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [jobTypes, setJobTypes] = useState([]);
    const [jobLevels, setJobLevels] = useState([]);
    const [Range, setRange] = useState({ mn: 0, mx: 10000 });
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const dispatch = useDispatch();
    const jobs = useSelector((state) => state.jobs.jobs);
    const loading = useSelector((state) => state.jobs.loading);
    const error = useSelector((state) => state.jobs.error);
     

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategories(prev =>
            prev.includes(value) ? prev.filter(cat => cat !== value) : [...prev, value]
        );
    };

    const handleJobTypeChange = (e) => {
        const value = e.target.value;
        setJobTypes(prev =>
            prev.includes(value) ? prev.filter(type => type !== value) : [...prev, value]
        );
    };

    const handleJobLevelChange = (e) => {
        const value = e.target.value;
        setJobLevels(prev =>
            prev.includes(value) ? prev.filter(level => level !== value) : [...prev, value]
        );
    };

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
    };

    const filterJobs = () => {
        let filtered = [...jobs];

        if (categories.length > 0) {
            filtered = filtered.filter(job => categories.includes(job.JobCategory));
        }

        if (jobLevels.length > 0) {
            filtered = filtered.filter(job => jobLevels.includes(job.jobLevel));
        }

        if (jobTypes.length > 0) {
            filtered = filtered.filter(job => jobTypes.includes(job.JoblocationType));
        }

        if (Range.mn !== 0 || Range.mx !== 10000) {
            filtered = filtered.filter(job => job.salary.from >= Range.mn && job.salary.to <= Range.mx);
        }

        if (searchInput) {
            filtered = filtered.filter(job => job.JobTitle.toLowerCase().includes(searchInput.toLowerCase()));
        }

        if (selectedLocation) {
            filtered = filtered.filter(job => job.jobLocation.State === selectedLocation);
        }

        setFilteredJobs(filtered);
    };

    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);

        if (value) {
            const filteredSuggestions = jobs.filter(job =>
                job.JobTitle.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchInput(suggestion.JobTitle);
        setSuggestions([]);
        filterJobs();
    };

    useEffect(() => {
        if (!loading && !error && jobs.length === 0) {
            dispatch(getAllJobs());
        }
    }, [loading, error, jobs.length, dispatch]);

    useEffect(() => {
        filterJobs();
    }, [categories, jobLevels, jobTypes, Range, jobs, selectedLocation]);

    useEffect(() => {
        filterJobs();
    }, [searchInput]);
   
    return (
        <>


            <div className={styles.searchPart}>
    <DebounceInput
        type="text"
        className={styles.searchInput}
        placeholder="search..."
        value={searchInput}
        onChange={handleSearchInputChange}
        debounceTimeout={1000}
    />
    <div className={styles.searchForm}>
        <button className={styles.searchBtn} onClick={filterJobs}>
            <GrFormSearch />Search
        </button>
    </div>
    {suggestions.length > 0 && (
        <ul className={styles.suggestions}>
            {suggestions.map((suggestion, index) => (
                <li
                    key={index}
                    className={styles.suggestionItem}
                    onClick={() => handleSuggestionClick(suggestion)}
                >
                    {suggestion.JobTitle}
                </li>
            ))}
        </ul>
    )}
</div>


            <div className={styles.searchCountResult}><b>You have {filteredJobs.length} jobs to apply ^_^</b></div>
            <div className={`${styles.mainContent} col-lg-12`}>

                <div className={`${styles.filterSection} d-flex justify-center col-lg-4 col-md-4`}>
                    <div className={styles.filterSectionContent}>
                        <div className={`${styles.filtersectionOne} ${styles.borderBottom}`}>
                            <div className={styles.titleOne}>Location</div>
                            <select name="text" id="locationFiltration" value={selectedLocation} onChange={handleLocationChange}>
                                <option value="">Select Location</option>
                                <option value="Alexandria">Alexandria</option>
                                <option value="Al Khankah">Al Khankah</option>
                                <option value="Arish">Arish</option>
                                <option value="Aswan">Aswan</option>
                                <option value="Assiut">Assiut</option>
                                <option value="Badr">Badr</option>
                                <option value="Banha">Banha</option>
                                <option value="Beni Suef">Beni Suef</option>
                                <option value="Cairo">Cairo</option>
                                <option value="Damietta">Damietta</option>
                                <option value="el-Arab">el-Arab</option>
                                <option value="El-Mahalla El-Kubra">El-Mahalla El-Kubra</option>
                                <option value="Faiyum">Faiyum</option>
                                <option value="Giza">Giza</option>
                                <option value="Helwan">Helwan</option>
                                <option value="Hurghada">Hurghada</option>
                                <option value="Kafr El Sheikh">Kafr El Sheikh</option>
                                <option value="Luxor">Luxor</option>
                                <option value="Marsa Matruh">Marsa Matruh</option>
                                <option value="Minya">Minya</option>
                                <option value="New Cairo">New Cairo</option>
                                <option value="Obour">Obour</option>
                                <option value="Qalyub">Qalyub</option>
                                <option value="Qena">Qena</option>
                                <option value="Quesna">Quesna</option>
                                <option value="Sadat City">Sadat City</option>
                                <option value="Sharm El Sheikh">Sharm El Sheikh</option>
                                <option value="Shibin El Kom">Shibin El Kom</option>
                                <option value="Sohag">Sohag</option>
                                <option value="6th of October City">6th of October City</option>
                            </select>
                        </div>
                        <div className={styles.filterSectionTwo}>
                            <div className={styles.titleTwo}>Category</div>
                            <label className={styles.cl_checkbox}>
                                <input type="checkbox" className={styles.checkbox} value="Programming" onChange={handleCategoryChange} />
                                <span></span>
                                Programming
                            </label>
                            <label className={styles.cl_checkbox}>
                                <input type="checkbox" className={styles.checkbox} value="Health Care" onChange={handleCategoryChange} />
                                <span></span>
                                Health Care
                            </label>
                            <br />
                            <label className={styles.cl_checkbox}>
                                <input type="checkbox" className={styles.checkbox} value="Finance" onChange={handleCategoryChange} />
                                <span></span>
                                Finance
                            </label> <br />
                            
                            <label className={styles.cl_checkbox}>
                                <input type="checkbox" className={styles.checkbox} value="Accounting" onChange={handleCategoryChange} />
                                <span></span>
                                Accounting
                            </label>
                        </div>
                        <div className={`${styles.borderBottomTwo}`}>
                            <button className={`${styles.filterbtn}`}>Show More</button>
                        </div>
                        <div className={styles.filtersectionOne}></div>
                        <div className={`${styles.filterSectionTwo} ${styles.borderBottom}`}>
                            <div className={styles.titleTwo}>Experience Level</div>
                            <label className={styles.cl_checkbox}>
                                <input type="checkbox" className={styles.checkbox} value="Fresh" onChange={handleJobLevelChange} />
                                <span></span>
                                Fresh
                            </label>
                            <br />
                            <label className={styles.cl_checkbox}>
                                <input type="checkbox" className={styles.checkbox} value="Junior" onChange={handleJobLevelChange} />
                                <span></span>
                                Junior
                            </label>
                            <br />
                            <label className={styles.cl_checkbox}>
                                <input type="checkbox" className={styles.checkbox} value="Senior" onChange={handleJobLevelChange} />
                                <span></span>
                                Senior
                            </label>
                            <br />
                            <label className={styles.cl_checkbox}>
                                <input type="checkbox" className={styles.checkbox} value="Expert" onChange={handleJobLevelChange} />
                                <span></span>
                                Expert
                            </label>
                        </div>
                        <div className={styles.titleTwo}>Salary</div>
                        <div className={styles.borderBottom}>
                            <Horizontal values={Range} onChange={setRange} />
                        </div>
                        <div className={`${styles.filterSectionTwo} `}>
                            <div className={styles.titleTwo}>Onsite/Remote</div>
                            <label className={styles.cl_checkbox}>
                                <input type="checkbox" className={styles.checkbox} value="Onsite" onChange={handleJobTypeChange} />
                                <span></span>
                                Onsite
                            </label>
                            <br />
                            <label className={styles.cl_checkbox}>
                                <input type="checkbox" className={styles.checkbox} value="Remote" onChange={handleJobTypeChange} />
                                <span></span>
                                Remote
                            </label>
                            <br />
                            <label className={styles.cl_checkbox}>
                                <input type="checkbox" className={styles.checkbox} value="Hybrid" onChange={handleJobTypeChange} />
                                <span></span>
                                Hybrid
                            </label>
                            <div>
                                <button className={`${styles.filterbtn}`} onClick={filterJobs}>Filter Now</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.candidatesSection} col-lg-8`}>
                    <div className="jobSection">
                        {loading && <div>Loading...</div>}
                        {error && <div>Error: {error}</div>}
                        {!loading && !error && filteredJobs.length === 0 && <div>No jobs available</div>}
                        {!loading && !error && 
                            filteredJobs.map(job => (
                                <JobCard
                                    id={job._id}
                                    key={job._id}
                                    companyLogo={job.companyLogo}
                                    companyName={job.companyName}
                                    title={job.JobTitle}
                                    JobCategory={job.JobCategory}
                                    JobSubCategory={job.JobSubCategory}
                                    JobType={job.JobType}
                                    description={job.description}
                                    JobHours={job.JobHours}
                                    // JoblocationType={job.JoblocationType}
                                    jobLevel={job.jobLevel}
                                    // jobLocation={job.jobLocation}
                                    jobRequirements={job.jobRequirements}
                                    skills={job.skills}
                                    timeStamp={job.timeStamp}
                                    status={job.status}
                                    state={job.jobLocation.State}
                                    government={job.jobLocation.government}
                                    salary={job.salary}
                                />
                            ))}
                    </div>
                </div>
            </div>
          
        </>
    );
};

export default BrowseJobs;
