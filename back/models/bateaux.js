class Bateaux{
    
    //5 is for 5 case length ship
    //4 is for 4 case length ship 
    //3 is for 3 case length ship
    //2 is for 2 case length ship
    constructor(typeBateau){
        this.size=typeBateau;
        this.debut.x=0;
        this.debut.y=0;
        this.fin.x=0;
        this.fin.y=0;
        this.caseHits=Array.from({length:typeBateau},0);
        this.isCoule=false;
    }

    get debut(){
        return this.debut;
    }

    get fin(){
        return this.fin;
    }

    get caseHits(){
        return this.caseHits;
    }    
}
Bateaux.prototype.setFin=function(x_,y_){
    this.fin.x=x_;
    this.fin.y=y_;
}

Bateaux.prototype.setDebut=function(x_,y_){
    this.debut.x=x_;
    this.debut.y=y_;
}

Bateaux.prototype.checkCoule=function(){
    this.isCoule=this.caseHits.every((i)=>i==1)
}

module.exports=Bateaux;