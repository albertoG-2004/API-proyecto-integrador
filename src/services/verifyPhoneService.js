export const verifyPhone = (phone) => {
    const celularPermitido = /^[1-9][0-9]{9}$/;

    if(!celularPermitido.test(phone)){
        return false;
    }else{
        return true;
    }
}