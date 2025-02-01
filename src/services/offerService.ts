const URL_BASE = 'http://localhost:3000/api/'
export const getOffers = async () => {
    try{
        const response = await fetch(URL_BASE + 'offerts/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if(!response.ok){
            throw new Error('fallo al obtener las ofertas')
        }
        return await response.json()
    }catch(error){
        const msg = error instanceof Error ? error.message : 'Error desconocido'
        throw new Error(msg)
    }

}


export const registerOffer = async (title:string, description:string,contactEmail: string, published: Date, expired:Date, active:boolean, idCategory:number) => {
    try{

        const response = await fetch(URL_BASE + 'offerts/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(  {offer:{title, description, contactEmail, published, expired, active, idCategory}} ),
                credentials: 'include'
            }
        )
        console.log(JSON.stringify({offer:{title, description, contactEmail, published, expired, active, idCategory}}));
        
        if(!response.ok){
            console.log(response.status);
            console.log(response);
            
            throw new Error('Error al registrarse')
        }
        return await response.json()

    }catch(error){
        const msg = error instanceof Error ? error.message : 'Error desconocido'
        throw new Error(msg)
    }
}