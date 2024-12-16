let mouseX;
let mouseY;

let allDraggables = document.querySelectorAll('.draggable');
allDraggables.forEach(element => {
    element.draggable = true;
    element.addEventListener('dragend', (event) => {
        mouseX = event.x;
        mouseY = event.y;
        // recojo el nuevo padre
        let newParent = document.elementFromPoint(mouseX,mouseY);

        //controlo que el padre no sea el mismo
        if(newParent != element){
            newParent.appendChild(element);
            element.style.left = (mouseX - newParent.offsetLeft)+'px';
            element.style.top = (mouseY - newParent.offsetTop)+'px';
        }
        
        // lo situa en el nuevo lugar
    }, false);
});

