import { Outlet, useLoaderData } from "react-router-dom"
import { fetchData } from "../helpers"
import wave from '../assets/wave.svg'
import Nav from "../components/Nav";

const Main = () => {
    const {userName} = useLoaderData(); //useLoaderData gives access of the received response that comes from the loader function
    // to the comp where it is called.
  return (
    <div className="layout">
        <Nav userName={userName} />
        <main>
        <Outlet />
        </main>
        <img src={wave}  alt="" />
    </div>
  )
}
export default Main


//loader function
export function mainLoader(){
 const userName = fetchData("userName");
 return {userName}
}