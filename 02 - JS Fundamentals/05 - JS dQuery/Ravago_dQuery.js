class lib {
    constructor(target, document){
        this.target = target
        this.document = document
    }

    hide(){
        const elements = document.querySelectorAll(this.target)

        for(const element of elements){
            element.style.display = "none"
        }
    }

    show(){
        const elements = document.querySelectorAll(this.target)

        for(const element of elements){
            element.style.display = "block"
        }
    }

    click(callback){
        const elements = document.querySelectorAll(this.target)

        for(const element of elements){
            element.addEventListener('click', callback)
        }
    }
}

function $query(target) {
    return new lib(target, document);
}
