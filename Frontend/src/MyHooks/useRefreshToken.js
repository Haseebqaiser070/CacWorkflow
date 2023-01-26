// import useAuth from './useAuth';

// const useRefreshToken = () => {
//     const { setAuth } = useAuth();
//     const refresh = async () => {
//         const response = await axios.get("http://localhost:4000/Auth/check",{withCredentials:true})
//         console.log(response)
//         setAuth(prev => {
//             return {
//                 ...prev,
//                 Email: response.data.Email,
//                 Roles: response.data.Roles
                
//             }
//         });
//         return response.data.Email;
//     }
//     return refresh;
// };

// export default useRefreshToken;