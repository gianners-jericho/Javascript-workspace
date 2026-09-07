class Dquery {
    constructor(target){
        this.target = target
    }

    all_elements(){
        return document.querySelectorAll(this.target)
    }

    click(callback){
        for (const e of this.all_elements()){
            e.addEventListener("click", callback);
        }
    }

    hide(){
        for(const e of this.all_elements()){
            e.style.display = "none";
        }
    }

    show(){
        for(const e of this.all_elements()){
            e.style.display = "block";
        }
    }
}

function $query(target){
    return new Dquery(target)
}