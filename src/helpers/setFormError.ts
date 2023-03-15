export const setFormErrors = (errors, setError, nested = false) => {
    if (typeof errors === 'object' && !Array.isArray(errors)) {
        if (nested) {
            Object.entries(errors).forEach(([key, val]) => {
                const keys = key.split('.');
                setError(keys[keys.length - 1], val)
            })
        } else {
            Object.entries(errors).forEach(([key, val]) => {
                setError(key, val)
            })
        }
    }
}