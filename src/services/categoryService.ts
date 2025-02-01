const URL_BASE = 'http://localhost:3000/api/'
export const getCategories = async () => {
    try{
        const response = await fetch(URL_BASE + 'categories/',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if(!response.ok){
            throw new Error('fallo al obtener las categorias')
        }
        return await response.json()
    }catch(error){
        const msg = error instanceof Error ? error.message : 'Error desconocido'
        throw new Error(msg)
    }

}


export const registerCategory = async (name:string) => {
    try{
        const response = await fetch(URL_BASE + 'categories/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {category:{name}} ),
                credentials: 'include'
            }
        )
        if(!response.ok){
            throw new Error('Error al crear categoria')
        }
        return await response.json()

    }catch(error){
        const msg = error instanceof Error ? error.message : 'Error desconocido'
        throw new Error(msg)
    }
}