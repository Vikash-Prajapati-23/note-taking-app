import Signup from "../Signup/Signup"
import rightColumn from "../../assets/right-column.png";

const Home = () => {
  return (
    <div className="flex justify-center items-center p-2 border-[1px] w-[900px] rounded-2xl ">
      <div className="w-[40%] p-10 ">
        <Signup />
      </div>
      <div>
        <img src={ rightColumn } className="h-[600px] w-[550px] " alt="image" />
      </div>
    </div>
  )
}

export default Home
