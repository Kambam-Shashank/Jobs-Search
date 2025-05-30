import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ClockLoader from 'react-spinners/ClockLoader'


import JobsCard from "../JobsCard";
import "./index.css";
import Header from "../Header";
import ProfileCard from "../ProfileCard";


const Jobs = () => {
  const [profileDetailsList, setProfileDetailsList] = useState([]);
  const [searchInput,setSearchInput] = useState('')
  const [employmentType, setEmploymentType] = useState([])
  const [salary,setSalary] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const profileDetailsList = async () => {
      const employmentTypeParams = employmentType.join(',')
      const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeParams}&minimum_package=${salary}&search=`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt_token")}`,
        },
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      const formattedData = data.jobs.map((eachJob) => ({
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        ratings: eachJob.ratings,
        title: eachJob.title,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
      }));
      setProfileDetailsList(formattedData);
      setIsLoading(false)
    };
    profileDetailsList();
  }, [employmentType, salary]);

  const onSearchChange = (event) => {
    setSearchInput(event.target.value)
  }

  const onEmploymentTypeChange =(event) => {
    const {value, checked} = event.target
    setEmploymentType((prev) => checked ? [...prev, value] : prev.filter((type) => type !== value))
  }

  const onSalaryChange = (event) => {
    setSalary(event.target.value)
  }

  const filteredList = profileDetailsList.filter((eachProfile) =>
    eachProfile.title.toLowerCase().includes(searchInput.toLowerCase())
  )

  const renderJobDetails = () => (
     <div className="error-section">
            {filteredList.map((eachProfile) => (
              <JobsCard key={eachProfile.id} eachProfile={eachProfile} />
            ))}
          </div>
  )

  const renderLoader = () => (
    <div className="loading-container">
      <ClockLoader color="#fff"/>
    </div>
  )

  return (
    <div className="Header">
      <Header />
      <div className="container">
        <aside className="sidebar">
          <ProfileCard />
          <br />

          <div className="filters">
            <h3>Type of Employment</h3>
            <label>
              <input type="checkbox" onChange={onEmploymentTypeChange} value="FULLTIME" /> Full Time
            </label>
            <label>
              <input type="checkbox" onChange={onEmploymentTypeChange} value="PARTTIME" /> Part Time
            </label>
            <label>
              <input type="checkbox" onChange={onEmploymentTypeChange} value="FREELANCE" /> Freelance
            </label>
            <label>
              <input type="checkbox" onChange={onEmploymentTypeChange} value="INTERNSHIP" /> Internship
            </label>
            <br />

            <h3>Salary Range</h3>
            <label>
              <input type="radio" name="salary" onChange={onSalaryChange} value="1000000" /> 10 LPA and above
            </label>
            <label>
              <input type="radio" name="salary" onChange={onSalaryChange} value="2000000" /> 20 LPA and above
            </label>
            <label>
              <input type="radio" name="salary" onChange={onSalaryChange} value="3000000" /> 30 LPA and above
            </label>
            <label>
              <input type="radio" name="salary" onChange={onSalaryChange} value="4000000" /> 40 LPA and above
            </label>
          </div>
        </aside>
        <main className="main-content">
          <div className="search-bar">
            <input type="text" placeholder="Search" onChange={onSearchChange} value={searchInput}/>
            <button className="search-btn">Search</button>
          </div>
          {isLoading ? renderLoader() : renderJobDetails()}
        </main>
      </div>
    </div>
  );

  

};

//  <img
//           src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
//           alt="Error Illustration"
//         />
//         <h1>Oops! Something Went Wrong</h1>
//         <p>We cannot seem to find the page you are looking for.</p>
//         <button className="retry-btn">Retry</button>

export default Jobs;
