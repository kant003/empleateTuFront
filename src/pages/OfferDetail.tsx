import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { OfferService } from "../services/offer.services"
import Offer from "../models/Offer"
import { StarRating } from "../components/StarRating"

function OfferDetail() {
  const {id} = useParams()
  const [offer, setOffer] = useState<Offer>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)



  useEffect(()=>{
    setLoading(true)
    //if(!id) return
    OfferService
      .getById(Number(id))
      .then(setOffer)
      .catch(error => setError(error.message))
      .finally(()=>setLoading(false))
  },[id])




  if(loading) return <div>Loading...</div>
  if(error) return <div>Error: {error}</div>
  if(!offer) return <div>Ofertas no encontradas</div>

  return (
    <div className="text-white">
      <div>Titulo: {offer.title}</div>
      <StarRating idOffer={Number(id)} />
      <div>Descripcion: {offer.description}</div>
      <div>Activo: {offer.active?'SI':'NO'}</div>
      <div>Email de contacto: {offer.contactEmail}</div>
      <div>Fecha publicación: {new Date(offer.published).toLocaleString()}</div>
      <div>Fecha finalización: {new Date(offer.expired).toLocaleString()}</div>
      <div>Localización:</div>
      {offer.location &&
      <iframe width="100%" height="300" loading="lazy" 
      src={`https://www.google.com/maps?q=${offer.location}&output=embed`}
      >

      </iframe>
  }
    </div>
  )
}

export default OfferDetail