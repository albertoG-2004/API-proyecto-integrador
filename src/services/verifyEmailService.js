export const verifyEmail = (email) => {
    const emailPermitido = /^[^\s@]+@gmail\.com$/;

    if(!emailPermitido.test(email)){
        return false;
    }else{
        return true;
    }
}