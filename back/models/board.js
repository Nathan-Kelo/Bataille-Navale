class Board{
    constructor(size){
        this.tab=new Array(size).fill(new Array(size).fill(0))
        
    }
}

Board.prototype.display=function(){
    let htmlBoard=document.getElementById("board")
    for(let i=0;i<this.tab.length;i++){
        let tr=document.createElement('tr');
        for(let j=0;j<this.tab.length;j++){
            let td=document.createElement('td');
            switch(tab[i][j]){
                case 2:td.classList.add("2-size-boat");break;
                case 3:td.classList.add("3-size-boat");break;
                case 4:td.classList.add("4-size-boat");break;
                case 5:td.classList.add("5-size-boat");break;
                default:td.classList.add("emptyboard")               
            }            
            tr.append(td);
        }
    }
    

}

module.exports=Board;