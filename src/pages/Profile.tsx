import { useEffect, useState } from 'react'
import ErrorAlert from '../components/ErrorAlert'
import { getUserProfile } from '../services/userService'


function Profile() {
  interface User {
    id: number
    name: string
    surname: string
    role: string
    course: string
    email: string
    active: boolean
    accepNotifications: boolean
  }

    const [user, setUser] = useState<User>()
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      async function call() {
        try {
          const findUser = await getUserProfile()
          findUser && setUser(findUser)
        } catch (error) {
          const msg = error instanceof Error ? error.message : 'Error desconocido'
          setMessage(msg)
        } finally {
          setLoading(false)
        }
      }
      call()
    }, [])

    if (loading) return <div className='flex mx-auto justify-center'>
    <div role="status">
      <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
      <span className="sr-only">Loading...</span>
    </div>
  </div>


  return <>
      <ErrorAlert>{message}</ErrorAlert>


<div className="w-full mx-auto max-w-lg p-4 flex flex-col gap-2 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="text-xl font-medium mb-5 text-gray-900 dark:text-white">Informacion de usuario</h5>
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre:</label>
            <label  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
              {user?.name}</label>
        </div>
        <div>
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
            <label  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
              {user?.email}</label>
        </div>
        <div>
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rol:</label>
            <label  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
              {user?.role}</label>
        </div>
        <div>
            <label  className="inline me-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Activo:</label>
            <span>{user?.active?'✔':'❌'}</span>
        </div>
        <div>
            <label  className="inline me-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Recibir notificaciones:</label>
            <span>{user?.accepNotifications?'✔':'❌'}</span>
            <button className="text-white bg-blue-700 ms-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Dejar de recibir notifiaciones</button>
        </div>
       

</div>

  </>
}

export default Profile