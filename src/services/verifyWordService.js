export const verifyWord = (word) => {
    const permitido = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;

    if(!permitido.test(word)){
        return false;
    }else{
        return true;
    }
}