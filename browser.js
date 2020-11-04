function getInternetExplorerVersion()
{
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    else if (navigator.appName == 'Netscape')
    {
        var ua = navigator.userAgent;
        var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    return rv;
}
window.onload = function () {
    var browser = getInternetExplorerVersion();
    var index = document.createElement('script');
    var scroll = document.createElement('script');
    if (browser === -1) {
        index.setAttribute('src', 'src/index.js');
        scroll.setAttribute('src', 'src/scroll.js');
        document.head.appendChild(index);
        document.head.appendChild(scroll);
    } else {
        index.setAttribute('type', 'text/javascript');
        index.setAttribute('src', 'dist/index.js');
        scroll.setAttribute('type', 'text/javascript');
        scroll.setAttribute('src', 'dist/scroll.js');
        document.head.appendChild(index);
        document.head.appendChild(scroll);
    }
};
