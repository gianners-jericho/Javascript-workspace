function $query (selector)
{
    var elements = [];

    if(selector.substring(0,1) === '#'){
        var idname = selector.substring(1);
        var elem = document.getElementById(idname);
        
        if (elem){
            elements.push(elem);
        }
    }
    else{
        var tagElements = document.getElementsByTagName(selector);

        for (var i = 0; i < tagElements.length; i++){
            elements.push(tagElements[i]);
        }
    }

    return {
        click: function(callback){
            for (var i = 0; i < elements.length; i++){
                elements[i].addEventListener('click',function(event){
                    callback(event);
                })
            }
        },
        hide: function(){
            for (var i = 0; i < elements.length; i++){
                elements[i].style.display = 'none';
            }
        },
        show: function(){
            for (var i = 0; i < elements.length; i++){
                elements[i].style.display = 'block';
            }
        }
    }
}

//time spent:30 mins