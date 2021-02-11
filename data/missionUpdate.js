function missionTypeF(){ //0: survival 1: KillThemAll 2: DefendObjective 3: BossFight
    if(missionActive == 1){
        missionType = 1;
    }else if(missionActive == 2){
        missionType = 1;
    }else if(missionActive == 3){
        missionType = 2;
    }else if(missionActive == 4){
        missionType = 2;
    }else if(missionActive == 5){
        missionType = 3;
    }else if(missionActive == 0){
        missionType = 0;
    }
    
}

function missionAvaCheck(){
    for(i=0;i<20;i++){
        if(missionsAva > i){
            missionList[i].text = i+1;
        }else{
           missionList[i].text = 'X'; 
        }
    }
}

                                                //SURVIVAL
function mission0(){ 
                                          //SPAWN ENEMY
    if(cdspawn!=0){ //cdspawn for Zergs
        cdspawn--;
    }else{
        aiList.push(new zerg2(spawnX(),spawnY()));
        aiList.push(new zerg2(spawnX(),spawnY()));
        aiList.push(new zerg3(spawnX(),spawnY()));
        aiList.push(new zerg3(spawnX(),spawnY()));
        cdspawn=150;
    }
    if(cdSpawn!=0){ //cdSpawn for Spawns
        cdSpawn--;
    }else{
        spawnList.push(new Spawn(-1,-1));
        cdSpawn=2000;
    }               //Spawns spawning Zergs
    for(i=0;i < spawnList.length;i++){
    spawnList[i].spawnZerg();
    }
}
                                                    //mission1
function mission1(){ 
                                            //SPAWN ENEMY
    if(cdspawn!=0){ //cdspawn for Zergs
        cdspawn--;
    }else{
        if(objectiveCount - aiList.length > 0){
            aiList.push(new zerg1(spawnX(),spawnY()));
        }
        if(objectiveCount - aiList.length > 0){
            aiList.push(new zerg2(spawnX(),spawnY()));
        }
        cdspawn=120;
    }
    if(rifle.active != true){
        if(clockSec % 10 == 0 && clockCount == 0){
            itemList.push(new Item(200,200,1)); //rifle
        }
    }
    /*
    if(clockSec == 0 && clockCount == 0){
        aiList.push(new ultralisk(200,200)); 
    }*/
}

                                                    //mission2
function mission2(){ 
                                            //SPAWN ENEMY
    if(cdspawn!=0){ //cdspawn for Zergs
        cdspawn--;
    }else{
        if(objectiveCount - aiList.length > 0){
            aiList.push(new zerg1(spawnX(),spawnY()));
        }
        if(objectiveCount - aiList.length > 0){
            aiList.push(new zerg2(spawnX(),spawnY()));
        }
        cdspawn=120;
    }
    if(clockSec == 0 && clockCount == 0){
        spawnList.push(new Spawn(200,200));
        spawnList.push(new Spawn(bckground.width-200,bckground.height-200)); 
    }
    if(clockSec == 15 && clockCount == 0){
        spawnList.push(new Spawn(bckground.width-200,200));
        spawnList.push(new Spawn(200, bckground.height-200)); 
    }
    for(i=0;i < spawnList.length;i++){
    spawnList[i].spawnZerg();
    }
    if(clockSec == 0 && clockCount == 0){
            itemList.push(new Item(bckground.width/2,bckground.height/2,1)); //rifle
        }
    
}

                                                    //mission3
function mission3(){ 
                                            //SPAWN ENEMY
    if(cdspawn!=0){ //cdspawn for Zergs
        cdspawn--;
    }else{
        aiList.push(new zerg1(spawnX(),spawnY()));
        aiList.push(new zerg2(spawnX(),spawnY()));
        cdspawn=350;
    }
    if(clockSec == 110 && clockCount == 0){
        for(i=0;i<3;i++){
            aiList.push(new zerg1(spawnX(),spawnY()));
            aiList.push(new zerg2(spawnX(),spawnY()));
        }
         
    }
    if(clockSec == 0 && clockCount == 0){
        spawnList.push(new Spawn(bckground.width-200,200)); 
    }
    if(clockSec == 70 && clockCount == 0){
        spawnList.push(new Spawn(bckground.width-200,bckground.height-200));  
    }
    for(i=0;i < spawnList.length;i++){
    spawnList[i].spawnZerg();
    }
    if(clockSec == 0 && clockCount == 0){
            itemList.push(new Item(bckground.width/2,bckground.height/2,1)); //rifle
        }
    
}

                                                    //mission4
