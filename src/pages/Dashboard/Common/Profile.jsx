import toast from 'react-hot-toast'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import useTitle from '../../../components/Usetitle/useTitle'
import useAuth from '../../../hooks/useAuth'
import useRole from '../../../hooks/useRole'

const Profile = () => {
  useTitle('My Profile')
  const { user, setUser, logOut } = useAuth();
  const {role, isRoleLoading} = useRole();

  if(isRoleLoading){
    return <LoadingSpinner></LoadingSpinner>
  }

  const handleLogOut = () => {
      logOut()
        .then(() => {
          toast.success("Logout Successfully!!");
          setUser(null);
        })
        .catch((e) => {
          toast.error(e.message);
        });
    };
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-base-100 shadow-lg rounded-2xl md:w-4/5 lg:w-3/5'>
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
            />
          </a>

          <p className='p-2 px-4 text-xs text-white bg-pink-500 rounded-full'>
            {role}
          </p>
          <p className='mt-2 text-xl font-medium text-base-content '>
            User Id: {user?.uid}
          </p>
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
              <p className='flex flex-col text-base-content'>
                Name
                <span className='font-bold text-base-content '>
                  {user?.displayName}
                </span>
              </p>
              <p className='flex flex-col text-base-content'>
                Email
                <span className='font-bold text-base-content '>{user?.email}</span>
              </p>

              <div className='flex gap-6 p-4'>
                <button className='btn btn-gradient'>
                  Update Profile
                </button>
                <button className='btn btn-outline'>
                  Change Password
                </button>
                <button onClick={handleLogOut} className='btn btn-gradient'>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
