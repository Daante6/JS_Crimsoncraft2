                                                //ENEMIES
class zerg1 { //standard
    constructor(x,y){  
        
    this.x=x;
    this.y=y;
    this.vx=0;
    this.vy=0;
    this.a=0;
    
    this.hpmax=8;
    this.hp=this.hpmax;
    this.speed= 0.6 + random()*0.6;
    this.size=zerg1Animation[0].width/2;
    this.score=3;
    this.exp=3;
    
    this.drawStep = 0;
    this.drawStepC = 0;
    }
}

class zerg2 { //faster
    constructor(x,y){  
        
    this.x=x;
    this.y=y;
    this.vx=0;
    this.vy=0;
    this.a=0;
    
    this.hpmax=4;
    this.hp=this.hpmax;
    this.speed= 1.6 + random()*0.6;
    this.size=zerg1Animation[0].width/2;
    this.score=5;
    this.exp=5;
    
    this.drawStep = 0;
    this.drawStepC = 0;
    }
}

class zerg3 { //shooting
    constructor(x,y){  
        
    this.x=x;
    this.y=y;
    this.vx=0;
    this.vy=0;
    this.a=0;
    
    this.hpmax=7;
    this.hp=this.hpmax;
    this.speed= 1.3 + random()*0.6;
    this.size=zerg1Animation[0].width/2;
    this.score=6;
    this.exp=6;
    
    this.drawStep = 0;
    this.drawStepC = 0;
    
    this.range = 350;
    this.inRange = 0;
    this.reload = 100;    
    this.reloadC = this.reload;
    }
    
    fire() {
        if(this.reloadC == 0){
            if(freezeActive){
                
            }else{
                aiBulletList.push(new zerg3Bullet(this.x,this.y,this.a));
            this.reloadC = this.reload;
            }
            
        }else{
            
            }
        }    
    
}

class ultralisk { //boss
    constructor(x,y){  
        
    this.x=x;
    this.y=y;
    this.vx=0;
    this.vy=0;
    this.a=0;
    
    this.hpmax=1000;
    this.hp=this.hpmax;
    this.speed= 2;
    this.size=ultraliskAnimation[0].width/2;
    this.score=3;
    this.exp=3;
    
    this.inRange=0;
    this.drawStep = 0;
    this.drawStepC = 0;
        
    //special attack
    this.specialMode=0; //0 - no special, 1-charging, 2-special attack
    this.specialCD=300;
    this.specialChargeC=15;
    this.specialAttackC=35;  
    }
    specialCode(){
        switch (this.specialMode) {
    case 0: //movement
        if(this.specialCD == 0){
            this.specialMode = 1;
        }else{
            this.specialCD--;
        } 
        break;
    case 1: //charging
        if(this.specialChargeC == 0){
            this.specialMode = 2;
        }else{
            this.specialChargeC--;
        }
        break;
    case 2: //special attack
        if(this.specialAttackC == 0){
            this.specialMode = 0;
            this.specialCD = 300;
            this.specialChargeC = 15;
            this.specialAttackC = 40;
        }else{
            this.specialAttackC--;
        }
        break;
    } //end switch
        
    } // specialCode function
}


class zerg3Bullet{
    constructor(x,y,a){
        this.x=x;
        this.y=y;
        this.size = 7;
        this.speed = 7;
        this.vx=sin(a)*this.speed;
        this.vy=-cos(a)*this.speed;
        this.life = 60;
        this.dmg = 30;
    }
}

                                                    //CORPSES
class zerg1Corpse{
    constructor(x,y,a){
        this.x = x;
        this.y = y;
        this.a = a;
        this.size=zerg1Animation[7].width/2;
        
        this.time = 255;
    }
}

class zerg2Corpse{
    constructor(x,y,a){
        this.x = x;
        this.y = y;
        this.a = a;
        this.size=zerg2Animation[7].width/2;
        
        this.time = 255;
    }
}

