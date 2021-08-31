/** @module plainify */

'use strict';

/**
 * Plainify JS-object
 * @param {object} object - Object to be plainified
 * @param {string} path - optional - nested object path
 * @returns {object} Plain object
 */
const plainify = (object, path = '') => {

    if ((typeof object === 'object' && object !== null) && object.constructor !== undefined && (Object.getPrototypeOf(object) === Object.prototype || path !== '')) {

        return Object.entries(object).reduce(function(accumulator, [key, value]) {

            const nested_object = typeof value !== 'object' ? {
                [`${path}${key}`]: value
            } : plainify(value, `${path}${key}.`);

            return {...accumulator, ...nested_object };

        }, {});

    } else {
        return undefined;
    }
}
