class Desk {
    constructor(name) {
        self.name = name;
        self.x = 0;
        self.y = 0;
        self.color = "black";
    }

    mov(x, y) {
        self.x = x;
        self.y = y;
    }

    updateColor(new_color) {
        self.color = new_color;
    }
}

const desk1 = new Desk("oak desk");
const desk2 = new Desk("maple desk");
desk1.updateColor("brown");