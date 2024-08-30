import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useDeleteMyProfile from "../hooks/useDeleteMyProfile";
import useUpdateMyProfile from "../hooks/useUpdateMyProfile";

const MyProfile = () => {
    const { authUser } = useAuthContext();
    const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit modes
    const [profileData, setProfileData] = useState({
        profilePic: authUser?.profilePic,
        username: authUser?.username,
        fullname: authUser?.fullname,
    });
    const { updateMyProfile, loading } = useUpdateMyProfile();
    const { deleteMyProfile, loading: DeleteLoading } = useDeleteMyProfile();
    const navigate = useNavigate();

    const handleEditClick = () => {
        setIsEditing(true);

    };

    const handleSaveClick = async () => {
        if (authUser?.username !== profileData.username || authUser?.fullname !== profileData.fullname) {
            try {
                // Call the update profile function
                await updateMyProfile(profileData.username || "", profileData.fullname || "");

                // Refresh the page after successful update
                window.location.reload();
            } catch (error) {
                console.error("Failed to update profile:", error);
            }
        }
    
        setIsEditing(false);   
    };

    const handleBackToChatClick = () => {
        navigate('/');
    }

    const handleDeletetClick = async () => {
        const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (confirmed) {
            try {
                await deleteMyProfile();
                navigate('/login');

            } catch (error) {
                console.error("Failed to delete profile:", error);
            }
        }
    };

    const handleChangeUsername = (e: any) => {
        setProfileData({
            ...profileData, username: e.target.value
        })
    };

    const handleChangeFullname = (e: any) => {
        setProfileData({
            ...profileData, fullname: e.target.value
        })
    };

    return (
        <div className="max-w-lg mx-auto h-full w-full p-4 bg-slate-200 shadow-md rounded-lg">
            <div className="flex flex-col items-center">
                {/* Profile Picture */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4">
                    <img
                        src={profileData.profilePic}
                        alt="user avatar"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Username */}
                <div className="w-full mb-4 flex flex-row items-center justify-start">
                    <label className="block text-gray-900 font-semibold mb-1">Username: </label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="username"
                            value={profileData.username}
                            onChange={handleChangeUsername}
                            className="border rounded-md p-2 w-max bg-slate-300 text-gray-800 mx-2"
                        />
                    ) : (
                        <p className="text-lg font-medium text-gray-600 mx-2">{profileData.username}</p>
                    )}
                </div>

                {/* Full Name */}
                <div className="w-full mb-4 flex flex-row items-center justify-start">
                    <label className="block text-gray-900 font-semibold mb-1">Full Name: </label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="fullname"
                            value={profileData.fullname}
                            onChange={handleChangeFullname}
                            className="border rounded-md p-2 w-max bg-slate-300 text-gray-800 mx-2"
                        />
                    ) : (
                        <p className="text-lg font-medium text-gray-600 mx-2">{profileData.fullname}</p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2">
                    {isEditing ? (
                        <>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                disabled={loading}
                                onClick={handleSaveClick}
                            >
                                {loading ? "Loading..." : "Save"}
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                onClick={handleEditClick}
                            >
                                Edit Profile
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                                onClick={handleBackToChatClick}
                            >
                                Back to chats
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                disabled={DeleteLoading}
                                onClick={handleDeletetClick}
                            >
                                {DeleteLoading ? "Loading..." : "Delete Profile"}
                            </button>

                        </div>

                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
