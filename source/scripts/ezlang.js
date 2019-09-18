$.fn.ezlang = function(){
    
    window.scope = {
        lang: localStorage.getItem('lang')
    };

    /* Set selected language globally */
    $('#lang').on('change', function(){
        var lang = $(this).val();
        localStorage.setItem('lang',lang);
        scope.lang = lang;
        translate(scope.lang);
    });

    /* Check current language on startup */
    $(document).ready(function(){	
        $('#lang').val(scope.lang);
        translate(scope.lang);
    });

    /* Translates */
    function translate(lang){
        var items = $('[data-translate]');
        $.each(items, function(i,item){
            var $elem = $(item);
                innerContent = $elem.data(lang);
            
            if(innerContent != '' && innerContent != undefined){
                $elem.html(innerContent);
            }
        });
        $('.loading').fadeOut('loading');
    }

}
