export const classifyColor = async(color) => {
    let classification = '';

    const upperColor = color.toUpperCase();

    if (upperColor === "AMARILLO") {
        classification = "Maduro";
    } else if (upperColor === "VERDE") {
        classification = "Verde";
    } else {
        classification = "Incomible";
    }
    
    return classification;
};