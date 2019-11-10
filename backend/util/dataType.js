

// Object.prototype.toString.call('') ;   // [object String]
// Object.prototype.toString.call(1) ;    // [object Number]
// Object.prototype.toString.call(true) ; // [object Boolean]
// Object.prototype.toString.call(undefined) ; // [object Undefined]
// Object.prototype.toString.call(null) ; // [object Null]
// Object.prototype.toString.call(new Function()) ; // [object Function]
// Object.prototype.toString.call(new Date()) ; // [object Date]
// Object.prototype.toString.call([]) ; // [object Array]
// Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
// Object.prototype.toString.call(new Error()) ; // [object Error]
 

export function getDataType(data){
    return Object.prototype.toString.call(data)
}

export function isArray(data){
    const pattern = /array/i;
    return !!pattern.test(getDataType(data))
}

export function isString(data){
    const pattern = /string/i;
    return !!pattern.test(getDataType(data))
}

export function isNumber(data){
    const pattern = /number/i;
    return !!pattern.test(getDataType(data))
}

export function isBoolean(data){
    const pattern = /boolean/i;
    return !!pattern.test(getDataType(data))
}

export function isUndefined(data){
    const pattern = /undefined/i;
    return !!pattern.test(getDataType(data))
}

export function isNull(data){
    const pattern = /null/i;
    return !!pattern.test(getDataType(data))

}

export function isFunction(data){
    const pattern = /function/i;
    return !!pattern.test(getDataType(data))
}

export function isDate(data){
    const pattern = /date/i;
    return !!pattern.test(getDataType(data))

}