class zerg3Corpse{
    constructor(x,y,a){
        this.x = x;
        this.y = y;
        this.a = a;
        this.size=zerg2Animation[7].width/2;
        
        this.time = 255;
    }
}

class ultraliskCorpse{
    constructor(x,y,a){
        this.x = x;
        this.y = y;
        this.a = a;
        this.size=ultraliskAnimation[11].width/2;
        
        this.time = 255;
    }
}

                                                        //HIVES
class Spawn {
    constructor(x,y){  
    if(x < 0){
        this.x=random(2500,2900);
        this.y=random(15,300);
    }else{
        this.x=x;
        this.y=y;
    }    
        
    this.hpmax=8;
    this.hp=this.hpmax;
    this.size=50;
    this.score=5;
    this.exp=10;
        
    this.spawnCDMax = 180;
    this.spawnCD = this.spawnCDMax;
    }
    
    spawnZerg(){
        this.spawnCD--;
        if(this.spawnCD <= 0){
            aiList.push(new zerg1(this.x,this.y));
            this.spawnCD = 120;
            objectiveCount++;
        }
    }
    
    
}
                                                        //ALLIES
class turret {
    constructor(x,y){  
        
    this.x=x;
    this.y=y;
    this.a = 0;
    this.size = turretImg.width/2;
    this.cd = 0;
    this.timer = 240;
    }
}

class ObjectDef { //type 2 mission: defend object
    constructor(x,y){  
        
    this.x=x;
    this.y=y;
    this.size = ObjectDefImg.width/2;
        
    this.maxhp=500;
    this.hp=this.maxhp;
    }
}
                                                        //SPAWN MINIONS ON BORDER
function spawnX(){
        ramka=getRndInteger(1,4);
        if(ramka==1){
            x=getRndInteger(0,bckground.width);
            y=0;
        }
        if(ramka==2){
            x=getRndInteger(0,bckground.width);
            y=bckground.height;
        }
        if(ramka==3){
            y=getRndInteger(0,bckground.height);
            x=0;
        }
        if(ramka==4){
            y=getRndInteger(0,bckground.height);
            x=bckground.width;
        }
    return x;
}
function spawnY(){
        if(ramka==1){
            x=getRndInteger(0,bckground.width);
            y=0;
        }
        if(ramka==2){
            x=getRndInteger(0,bckground.width);
            y=bckground.height;
        }
        if(ramka==3){
            y=getRndInteger(0,bckground.height);
            x=0;
        }
        if(ramka==4){
            y=getRndInteger(0,bckground.height);
            x=bckground.width;
        }
    return y;
}
                                //HITBOX PLAYER-ZERG
function hitboxpz(list){
for(i=0;i < list.length;i++){
  
    //hit on player
    if(collideCircleCircle(list[i].x,list[i].y,list[i].size*2,px,py,psize)){
        if(list[i] instanceof ultralisk && list[i].specialMode == 2){
            if(armor>1){
            armor = armor-75;
            }else{
            hp=hp-75;
            }
            list[i].specialMode = 0;
            list[i].specialCD = 300;
            list[i].specialChargeC = 15;
            list[i].specialAttackC = 40;
        }else{
           if(armor>1){
               if(list[i] instanceof ultralisk){
                   armor = armor-3;
               }else{
                   armor = armor-1;
               }
            
            }else{
                if(list[i] instanceof ultralisk){
                    hp=hp-3;
                }else{
                    hp=hp-1;
                }
            
            } 
        }
        
        if(list[i] instanceof ultralisk){
            list[i].inRange=1;
        }
        //DAMAGE SOUND
        musicRnd();
        if( hp <= 0 ){
            pause=1;
            musicDie.play();
            if(score > hiscore){
                hiscore = score;
                setCookie("hiscoreV",hiscore,365);
            }
        }
    }
    
    else{ 
        if(list[i] instanceof ultralisk){
            list[i].inRange=0;
        }
    }
    }
}
                                    //HITBOX PLAYER (or ObjDef) - ZERG BULLETS
