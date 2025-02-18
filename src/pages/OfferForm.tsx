import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Offer from '../models/Offer'
import { OfferService } from '../services/offer.services'
import { useNavigate, useParams } from 'react-router-dom'
import { Temporal } from 'temporal-polyfill'
import toast from 'react-hot-toast'
import { CategoryService } from '../services/categoryService'
import Category from '../models/Category'
import InputForm from '../components/InputForm'
import ErrorMsgData from '../utils/ErrorMsgData'
import TextAreaInputForm from '../components/TextAreaInputForm'

// - formulario de creación de 1 oferta
// -- Actualizar una oferta


function OfferForm() {
  const now = Temporal.Now.plainDateTimeISO()
  const threeMonthLater = now.add({months: 3}).toString().slice(0,16)

  //const threeMonthLater = new Date( new Date().setMonth(new Date().getMonth() + 3) )
  //                    .toISOString().slice(0,16)
  const [form, setForm] = useState<Partial<Offer>>({
    title: '',
    description: '',
    active: true,
    contactEmail: '',
    location: '',
    published: new Date().toISOString().slice(0,16), //2007-11-03T16:18:05Z ->  2007-11-03T16:18
    expired: threeMonthLater,
    idCategory: undefined
  })
  const [categorias, setCategorias] = useState<Category[]>()

  const {id} = useParams()
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    if(id){
      
      setLoading(true)
      OfferService.getById(Number(id))
      .then(data => setForm({
        ...data,
        published: new Date(data.published || '').toISOString().slice(0,16),
        expired: new Date(data.expired || '').toISOString().slice(0,16)
      }))
      .catch((error) => setErrors(error.message))
      .finally(()=>setLoading(false))

    }
  }, [id])

  useEffect(()=>{
    CategoryService.getAll()
      .then(setCategorias)
      .catch(error => setErrors(error.message))
  },[])

  const handleSubmit=async (e: FormEvent) =>{
    try{
      setLoading(true)
      setErrors({});
      e.preventDefault()
      const formData = {
        ...form,
        idCategory: form.idCategory ? Number(form.idCategory) : null,
        published: new Date(form.published || '').toISOString(),
        expired: new Date(form.expired || '').toISOString()
      }
      console.log(formData)
      if(id) await OfferService.update(Number(id), formData)
        else await OfferService.create(formData)
      toast.success('Oferta guardada correctamente!')
      navigate('/offers')
    }catch(error){
      toast.error('Error al guardar la oferta!')
       if(Array.isArray(error)){
              const errorObj: Record<string, string> = error?.reduce((acc: Record<string, string>, err: unknown) => {
                const errorDetail = err as ErrorMsgData;
                acc[errorDetail.path] = errorDetail.msg;
                return acc;
              }, {});
              setErrors(errorObj);
            }else if(error instanceof Error){
              const msg = error instanceof Error ? error.message : "Error desconocido"
              setErrors({message: msg || 'Error desconocido'});
            }else{
              setErrors({message: error as string || 'Error desconocido'});
            }
    }finally{
      setLoading(false)
    }
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
    const {value, name} = e.target
    //if(name==='idCategory') valueNew = Number(value) 
    setForm({ ...form, [name]:value,  }) 
  }

  const handleChangeCheckbox = (e:ChangeEvent<HTMLInputElement>) =>{
    const {checked, name} = e.target
    setForm({ ...form, [name]:checked,  }) 
  }

  if(loading) return <p>Loading...</p>

  return (
    <div className='text-white flex flex-col'>
      <h2 className="text-4xl font-extrabold dark:text-white">{id?'Edición de oferta':'Inserción de nueva oferta'}</h2>

      <form className="max-w-sm mx-auto min-w-sm" onSubmit={handleSubmit}>
      
      <InputForm text="Título" name="title" value={form.title || ''} handleChange={handleChange} error={errors.title} /> 
      <TextAreaInputForm type="textarea" rows={6} text="Descripción" name="description" value={form.description || ''} handleChange={handleChange} error={errors.description} /> 
      
      <InputForm text="Email de contacto" name="contactEmail" value={form.contactEmail || ''} handleChange={handleChange} error={errors.contactEmail} /> 
      <InputForm text="Localización" name="location" value={form.location || ''} handleChange={handleChange} error={errors.location} /> 
      
      <InputForm type="datetime-local" text="Fecha publicación:" name="published" value={form.published || ''} handleChange={handleChange} error={errors.published} /> 
      <InputForm type="datetime-local" text="Fecha Finalización:" name="expired" value={form.expired || ''} handleChange={handleChange} error={errors.expired} /> 
      <InputForm type="checkbox" text="Activa" name="active" checked={form.active} handleChange={handleChangeCheckbox} error={errors.active} /> 



      <label htmlFor="idCategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categoría:</label>
      <select id="idCategory" name='idCategory'  value={form.idCategory ?? ""}
            onChange={handleChange}
         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="" >Seleciona categoria</option>
          {categorias?.map(categoria => 
            <option  key={categoria.id} value={categoria.id}> {categoria.name} </option>
          )}
      </select>

   
      {errors && errors.message && <p className="text-center mt-4 text-red-500">{errors.message}</p>}

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Guardar
      </button>
      </form>
    </div>
  )
}

export default OfferForm