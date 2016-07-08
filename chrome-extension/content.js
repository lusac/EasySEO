chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if (!!request.selectionText) {
        var elId = 'easy-seo',
            el = document.getElementById(elId);

        if (!!el) {
            el.remove();
        }

        el = document.createElement('div');
        el.setAttribute('id', 'easy-seo');
        el.innerHTML = request.selectionText;

        el.addEventListener('click', function(){
            el.remove();
        });

        document.body.appendChild(el);

        sendResponse('ok');
    }
});
