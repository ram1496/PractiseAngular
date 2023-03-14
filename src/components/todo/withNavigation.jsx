import { useNavigate } from "react-router-dom";
 
function withNavigation(Component) {
  //{...props} spread operator pass each element of array as arguments
  return props => <Component {...props} navigate={useNavigate()} />;
}
 
export default withNavigation