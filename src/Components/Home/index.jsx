import { useNavigate } from 'react-router';
import Header from '../Header'

import "./index.css";

const Home = () => {

  const navigate = useNavigate()
  const OnJobsClick = () => {
    navigate('/jobs')
  }
  return (
    <div className="home-page">
        <Header/>
      <div className="home-page-container">
        <h1 className="find-jobs-heading">Find The Job That Fits Your Life</h1>
        <p className="find-description">
          Millions of people are searching for jobs, salary, company reviews.
          Find the jobs that fits your abilities and potential
        </p>
        <button className="find-jobs-button" onClick={OnJobsClick}>Find Jobs</button>
      </div>
    </div>
  );
};
export default Home;
