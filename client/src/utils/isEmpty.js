
export const isEmpty = (value) => {

    return (
        typeof value === undefined ||
        value === '' ||
        value === null ||
        value.length === 0 ||
        (value && Object.keys(value).length === 0 && value.constructor === Object)
    );
}