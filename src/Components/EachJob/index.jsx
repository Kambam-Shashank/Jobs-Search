import "./index.css";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import SimilarJobs from "../SimilarJobs";

const EachJob = () => {
  const params = useParams();
  const id = params.id;
  const [detailJobList, setDetailJobList] = useState([]);
  const [similarJobs, setSimilarJobs] = useState([]);

  useEffect(() => {
    const getJobDetails = async () => {
      const apiUrl = `https://apis.ccbp.in/jobs/${id}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("jwt_token")}`,
        },
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      console.log(data);
      const formattedData1 = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        ratings: data.job_details.rating,
        title: data.job_details.title,
        packagePerAnnum: data.job_details.package_per_annum,
        lifeAtCompanyDescription: data.job_details.life_at_company.description,
        lifeAtCompanyImage: data.job_details.life_at_company.image_url,
        skills: data.job_details.skills,
      };
      const formattedData2 = data.similar_jobs.map((eachSimilarJob) => {
        return {
          companyLogoUrl: eachSimilarJob.company_logo_url,
          employmentType: eachSimilarJob.employment_type,
          jobDescription: eachSimilarJob.job_description,
          location: eachSimilarJob.location,
          ratings: eachSimilarJob.rating,
          title: eachSimilarJob.title,
        };
      });
      setDetailJobList(formattedData1);
      setSimilarJobs(formattedData2);
    };
    getJobDetails();
  }, [id]);

  const skills = () => {
    if (!detailJobList.skills) return null;
    return detailJobList.skills.map((eachSkill, index) => (
      <div className="skills-grid" key={eachSkill.name || index}>
        <div className="skill">
          <img src={eachSkill.image_url} alt={eachSkill.name} />
          <span>{eachSkill.name}</span>
        </div>
      </div>
    ));
  };

  return (
    <div className="job-card1">
      <div className="job-header1">
        <img
          src={detailJobList.companyLogoUrl}
          alt="Netflix"
          className="netflix-logo1"
        />
        <h2 className="title1">{detailJobList.title}</h2>
        <div className="meta1">
          <span className="star1">★ {detailJobList.ratings}</span>
          <span>📍 {detailJobList.location}</span>
          <span>💼 {detailJobList.employmentType}</span>
        </div>
        <div className="salary1">{detailJobList.packagePerAnnum}</div>
      </div>

      <div className="section1">
        <div className="section-header1">
          <h3>Description</h3>
          <a href="#">Visit ↗</a>
        </div>
        <p>{detailJobList.jobDescription}</p>
      </div>

      <div className="section1">
        <h3>Skills</h3>
        <div className="skills1">{skills()}</div>
      </div>

      <div className="section1">
        <h3>Life at Company</h3>
        <div className="life1">
          <p>{detailJobList.lifeAtCompanyDescription}</p>
          <img
            src={detailJobList.lifeAtCompanyImage}
            alt="Office"
            className="office-img1"
          />
        </div>
      </div>
      <div className="section1">
  <h3>Similar Jobs</h3>
  <div className="similar-jobs-list">
    {similarJobs.map((eachJob, idx) => (
      <SimilarJobs key={idx} eachJob={eachJob} />
    ))}
  </div>
</div>
    </div>
  );
};

export default EachJob;
