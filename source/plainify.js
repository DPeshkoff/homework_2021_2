/** @module plainify */

'use strict';

/**
 * Plainify JS-object
 * @param {object} object - Object to be plainified
 * @param {string} path - optional - nested object path
 * @returns {object} Plain object
 */
const plainify = (object, path = '') => {

    if (!isNotAnObject(object)) {

        return Object.entries(object).reduce(function(accumulator, [key, value]) {

            const nested_object = isNotAnObject(value) 
		? { [`${path}${key}`]: value }
		: plainify(value, `${path}${key}.`);

            return {...accumulator, ...nested_object };

        }, {});

    } 

    return undefined;
}


/**
 * Determine if object is not suitable for plainifying
 * @param {object} object - Object to be tested
 * @returns {Boolean} Suitability for plainifying
 */
const isNotAnObject = (object) => {
    return (
            typeof object !== 'object' ||
            object === null ||
            object.constructor === undefined ||
            (Object.getPrototypeOf(object) !== Object.prototype)) ?
        true : false;
}
