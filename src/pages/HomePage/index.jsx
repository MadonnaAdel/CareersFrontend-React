import WhyChooseUs from "../../Sections/WhyChooseUsSection";
import JobCategories from "../../component/JobCategories/JobCategories";
import JobFinder from "../../component/JobFinder/JobFinder";
import JobSeeker from "../JobSeeker";


const HomePage = () => {
  return (
    <>
    
      <JobSeeker />
      <JobCategories />
      <JobFinder />
      <WhyChooseUs />
    </>
  );
};

export default HomePage;
