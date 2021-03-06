export function isPc() {
        // const userAgentInfo = navigator.userAgent;
        // window.console.log(userAgentInfo,'userAgentInfo')
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                        flag = false;
                        break;
                }
        }
        return flag;
}

export function autoTextarea(elem, extra, maxHeight, callback) {
        extra = extra || 0;
        var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
                isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
                addEvent = function (type, callback) {
                        elem.addEventListener ?
                                elem.addEventListener(type, callback, false) :
                                elem.attachEvent('on' + type, callback);
                },
                getStyle = elem.currentStyle ? function (name) {
                        var val = elem.currentStyle[name];

                        if (name === 'height' && val.search(/px/i) !== 1) {
                                var rect = elem.getBoundingClientRect();
                                return rect.bottom - rect.top -
                                        parseFloat(getStyle('paddingTop')) -
                                        parseFloat(getStyle('paddingBottom')) + 'px';
                        }

                        return val;
                } : function (name) {
                        return getComputedStyle(elem, null)[name];
                },
                minHeight = parseFloat(getStyle('height'));

        elem.style.resize = 'none';

        var change = function () {
                var scrollTop, height,
                        padding = 0,
                        style = elem.style;

                if (elem._length === elem.value.length) return;
                elem._length = elem.value.length;

                if (!isFirefox && !isOpera) {
                        padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
                }
                scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

                elem.style.height = minHeight + 'px';
                if (elem.scrollHeight > minHeight) {
                        if (maxHeight && elem.scrollHeight > maxHeight) {
                                height = maxHeight - padding;
                                style.overflowY = 'auto';
                        } else {
                                height = elem.scrollHeight - padding;
                                style.overflowY = 'hidden';
                        }
                        style.height = height + extra + 'px';
                        scrollTop += parseInt(style.height) - elem.currHeight;
                        document.body.scrollTop = scrollTop;
                        document.documentElement.scrollTop = scrollTop;
                        elem.currHeight = parseInt(style.height);

                        callback && callback(style.height)
                }
        };

        addEvent('propertychange', change);
        addEvent('input', change);
        addEvent('focus', change);
        change();
}


export function getMessageListKey(user_code) {
        const key = `message_list!${user_code}`;
        return key
}


