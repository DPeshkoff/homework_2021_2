/** @module plainify */

/* is ; not neccessary here? */
'use strict'

/**
 * Plainify JS-object
 * @param {object} object - Object to be plainified
 * @param {string} path - optional - nested object path
 * @returns {object} Plain object
 */
const plainify = (object, path = "") => {
    /* path is used for nested objects */

    let result = {};

    /* get object keys */
    const object_keys = Object.keys(object);

    /* for each key */
    for (let key of object_keys) {
        const value = object[key];

        /* check if we do not have nested objects */
        if (typeof value != 'object') {

            result[`${path}${key}`] = value;

        } else {
            const nested_object = plainify(value, `${path}${key}.`);

            Object.assign(result, nested_object);
        }
    }
    return result;
}