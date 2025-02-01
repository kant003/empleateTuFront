import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import ErrorAlert from '../components/ErrorAlert'
import { registerOffer } from '../services/offerService'
import { getCategories } from '../services/categoryService'
import { CursorProgressContext } from '../contexts/cursorProgressContext'

function NewOffer() {

  const [form, setForm] = useState(
    {
      title: '',
      description: '',
      contactEmail: '',
      published: new Date(),
      expired: new Date(),
      active: false,
      idCategory: -1
    }
  )

  interface Category {
    id: number
    name: string
  }



  const [message, setMessage] = useState('')
  const [categories, setCategories] = useState<Category[]>([])
  const {setCursorProgress} = useContext(CursorProgressContext)




  useEffect(() => {
    async function call() {
      try {
        const categoriesList: Category[] = await getCategories()
        categoriesList.length > 0 && setCategories(categoriesList)
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Error desconocido'
      } 
    }
    call()
  }, [])


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setCursorProgress(true)
    // mensaje por post al api del backend
    try {
      await registerOffer(form.title, form.description, form.contactEmail, new Date(form.published), new Date(form.expired), form.active, form.idCategory)
      console.log('Offer register successfull')
      setMessage('Offer register successfull')
      // Redirigir a otra pagina (ofertas)
    } catch (error) {
      console.log(error);
      const msg = error instanceof Error ? error.message : 'Error desconocido'
      setMessage(msg)
    }finally{
      setCursorProgress(false)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value, name } = e.target
    setForm({ ...form, [name]: value, })
  }

  return <>
    <ErrorAlert>{message}</ErrorAlert>
    <form className="max-w-sm lg:max-w-lg mx-auto md:grid md:grid-cols-3 gap-x-12" onSubmit={handleSubmit}>
      <div className="mb-5 col-span-2">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title:</label>
        <input id="title" value={form.title} name='title' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" onChange={handleChange} placeholder="" required />
      </div>
      <div className="mb-5">
        <label htmlFor="publised" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Salario / mes</label>
        <input id="publised" name='' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" />
      </div>
      <div className="mb-5 col-span-2 row-span-2">
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripcion</label>
        <textarea id="description" name='description' rows={4} value={form.description} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" onChange={handleChange} placeholder="" required />
      </div>
      <div className="mb-5">
        <label htmlFor="contactEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email de contacto</label>
        <input type="email" id="contactEmail" name='contactEmail' value={form.contactEmail} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" onChange={handleChange} required />
      </div>
      <div className="mb-5 ">
      </div>
      <div className="mb-5 ">
        <label htmlFor="publised" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Incio publicacion</label>
        <input type="date" id="publised" name='publised' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" onChange={handleChange} required />
      </div>
      <div className="mb-5">
        <label htmlFor="expired" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fin de publicacion</label>
        <input type="date" id="expired" name='expired' className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" onChange={handleChange} required />
      </div>
      <div className="mb-5 ">
      </div>
      <div className="mb-5 col-span-2">
        <label htmlFor="idCategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoria</label>
        <select id="idCategory" value={form.idCategory} onChange={handleChange} name='idCategory' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="">Elige una categoria</option>
          {categories.map((category,i)=><option key={i} value={category.id}>{category.name}</option>)}
        </select></div>
      <div className="flex items-end mb-5">
        <label htmlFor="terms" className="ms-2 me-4 text-sm font-medium text-gray-900 dark:text-gray-300">Activo:</label>
        <div className="flex items-center h-5">
          <input id="terms" type="checkbox" checked={form.active} onChange={()=>setForm({...form,active:!form.active})} className="w-4 h-4 cursor-pointer border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
        </div>
      </div>
      <button type="submit" className="mt-10 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Añadir</button>

    </form>
  </>
}

export default NewOffer