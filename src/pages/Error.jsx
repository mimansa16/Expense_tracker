import { Link, useNavigate, useRouteError } from "react-router-dom" // used for handling and displaying error msgs or status. the error msg comes from dashboard.
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid"


const Error = () => {
    const error = useRouteError()
    const navigate = useNavigate()
  return (
    <div className="error">
        <h1>Uh oh! We've got a problem.</h1>
        <p>{error.message || error.statusText}</p> 
        <div className="flex-md">
            <button 
            className="btn btn--dark" 
            onClick={() => navigate(-1)} // this will take the user to the previous page(-1). the useNavigate hook
            // keeps track of all the pages the user has visited and its order too
            >
              <ArrowUturnLeftIcon width={20} />
              <span>Go Back</span>
            </button>
            <Link
            to='/'
            className="btn btn--dark"
            >
            <HomeIcon width={20}/>
            <span>Go Home</span>
            </Link>
        </div>
    </div>
  )
}
export default Error