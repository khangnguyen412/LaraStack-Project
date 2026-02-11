/* eslint-disable */
export const HandleDateTime = (DateString: string, OutputType: string) => {
    const date = new Date(DateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    switch (OutputType) {
        case 'FullDateTime':
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
            break;
        case 'FullDate':
            return `${day}/${month}/${year}`;
            break;
        case 'FullTime':
            return `${hours}:${minutes}:${seconds}`;
            break;
        case 'GetDay':
            return `${day}`;
            break;
        case 'GetMonth':
            return `${month}`;
            break;
        case 'GetYear':
            return `${year}`
            break;    
        default:
            throw new Error('OutputType is invalid')
            break;
    }    
}