function hitboxpzb(list){
    for(i=0;i < list.length;i++){
  
    //hit on player
    if(collideCircleCircle(list[i].x,list[i].y,list[i].size*2,px,py,psize)){
        if(armor>1){
            armor = armor-list[i].dmg;
            if(armor<0){
                armor=0;
            }
        }else{
            hp=hp-list[i].dmg;
        }
        var removed = aiBulletList.splice(i, 1);
        //DAMAGE SOUND
        musicRnd();
        if( hp <= 0 ){
            pause=1;
            musicDie.play();
            if(score > hiscore){
                hiscore = score;
                setCookie("hiscoreV",hiscore,365);
            }
        }
    }
    
    else if(collideCircleCircle(list[i].x,list[i].y,list[i].size*2,Radar.x,Radar.y,Radar.size*2)){ 
        Radar.hp=Radar.hp-30;
        if(Radar.hp < 0){
                hp=0;
                pause=1;
            }
        var removed = aiBulletList.splice(i, 1);
    }
    }
}

                                //HITBOX: BULLETS-ZOMBIE
function hitboxbz(aiList)
{

for(j=0 ; j<bulletList.length ; j++){ 

    
    for(i=0 ; i<aiList.length ; i++){
    
        if( collideCircleCircle ( bulletList[j].x , bulletList[j].y , bulletList[j].size , aiList[i].x , aiList[i].y , aiList[i].size ) ){
        
        //HIT
            
        if(bulletList[j] instanceof bullet1){
            aiList[i].hp = aiList[i].hp - 2;
        }else if(bulletList[j] instanceof bullet2){
            aiList[i].hp = aiList[i].hp - 3;
        }else if(bulletList[j] instanceof bullet3){
            aiList[i].hp = aiList[i].hp - 5;
        }else if(bulletList[j] instanceof bullet4){ //bazooka
            if(bulletList[j].explode == false){
                aiList[i].hp = aiList[i].hp - 5;
                bulletList[j].explode = true;
                bulletList[j].vx=bulletList[j].vy=0;
                bulletList[j].size = 260;
            }else{
                aiList[i].hp = aiList[i].hp - 5;
            }
            
        }
            
        if(bulletList[j] instanceof bullet3 || bulletList[j] instanceof bullet4){
            
        }else{
            var removed = bulletList.splice(j, 1);
        }
        
        //DIE
        
        if(aiList[i].hp < 1){
            if(missionType == 0){ //survival
                score=score+aiList[i].score;
                exp=exp+aiList[i].exp;
                checkLvlUp();
                reward(aiList[i]);
            }else if(missionType == 1 || missionType == 3){ //killThemAll
                objectiveCount--;
                if(objectiveCount == 0){
                    pause=1;
                }
            }
            if(aiList[i] instanceof zerg1){
                aiCorpseList.push(new zerg1Corpse(aiList[i].x,aiList[i].y,aiList[i].a));
            }else if(aiList[i] instanceof zerg2){
                aiCorpseList.push(new zerg2Corpse(aiList[i].x,aiList[i].y,aiList[i].a));
            }else if(aiList[i] instanceof zerg3){
                aiCorpseList.push(new zerg3Corpse(aiList[i].x,aiList[i].y,aiList[i].a));
            }else if(aiList[i] instanceof ultralisk){
                aiCorpseList.push(new ultraliskCorpse(aiList[i].x,aiList[i].y,aiList[i].a));
            }
            
            var removed = aiList.splice(i, 1);
        }else{
            if(aiList[i] instanceof ultralisk){
                
            }else{
                aiList[i].speed=aiList[i].speed/1.5;
            }
            
        }
        break;
        }
}
}
   }
                                //HITBOX: BULLETS-SPAWN
function hitboxbs(aiList)
{

for(j=0 ; j<bulletList.length ; j++){ 

    
    for(i=0 ; i<aiList.length ; i++){
    
        if( collideCircleCircle ( bulletList[j].x , bulletList[j].y , bulletList[j].size , aiList[i].x , aiList[i].y , aiList[i].size ) ){
        
        //HIT
            
        if(bulletList[j] instanceof bullet1){ //pistol
            aiList[i].hp--;
        }else if(bulletList[j] instanceof bullet2){ 
            aiList[i].hp = aiList[i].hp - 2;
        }else if(bulletList[j] instanceof bullet3){ //rifles
            aiList[i].hp = aiList[i].hp - 5;
        }else if(bulletList[j] instanceof bullet4){ //bazooka
            if(bulletList[j].explode == false){
                aiList[i].hp = aiList[i].hp - 5;
                bulletList[j].explode = true;
                bulletList[j].vx=bulletList[j].vy=0;
                bulletList[j].size = 260;
            }else{
                aiList[i].hp = aiList[i].hp - 5;
            }
            
        }
            
        if(bulletList[j] instanceof bullet3 || bulletList[j] instanceof bullet4){
            
        }else{
            var removed = bulletList.splice(j, 1);
        }
        
        //DIE
        
        if(aiList[i].hp < 1){
            if(missionType == 0){ //survival
                score=score+aiList[i].score;
                exp=exp+aiList[i].exp;
                checkLvlUp();
                reward(aiList[i]);
            }else if(missionType == 1 || missionType == 3){ //killThemAll
                objectiveCount--;
                if(objectiveCount == 0){
                    pause=1;
                }
            }
            
            var removed = aiList.splice(i, 1);
        }
        break;
        }
}
}
   }
                                //HITBOX ZOMBIE-OBJECT TO DEFEND
function hitboxzobj(list){
    for(i=0 ; i < list.length ; i++){
        if(collideCircleCircle(list[i].x,list[i].y,list[i].size*2,Radar.x,Radar.y,Radar.size*2)){
            Radar.hp--;
            if(Radar.hp < 0){
                hp=0;
                pause=1;
            }
        }
    }
}

                                //HITBOX PLAYER-ITEMS
function hitboxpi(list){
                                      
for(i=0;i < list.length;i++){
  
    list[i].life--;
    if(list[i].life <= 0){
        itemList.splice(i, 1);
        break;
    }
    //hit on player
    if(collideCircleCircle(list[i].x,list[i].y,list[i].size*2,px,py,psize)){
        if(list[i].hold == 0){ //SCORE+10
            score=score+10;
            itemList.splice(i, 1);
        }else if(list[i].hold == 1){ //RIFLE
            for(j=0 ; j < weaponList.length ; j++){
                weaponList[j].active = false;
            }
            rifle.active = true;
            rifle.clipCurrent = rifle.clip;
            rifle.reloadCurrent=rifle.reload;
            itemList.splice(i, 1);
        }else if(list[i].hold == 2){ //MACHINEGUN
            for(j=0 ; j < weaponList.length ; j++){
                weaponList[j].active = false;
            }
            machinegun.active = true;
            machinegun.clipCurrent = machinegun.clip;
            machinegun.reloadCurrent=machinegun.reload;
            itemList.splice(i, 1);
        }else if(list[i].hold == 3){ //ARMOR
            armor = armor+50;
            if(armor>100){
                armor = 100;
            }
            itemList.splice(i, 1);
        }else if(list[i].hold == 4){ //DOUBLEBARREL
            for(j=0 ; j < weaponList.length ; j++){
                weaponList[j].active = false;
            }
            doublebarrel.active = true;
            doublebarrel.clipCurrent = doublebarrel.clip;
            doublebarrel.reloadCurrent = doublebarrel.reload;
            itemList.splice(i, 1);
        }else if(list[i].hold == 5){ //BAZOOKA
            for(j=0 ; j < weaponList.length ; j++){
                weaponList[j].active = false;
            }
            bazooka.active = true;
            bazooka.clipCurrent = bazooka.clip;
            bazooka.reloadCurrent = bazooka.reload;
            itemList.splice(i, 1);
        }else if(list[i].hold == 6){ //freeze
            freezeActive = true;
            freezeTimer = 300;
            itemList.splice(i, 1);
        }else if(list[i].hold == 7){ //turret
            alliesList.push(new turret(list[i].x,list[i].y));
            itemList.splice(i, 1);
        }
    }
    }
}

