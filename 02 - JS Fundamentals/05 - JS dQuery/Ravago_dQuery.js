class lib {
    constructor(target){
        this.target = target
    }

    elements() {
        return document.querySelectorAll(this.target)
    }

    hide(){
        for(const element of this.elements()){
            element.style.display = "none"
        }
    }

    show(){
        for(const element of this.elements()){
            element.style.display = "block"
        }
    }

    click(callback){
        for(const element of this.elements()){
            element.addEventListener('click', callback)
        }
    }
}

function $query(target) {
    return new lib(target);
}
