/*jslint node: true */
'use strict';

let errors = [];

function Validators() {
    errors = [];
}

Validators.prototype.isRequired = (value, message) => {
    if (!value || value.length <= 0) {
        errors.push({ message });
    }
};

Validators.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min) {
        errors.push({ message });
    }
};

Validators.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.length > max) {
        errors.push({ message });
    }
};

Validators.prototype.hasFixedLen = (value, len, message) => {
    if (value.length === parseInt(len)) {
        errors.push({ message });
    }
};

Validators.prototype.isNumber = (value, message) => {
    if (!value || isNaN(value)) {
        errors.push({ message });
    }
};

Validators.prototype.isEmail = (value, message) => {
    let reg = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
    if (!reg.test(value)) {
        errors.push({ message });
    }
};

Validators.prototype.errors = () => {
    return errors;
};

Validators.prototype.clear = () => {
    errors = [];
};

Validators.prototype.isValid = () => {
    return errors.length === 0;
};

module.exports = Validators;