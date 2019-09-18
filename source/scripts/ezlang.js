$.fn.ezlang = function(options = {}){
    var currentLang = localStorage.getItem('lang')

    window.ezlang = {
        lang: (currentLang != undefined) ? currentLang : 'pt-br'
    };

    var fallback = (options.fallback) ? options.fallback : 'pt-br',
        silent = (options.silent) ? options.silent : false;

    /* Set selected language globally */
    $('#lang').on('change', function(){
        var lang = $(this).val();
        localStorage.setItem('lang',lang);
        ezlang.lang = lang;
        translate(ezlang.lang);
    });

    /* Check current language on startup */
    $(document).ready(function(){	
        $('#lang').val(ezlang.lang);
        
        $.when($.get('lang/'+fallback+'.json')).then(function(data){
            ezlang[fallback] = data;
            translate(ezlang.lang);
        });
    });

    /* Translates */
    function translate(lang){
        
        var items = $('[data-translate]');

        $.when($.get('lang/'+lang+'.json')).then(function(data){
            
            ezlang[lang] = data;

            $.each(items, function(i,item){
                var $elem = $(item),
                    term = $elem.data('term'),
                    singleSilent = $elem.data('silent'),
                    innerContent = ezlang[lang][term];
                
                if(innerContent != '' && innerContent != undefined){ /* If item has translation */
                    $elem.html(innerContent).show();
                } else if (singleSilent != undefined || silent) { /* If items that has no translation are set to be hidden */
                    if(innerContent == '' || innerContent == undefined){
                        $elem.hide();
                    }
                } else { /* Fallback translation */
                    innerContent = ezlang[fallback][term];
                    $elem.html(innerContent).show();
                }
            });

            $('.loading').fadeOut('loading');

        })
    }
}
