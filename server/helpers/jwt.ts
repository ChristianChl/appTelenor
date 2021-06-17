import jwt  from "jsonwebtoken";


export const generarJwt = (id_usuario: any, us_nombres: any) => {

    const payload = {id_usuario, us_nombres};

    return new Promise ((resolve, reject) => {
        
        jwt.sign( payload, process.env.SECRET || 'EstOdeb3DeSERCompLic4d02080', {
            expiresIn: '24h'
        }, (err, token) => {
    
            if ( err ) {
                // TODO MAL
                console.log(err);
                reject(err);
    
            } else {
                // TODO BIEN
                resolve( token )
            }
    
        })
    });

}