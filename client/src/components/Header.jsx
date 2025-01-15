import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Header = () => {
  const {currentUser} =useSelector(state=>state.user)
  console.log(currentUser)
  return (
    <div className='bg-red-100'>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/" ><h1 className="font-bold">Life</h1></Link>
        <ul className="flex gap-4">
        <Link to="/" ><li>Home</li></Link>
        <Link to="/about" > <li>About</li></Link>
        {/* <Link to="/sign-in" >
        {currentUser ? (<img src={currentUser.profilePicture} alt="profile" className="h-7 w-7 rounded-full object-cover"/>):(<li>SignIn</li>)}
        </Link> */}
        <Link to="/profile">
  {currentUser ? (
    <img src={currentUser.profilePicture} alt="profile" className="h-7 w-7 rounded-full object-cover"/>
  ) : (<li>SignIn</li>)}
</Link>

        </ul>
      </div>
    </div>
  )
}

export default Header