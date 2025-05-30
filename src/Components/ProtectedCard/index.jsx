import Cookies from 'js-cookie'
import { Navigate } from "react-router"
import PropTypes from 'prop-types';


const ProtectedCard = ({children}) => {

    const jwt_token = Cookies.get('jwt_token');
    if (jwt_token === undefined) {
        return <Navigate to='/login'/>;
    }
    return children;
}
ProtectedCard.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedCard
