class Weapons
{
    constructor(id, name, rate, clip, reload)
    {
        this.id = id;
        this.name = name;
        this.active = false;
        this.rate = rate;
        this.ready = rate;
        this.clip = clip;
        this.clipCurrent = this.clip;
        this.reload = reload*60;
        this.reloadCurrent = this.reload;
    }
    
    fire(){
        
        if(this.name == 'pistol'){ //pistol
            //bulletList.push(new bullet1(px,py,drawpx,drawpy,mouseX,mouseY));
            bulletList.push(new bullet1( px + (psize * cos(pAlfa-90)),py + (psize * sin(pAlfa-90)),pAlfa));
            musicShot.play();
            
        }else if(this.name == 'rifle' || this.name == 'machinegun'){ //rifles
            bulletList.push(new bullet2( px + (psize * cos(pAlfa-90)),py + (psize * sin(pAlfa-90)),drawpx,drawpy,mouseX,mouseY));
            
            musicShot.play();
            
        }else if(this.name == 'doublebarrel'){ //shotgun
            bulletList.push(new bullet3( px + (psize * cos(pAlfa-90)),py + (psize * sin(pAlfa-90)),drawpx,drawpy,mouseX,mouseY,0));
            bulletList.push(new bullet3( px + (psize * cos(pAlfa-90)),py + (psize * sin(pAlfa-90)),drawpx,drawpy,mouseX,mouseY,-5));
            bulletList.push(new bullet3( px + (psize * cos(pAlfa-90)),py + (psize * sin(pAlfa-90)),drawpx,drawpy,mouseX,mouseY,-10));
            bulletList.push(new bullet3( px + (psize * cos(pAlfa-90)),py + (psize * sin(pAlfa-90)),drawpx,drawpy,mouseX,mouseY,+10));
            bulletList.push(new bullet3( px + (psize * cos(pAlfa-90)),py + (psize * sin(pAlfa-90)),drawpx,drawpy,mouseX,mouseY,+5));
            
            musicShot.play();
            
        }else if(this.name == 'bazooka'){ //bazooka
            bulletList.push(new bullet4( px + (psize * cos(pAlfa-90)),py + (psize * sin(pAlfa-90)),drawpx,drawpy,mouseX,mouseY));
            
            musicShot.play();
        }
        this.ready = this.rate;
        this.clipCurrent--;
        
    }
}

class Item
    {
        constructor(x,y,hold){
            this.x = x;
            this.y = y;
            this.vx = 0;
            this.vy = 0;
            this.speed = 0.3;
            this.size = 60;
            this.life = 600;
            this.hold = hold;           // 0-score 1-rifle 2-machinegun 3-armor 4-shotgun 5-bazooka 6-freeze 7-turret
        }
    }


function loadWeapons()
{
    pistol = new Weapons(0, 'pistol', 25 , 7, 1); //rate of fire , clip size , reload time
    rifle = new Weapons(1, 'rifle', 5 , 30, 2);
    machinegun = new Weapons(2, 'machinegun', 3 , 60, 2.5);
    doublebarrel = new Weapons(3, 'doublebarrel', 60 , 2, 2.5);
    bazooka = new Weapons(4, 'bazooka',40,1,1.5);
    
    weaponList = [
    pistol,rifle,machinegun,doublebarrel,bazooka
    ];
    
    pistol.active = true;
    //machinegun.active = true;
    //bazooka.active = true;
    //doublebarrel.active = true;
}

function bullet1(p1,p2,obrot) { //pistol  
    this.x=p1;
    this.y=p2;
    this.speed=10;
    this.size=4;
    this.vx=sin(obrot)*this.speed;
    this.vy=-cos(obrot)*this.speed;
}
function bullet2(p1,p2,drawp1,drawp2,mouseX,mouseY) { //rifle, machinegun
    this.x=p1 ;
    this.y=p2 ;
    this.speed=12;
    this.size=5;
    this.recoil = random(-recoil,recoil);
    this.vx=sin(pAlfa+this.recoil)*this.speed;
    this.vy=-cos(pAlfa+this.recoil)*this.speed;
}
function bullet3(p1,p2,drawp1,drawp2,mouseX,mouseY,kat) {   //SHOTGUN
    this.x=p1;
    this.y=p2;
    this.speed=14;
    this.size=8;
    this.life=45;
    this.vx=sin(pAlfa+kat)*this.speed;
    this.vy=-cos(pAlfa+kat)*this.speed;
    
}
function bullet4(p1,p2,drawp1,drawp2,mouseX,mouseY) { //BAZOOKA
    this.x = p1;
    this.y = p2;
    this.speed = 10;
    this.size = 13;
    this.vx = sin(pAlfa)*this.speed;
    this.vy = -cos(pAlfa)*this.speed;
    this.explode = false;
    this.explodeLife = 45;
    }
function bulletMove(list){

    for(i=0;i < list.length;i++){
  
      
    list[i].x=list[i].x+list[i].vx;
    list[i].y=list[i].y+list[i].vy;
    if(list[i].x < 0 || list[i].x > bckground.width || list[i].y < 0 || list[i].y > bckground.height){
        var removed = list.splice(i, 1);
        i=0;
    }else if(list[i] instanceof bullet3 || list[i] instanceof zerg3Bullet){
        list[i].life--;
        if(list[i].life==0){
            list.splice(i, 1);
        }
    }else if(list[i] instanceof bullet4){
        if(list[i].explode == true){
            list[i].explodeLife--;
            
            if(list[i].explodeLife<=0){
                list.splice(i, 1);
        }
        }
        
    }
}
    return list;
}

