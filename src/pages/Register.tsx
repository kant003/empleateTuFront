import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import ErrorAlert from '../components/ErrorAlert'
import { registerUser } from '../services/authService'
import { CursorProgressContext } from '../contexts/cursorProgressContext'

function Register() {
  const courses = ["DAM1", "DAM2"]
  const {setCursorProgress} = useContext(CursorProgressContext)


  const [form, setForm] = useState(
    {
      name: '',
      email: '',
      password: '',
      aceptNotifications: false
    }
  )
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setCursorProgress(true)
    // mensaje por post al api del backend
    try {
      await registerUser(form.name, form.email, form.password, form.aceptNotifications)
      console.log('register successfull')
      setMessage('Register successfull')
      // Redirigir a otra pagina (ofertas)
    } catch (error) {
      console.log(error);
      const msg = error instanceof Error ? error.message : 'Error desconocido'
      setMessage(msg)
    }finally{
      setCursorProgress(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setForm({ ...form, [name]: value, })
  }


  return <>
    <ErrorAlert>{message}</ErrorAlert>
    <form className="max-w-sm lg:max-w-lg mx-auto md:grid md:grid-cols-2 gap-x-12" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre:</label>
        <input id="name" value={form.name} name='name' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" onChange={handleChange} placeholder="Angel" required />
      </div>

      <div className="mb-5">
        <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ciclo</label>
        <select id="course" name='course' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="">Elige un Ciclo</option>
          {courses.map((course, i) => <option key={i} value={course.toLocaleLowerCase()}>{course}</option>)}
        </select></div>
      <div className="mb-5 col-span-2">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input type="email" id="email" name='email' value={form.email} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" onChange={handleChange} placeholder="name@aprendetu.com" required />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input type="password" id="password" name='password' value={form.password} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" onChange={handleChange} required />
      </div>
      <div className="mb-5">
        <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repite Password</label>
        <input type="password" id="repeat-password" name='repeat-password' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" />
      </div>
      <div className="flex items-start mb-5 col-span-2">
        <label htmlFor="terms" className="ms-2 me-4 text-sm font-medium text-gray-900 dark:text-gray-300">Recibir ofertas email:</label>
        <div className="flex items-center h-5">
          <input id="terms" type="checkbox" checked={form.aceptNotifications} name='aceptNotifications' className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" onChange={handleChange} />
        </div>
      </div>
      <div className="flex items-start mb-5 col-span-2">
        <label htmlFor="terms" className="ms-2 me-4 text-sm font-medium text-gray-900 dark:text-gray-300">Acepta condiciones de uso:</label>
        <div className="flex items-center h-5">
          <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
        </div>
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrarse</button>

    </form>
  </>
}

export default Register