function reward(obj)
{
    x=obj.x;
    y=obj.y;
    rand = random(1,20);
    rand = floor(rand);
    switch (rand) {
  case 1:
    itemList.push(new Item(x,y,0));  //score+10
    break;
  case 2:
    itemList.push(new Item(x,y,1)); //rifle
    break;
  case 3:
    itemList.push(new Item(x,y,2)); //machine gun
    break;
  case 4:
    itemList.push(new Item(x,y,3)); //armor
    break;
  case 5:
    itemList.push(new Item(x,y,4)); //doublebarrel
    break;
  case 6:
    itemList.push(new Item(x,y,5)); //bazooka
    break;
  case 7:
    itemList.push(new Item(x,y,6)); //freeze
    break;
  case 8:
    itemList.push(new Item(x,y,7)); //turret
    break;
}
}

function moveAll(list){

for(i=0;i < list.length;i++){

    if(missionType == 2){ //if mission type: def objective
        if(odleglosc(list[i].x,px,list[i].y,py) > odleglosc(list[i].x,Radar.x,list[i].y,Radar.y)){ //bliżej do radaru
            if(collideCircleCircle(list[i].x,list[i].y,list[i].size*2,Radar.x,Radar.y,Radar.size*2)){
                list[i].vx=list[i].vy=0;
            }else{
                if(list[i] instanceof zerg3 && list[i].inRange){
            
                }else{
                zergMoveTarget(list[i],Radar.x,Radar.y); 
                    } 
        
                }
                //rotate
                list[i].a = atan2(Radar.y - list[i].y, Radar.x - list[i].x) + 90;
            
            }else{ //bliżej do gracza
                if(collideCircleCircle(list[i].x,list[i].y,list[i].size*2,px,py,psize)){
                list[i].vx=list[i].vy=0;
            }else{
                if(list[i] instanceof zerg3 && list[i].inRange){
            
                }else{
                zergMoveTarget(list[i],px,py); 
                    } 
        
                }
                //rotate
                list[i].a = atan2(py - list[i].y, px - list[i].x) + 90;
            }
        
    }else{ // not mission type 2
        //STOP
    if(collideCircleCircle(list[i].x,list[i].y,list[i].size*2,px,py,psize)){
        list[i].vx=list[i].vy=0;
    }
        //MOVE ZERG
    else{
           if(list[i] instanceof zerg3 && list[i].inRange){
               
        }else if(list[i] instanceof ultralisk && list[i].specialMode == 1){ //spacial mode 1 - charging
            
        }else{
           zombieMove(list[i]); 
        } 
        
    }
        //rotate
        if(list[i].specialMode == 1 || list[i].specialMode == 2){
            
        }else{
            list[i].a = atan2(py - list[i].y, px - list[i].x) + 90;
        }
        
        
    }
    
    }
}
function zergMoveTarget(obj,x,y){
obj.distance = odleglosc(x,obj.x,y,obj.y);
obj.vx=((x-obj.x)/obj.distance)*obj.speed;
obj.vy=((y-obj.y)/obj.distance)*obj.speed;
obj.x=obj.x+obj.vx;
obj.y=obj.y+obj.vy;
}

function zombieMove(obj){
    if(obj instanceof ultralisk && obj.specialMode == 2){
        obj.vx=obj.vx+obj.vx*0.1;
        obj.vy=obj.vy+obj.vy*0.1;
        obj.x=obj.x+obj.vx;
        obj.y=obj.y+obj.vy;
    }else{
       obj.distance = odleglosc(px,obj.x,py,obj.y);
        obj.vx=((px-obj.x)/obj.distance)*obj.speed;
        obj.vy=((py-obj.y)/obj.distance)*obj.speed;
        obj.x=obj.x+obj.vx;
        obj.y=obj.y+obj.vy; 
    }

}