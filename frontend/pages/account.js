// import useAuth from '../hooks/useAuth';
// import Login from './login';
// import UserHeader from '../components/UserHeader';
// import { useForm } from 'react-hook-form';
// import updateUser from '../api/updateUser';

export default function Account() {
  return <div></div>;
  //   // Use the auth hook to get user info and verify logged in
  //   const { isLoading, data, isError, auth } = useAuth();
  //   // Create constants
  //   const router = useRouter();
  //   const queryClient = useQueryClient();
  //   // Initialize the react form hook
  //   const { register, handleSubmit, errors } = useForm();
  //   // Create the mutation hook for updating user info
  //   const mutation = useMutation((userData) => updateUser(userData));
  //   return (
  //     <div className="flex flex-col items-center justify-center flex-grow">
  //       {isLoading ? (
  //         'Loading'
  //       ) : auth.isAuthenticated ? (
  //         <>
  //           <UserHeader data={data} auth={auth}></UserHeader>
  //         </>
  //       ) : (
  //         <Login></Login>
  //       )}
  //     </div>
  //   );
}
