import { IObject } from './../interfaces/object.d';
export const FILTER_TYPES = {
    LT: 'lt',
    GT: 'gt',
    GTE: 'gte',
    LTE: 'lte',
    EQ: 'eq',
    MATCH: 'match',
    // IN: 'in',
    // ONE_OF: 'one_of',
    // OR: 'or'
}

export const getValueByKey = (object: IObject, key: string) => {
    let keys = key.split('.');
    if (keys.length === 0) {
        return object[key]
    }

    let i = 1;
    let value = object[keys[0]];

    while(value && i < keys.length) {
        const item = keys[i];
        value = value[item]
        i++;
    }

    return value
}

export default function useFilterData(data, filters = {}) {
    const items = [...data];

    return items.filter(item => {
        return Object.keys(filters).every(filter => {
            const value = getValueByKey(item, filters[filter].key);
            const filterValue = filters[filter].value
            const type = filters[filter].type

            if (filterValue === '' || filterValue === null || filterValue === undefined) return true;

            if (type === FILTER_TYPES.MATCH) {
                return value.toLowerCase().includes(filterValue.toLowerCase())
            }

            if (type === FILTER_TYPES.EQ) {
                return value === filterValue
            }

            if (type === FILTER_TYPES.LT) {
                return value < filterValue
            }

            if (type === FILTER_TYPES.GT) {
                return filterValue < value
            }

            if (type === FILTER_TYPES.GTE) {
                return filterValue <= value
            }

            if (type === FILTER_TYPES.LTE) {
                return filterValue >= value
            }

            // if (type === FILTER_TYPES.IN) {
            //     return filterValue.includes(value)
            // }

            return false;
        })
    })
}
