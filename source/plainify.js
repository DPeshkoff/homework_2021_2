/** @module plainify */

'use strict';

/**
 * Plainify JS-object
 * @param {object} object - Object to be plainified
 * @param {string} path - optional - nested object path
 * @returns {object} Plain object
 */
const plainify = (object, path = "") => {
    /* path is used for nested objects */

    /* get object keys */
    const object_keys = Object.keys(object);

    const result = object_keys.reduce(function(result, key) {

        const value = object[key];

        /* check if we do not have nested objects */
        if (typeof value != 'object') {

            result[`${path}${key}`] = value;

        } else {
            const nested_object = plainify(value, `${path}${key}.`);

            result = {...result, ...nested_object };

        }
        return result;

    }, {}, '');

    return result;

}
