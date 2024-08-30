import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyProfileButton = () => {
    const { authUser } = useAuthContext();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/myprofile');
    }

    return (
        <div className="flex gap-2 items-center justify-start p-2 bg-white shadow-md rounded-lg cursor-pointer" onClick={handleClick}>
            <div>
                <div className='w-5 md:w-7 rounded-full overflow-hidden'>
                    <img src={authUser?.profilePic} alt='user avatar' />
                </div>
            </div>

            <div className='flex flex-col flex-1'>
                <div className='flex gap-3 justify-between'>
                    <p className='font-bold text-gray-700 text-sm md:text-md'>{authUser?.fullname}</p>
                </div>
            </div>
        </div>
    );
}

export default MyProfileButton;
