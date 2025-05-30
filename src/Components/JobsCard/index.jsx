import "./index.css";
import PropTypes from "prop-types";
import { Link } from "react-router";

const JobsCard = (props) => {
  const { eachProfile } = props;
  const {
    jobDescription,
    location,
    packagePerAnnum,
    ratings,
    title,
    companyLogoUrl,
    employmentType,
    id
  } = eachProfile;
  return (
    <Link to={`/jobs/${id}`} className="link">
    <div className="job-card">
      <div className="job-top">
        <div className="image">
          <img src={companyLogoUrl} alt="logo" className="job-logo" />
        </div>
        <div className="heading">
        <h2 className="job-title">{title}</h2>
        <span className="job-star">⭐{ratings}</span>
        </div>
      </div>
      <div className="job-meta">
        <span>📍 {location}</span>
        <span>💼 {employmentType}</span>
      </div>
      <p className="job-description">{jobDescription}</p>
      <div className="job-salary">{packagePerAnnum}</div>
    </div>
    </Link>
  );
};

JobsCard.propTypes = {
  eachProfile: PropTypes.object.isRequired,
};

export default JobsCard;
