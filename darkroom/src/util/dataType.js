export function getDataType(data){
    // window.console.log(Object.prototype.toString.call(data),'Object.prototype.toString.call(data)')
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

export function isObject(data){
    const pattern = /object Object/i;
    return !!pattern.test(getDataType(data))

}
