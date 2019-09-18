$.fn.ezlang = function(options = {}){
    window.scope = {
        lang: localStorage.getItem('lang')
    };

    var fallback = (options.fallback) ? options.fallback : 'pt-br',
        silent = (options.silent) ? options.silent : false;

    $.each(options.languages,function(i,item){
        $.get('lang/'+item+'.json',function(res){
            return scope[item] = res;
        });
    });

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
        setTimeout(function(){
            
            var items = $('[data-translate]');
            
            $.each(items, function(i,item){
                var $elem = $(item),
                    term = $elem.data('term'),
                    singleSilent = $elem.data('silent'),
                    innerContent = innerContent = scope[lang][term];
                
                if(innerContent != '' && innerContent != undefined){ /* If item has translation */
                    $elem.html(innerContent).show();
                } else if (singleSilent != undefined || silent) { /* If items that has no translation are set to be hidden */
                    if(innerContent == '' || innerContent == undefined){
                        $elem.hide();
                    }
                } else { /* Fallback translation */
                    innerContent = scope[fallback][term];
                    $elem.html(innerContent).show();
                }
            });
            
            setTimeout(function(){
                $('.loading').fadeOut('loading');
            },200);

        },100);
    }
}
