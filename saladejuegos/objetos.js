class object {
    positionX;
    positionY;
    width;
    height;
    imgLink;
    image;
    isSolid;
    //hitbox
    hitboxX;//originX de la hitbox
    hitboxY;//originY de la hitbox
    hitboxWidht;
    hitboxHeight;

    constructor(positionX, positionY, width, height, imgLink, hitboxX, hitboxY, hitboxWidht, hitboxHeight,isSolid) {
        this.width = width;
        this.height = height;
        this.positionX = positionX;
        this.positionY = positionY;
        this.imgLink = imgLink;
        this.hitboxX = hitboxX;
        this.hitboxY = hitboxY;
        this.hitboxWidht = hitboxWidht;
        this.hitboxHeight = hitboxHeight;
        this.isSolid = isSolid;
    }

    getPositionX() {
        return this.positionX;
    }

    setPositionX(value) {
        this.positionX = value;
    }

    getPositionY() {
        return this.positionY;
    }

    setPositionY(value) {
        this.positionY = value;
    }

    getWidth() {
        return this.width;
    }

    setWidth(value) {
        this.width = value;
    }

    getHeight() {
        return this.height;
    }

    setHeight(value) {
        this.height = value;
    }

    getImgLink() {
        return this.imgLink;
    }

    setImgLink(value) {
        this.imgLink = value;
    }
    getImage() {
        return this.image;
    }

    setImage(value) {
        this.image = value;
    }

    getHitboxX() {
        return this.hitboxX;
    }

    setHitboxX(value) {
        this.hitboxX = value;
    }

    getHitboxY() {
        return this.hitboxY;
    }

    setHitboxY(value) {
        this.hitboxY = value;
    }

    getHitboxWidth() {
        return this.hitboxWidth;
    }

    setHitboxWidth(value) {
        this.hitboxWidth = value;
    }

    getHitboxHeight() {
        return this.hitboxHeight;
    }

    setHitboxHeight(value) {
        this.hitboxHeight = value;
    }
}



class mainCharacter extends object {
    hp;
    speed;
    damage;

    constructor(hp, speed, damage,positionX, positionY, width, height, imgLink, hitboxX, hitboxY, hitboxWidht, hitboxHeight,isSolid) {
        super(positionX, positionY, width, height, imgLink, hitboxX, hitboxY, hitboxWidht, hitboxHeight,isSolid);
        this.hp = hp;
        this.speed = speed;
        this.damage = damage;

    }
    //setters y getters
    getHp() {
        return this.hp;
    }
    setHp(value) {
        this.hp = value;
    }

    getSpeed() {
        return this.speed;
    }
    setSpeed(value) {
        this.speed = value;
    }

    getDamage() {
        return this.damage;
    }
    setDamage(value) {
        this.damage = value;
    }
    //metodos propios
    
    attack() { };
    checkCollision(pSolidos, xObjetivo, yObjetivo){
        //quitar el canvas como solido y añadir control externo
        pSolidos.forEach((objeto)=>{
/*             objeto.getPositionX()+objeto.getHitboxX() // es el x0 de la hitbox del objeto(izquierda)
            objeto.getPositionX()+objeto.getHitboxX()+ objeto.getHitboxWidth() // es el x1 (derecha)
            objeto.getPositionY()+objeto.getHitboxY() // es el  y0 (arriba)
            objeto.getPositionY()+objeto.getHitboxY() + objeto.getHitboxHeight() //es el y1 abajo

            xObjetivo+this.hitboxX
            xObjetivo+this.hitboxX + this.hitboxWidht
            yObjetivo+this.hitboxY 
            yObjetivo+this.hitboxY  + this.hitboxHeigh */
            
            if(                 
                objeto.getPositionX()+objeto.getHitboxX()< xObjetivo+this.hitboxX + this.hitboxWidht &&
                objeto.getPositionX()+objeto.getHitboxX()+ objeto.getHitboxWidth()< xObjetivo+this.hitboxX //de momento existe la posibilidad de pasar en Y

                &&

                objeto.getPositionY()+objeto.getHitboxY() <yObjetivo+this.hitboxY  + this.hitboxHeigh &&
                objeto.getPositionY()+objeto.getHitboxY() + objeto.getHitboxHeight() < yObjetivo+this.hitboxY
            ){
                
                return true;
            }

            /* if (this.positionX+this.hitboxX < objeto.getPositionX()+objeto.getHitboxX() + objeto.getHitboxWidth() &&
            this.positionX+this.hitboxX + this.hitboxWidht > objeto.getPositionX()+objeto.getHitboxX() &&
            this.positionY+this.hitboxY < objeto.getPositionY()+objeto.getHitboxY() + objeto.getHitboxHeight() &&
            this.positionY+this.hitboxY + this.hitboxHeight > objeto.getPositionY()+objeto.getHitboxY()){
                return true;
            } */
        })
        console.log('a');
        return false;
    }
    movement(seno,coseno,valor) {
        let xObjetivo =this.positionX+(seno*valor*this.speed);
        let yObjetivo = this.positionY+(coseno*valor*this.speed);
        if( this.checkCollision(solidos, xObjetivo, yObjetivo)){
            this.positionX = xObjetivo;
            /* this.hitboxX += xObjetivo; */
            this.positionY = yObjetivo;
            /* this.hitboxY += yObjetivo; */
        }

        
    };
}


