export const fontFamilies = ['Arial', 'Times New Roman', 'Calibri', 'Georgia', 'Courier New', 
    'Forte',  'Broadway',  'Algerian', 'Castellar']

export const fontSizes = Array<string>();
export const fontWeights = Array<string>();

function createArr(array: Array<string>, start: number, step: number, countArray: number) {
    for (let i=0; i < countArray; i++) {
        array[i] = String(start);
        start = start + step;
    }
}

createArr(fontSizes, 10, 5, 40);
createArr(fontWeights, 100, 100, 9);