import "./index.css";
import PropTypes from "prop-types";

const SimilarJobs = (props) => {
  const { eachJob } = props;
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    ratings,
    title,
  } = eachJob;

  return (
    <div className="similar-jobs-container2">
      <div className="jobs-grid2">
        <div className="job-card2">
          <div className="job-header2">
            <img
              src={companyLogoUrl}
              alt={title}
            />
            <h3>{title}</h3>
          </div>
          <div className="rating2">★ {ratings}</div>
          <div className="desc2">
            {jobDescription}
          </div>
          <div className="footer2">
            <span>📍 {location}</span>
            <span>💼 {employmentType}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

SimilarJobs.propTypes = {
  eachJob: PropTypes.shape({
    companyLogoUrl: PropTypes.string.isRequired,
    employmentType: PropTypes.string.isRequired,
    jobDescription: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    ratings: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default SimilarJobs;
