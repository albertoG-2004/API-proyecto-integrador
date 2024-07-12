export const verifyPassword = (password) => {

    if(password.length < 8){
        return false;
    }else{
        return true;
    }
}