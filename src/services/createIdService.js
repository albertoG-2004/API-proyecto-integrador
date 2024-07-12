import { v4 as uuidv4} from "uuid";

export const createIdService = async() => {
    const newId = uuidv4();
    return newId;
}