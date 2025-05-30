import { Link } from "react-router";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router";
import "./index.css";

const Header = () => {
  const navigate = useNavigate()

  const onLogoutClick = () => {
    navigate('/login')
    Cookies.remove('jwt_token')
  }
  const onLogoClick = () => {
    navigate('/')
  }

  return (
    <div className="heading-container1">
      <div className="logo-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="header-logo-image"
          onClick={onLogoClick}
        />
      </div>
      <ul className="header-list-container">
        <li className="header-list-item">
          <Link className="header-list-item" to="/">Home</Link>
        </li>
        <li className="header-list-item">
          <Link className="header-list-item" to="/jobs">Jobs</Link>
        </li>
      </ul>
      <div className="button-container">
        <button type="button" className="logout-button" onClick={onLogoutClick}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default Header;
