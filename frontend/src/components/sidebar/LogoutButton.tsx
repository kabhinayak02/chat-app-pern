import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";
import MyProfileButton from "./MyProfileButton";

const LogoutButton = () => {
	const { logout } = useLogout();

	return (
		<div className='mt-auto flex justify-between'>
			<MyProfileButton/>
			<div className="flex items-center justify-center">
				<LogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
			</div>

		</div>
	);
};
export default LogoutButton;