function mission4(){ 
                                            //SPAWN ENEMY
    
    if(clockSec == 0 && clockCount == 0){
        for(i=0;i<10;i++){
            aiList.push(new zerg2(spawnX(),spawnY())); 
        }
        
    }
    if(clockSec == 20 && clockCount == 0){
        
        Radar.hp=Radar.hp+0.2*Radar.maxhp;
        if(Radar.hp > Radar.maxhp){
            Radar.hp=Radar.maxhp;
        }
        for(i=0;i<25;i++){
            aiList.push(new zerg1(spawnX(),spawnY())); 
        }
        
    }
    if(clockSec == 65 && clockCount == 0){
        
        Radar.hp=Radar.hp+0.2*Radar.maxhp;
        if(Radar.hp > Radar.maxhp){
            Radar.hp=Radar.maxhp;
        }
        
        for(i=0;i<10;i++){
            aiList.push(new zerg2(spawnX(),spawnY())); 
        }
        
    }
    if(clockSec == 75 && clockCount == 0){
        
        Radar.hp=Radar.hp+0.2*Radar.maxhp;
        if(Radar.hp > Radar.maxhp){
            Radar.hp=Radar.maxhp;
        }
        
        for(i=0;i<9;i++){
            aiList.push(new zerg3(spawnX(),spawnY())); 
        }
        
    }
    if(clockSec == 95 && clockCount == 0){
        
        Radar.hp=Radar.hp+0.2*Radar.maxhp;
        if(Radar.hp > Radar.maxhp){
            Radar.hp=Radar.maxhp;
        }
        
        for(i=0;i<12;i++){
            aiList.push(new zerg2(spawnX(),spawnY())); 
        }
        
    }
    if(clockSec == 110 && clockCount == 0){
        
        Radar.hp=Radar.hp+0.2*Radar.maxhp;
        if(Radar.hp > Radar.maxhp){
            Radar.hp=Radar.maxhp;
        }
        
        for(i=0;i<13;i++){
            aiList.push(new zerg2(spawnX(),spawnY())); 
        }
        
    }
    if(clockSec == 135 && clockCount == 0){
        
        Radar.hp=Radar.hp+0.2*Radar.maxhp;
        if(Radar.hp > Radar.maxhp){
            Radar.hp=Radar.maxhp;
        }
        
        for(i=0;i<4;i++){
            aiList.push(new zerg2(spawnX(),spawnY()));
            aiList.push(new zerg2(spawnX(),spawnY()));
            aiList.push(new zerg3(spawnX(),spawnY()));
        }
        
    }
    if(clockSec == 200 && clockCount == 0){
        
        Radar.hp=Radar.hp+0.2*Radar.maxhp;
        if(Radar.hp > Radar.maxhp){
            Radar.hp=Radar.maxhp;
        }
        
        for(i=0;i<5;i++){
            aiList.push(new zerg2(spawnX(),spawnY()));
            aiList.push(new zerg2(spawnX(),spawnY()));
            aiList.push(new zerg3(spawnX(),spawnY()));
            aiList.push(new zerg3(spawnX(),spawnY()));
        }
        
    }
    if(clockSec == 0 && clockCount == 0){
            itemList.push(new Item(bckground.width/2,bckground.height/2,2)); //machinegun
        }
    
}
                                                    //mission5 - boss battle
function mission5(){ 
                                            //SPAWN ENEMY
    if(clockSec == 0 && clockCount == 0){
            itemList.push(new Item(bckground.width/2,bckground.height/2,2)); //machinegun
            aiList.push(new ultralisk(bckground.width,0));
        }
    
}