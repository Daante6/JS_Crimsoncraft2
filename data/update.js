function Update()
{
    //sterowanie
        if(keyIsDown(83)){ //S
            if(py<bckground.height-playerImage.height/2){
                py=py+pspeed;
                legsy=-1;
            }
            
        }else if(keyIsDown(87)){ //W
            if(py>playerImage.height/2){
                py=py-pspeed;
                legsy=1;
            }
        }else{
            legsy=0;
        }
        if(keyIsDown(65)){ //A
            if(px>playerImage.width/2){
            px=px-pspeed;
            legsx=-1;
            }
        }else if(keyIsDown(68)){ //D
            if(px<bckground.width-playerImage.width/2){
                px=px+pspeed;
                legsx=1;
            }
        }else{
            legsx=0;
        }
    
    //Sound effects
    if(keyIsDown(77)){ //M
        mute=1;
            musicShot.setVolume(0, 0, 0);
        musicHitActive.setVolume(0, 0, 0);
        musicZerg1.setVolume(0, 0, 0);
        musicBcg.setVolume(0, 0, 0);
        musicDie.setVolume(0,0,0);
    }
    if(keyIsDown(78)){ //N
        mute=0;
            musicShot.setVolume(0.2, 0, 0);
        musicHitActive.setVolume(0.2, 0, 0);
         musicZerg1.setVolume(0.2, 0, 0);
         musicBcg.setVolume(0.5, 0, 0);
        musicDie.setVolume(0.2,0,0);
    }
    
    
                                        //FIREARM
    //rate of fire
    for( b = 0 ; b < weaponList.length ; b++)
        {
            if(weaponList[b].ready > 0){
               weaponList[b].ready--; 
            }
            if(weaponList[b].clipCurrent == 0){
                weaponList[b].reloadCurrent--;
                //fast reload
                if(weaponList[b].reloadCurrent/weaponList[b].reload > 0.25 && weaponList[b].reloadCurrent/weaponList[b].reload < 0.50)
                   {
                        if(keyIsDown(82) && freload.active == true) //R
                        {
                            weaponList[b].reloadCurrent=0;
                        }
                   }
                if(weaponList[b].reloadCurrent <= 0){
                    weaponList[b].clipCurrent = weaponList[b].clip;
                    weaponList[b].reloadCurrent = weaponList[b].reload;
                }
            }
        }
    //fire
    if (mouseIsPressed) {
    for( b = 0 ; b < weaponList.length ; b++)
        {
            if(weaponList[b].active == true){
                if(weaponList[b].ready == 0 && weaponList[b].clipCurrent > 0){
                   weaponList[b].fire();
                   }
            }
            
        }
        if(rifle.active){
            if(recoil < 7){
                recoil = recoil + 0.5;
            }
        }else if(machinegun.active){
            if(recoil < 9){
                recoil = recoil + 0.5;
            }
            }
    }else{
                recoil = 0;
            }
    
    switch (missionActive) {
    case 0: //survival
        mission0(); 
        break;
    case 1: //mission1
        mission1(); 
        break;
    case 2: //mission2
        mission2(); 
        break;
    case 3: //mission3
        mission3(); 
        break;
    case 4: //mission4
        mission4(); 
        break;
    case 5: //mission5
        mission5();
        break;
    }
                                    //TIME
    if(clockActive){
        clockCount++;
    if(clockCount == 60){
        clockCount = 0;
        clockSec++;
        if(missionType == 2){
            objectiveTime--;
            if(objectiveTime<=0){
                pause=1;
            }
        }
    }
    }
                                    //CHECK SHOOTING ENEMY IN RANGE
    for(i=0;i < aiList.length;i++){
        if(aiList[i] instanceof zerg3){
            
            if(aiList[i].reloadC > 0){
                aiList[i].reloadC--;
            }
            
            if(odleglosc(aiList[i].x,px,aiList[i].y,py) < aiList[i].range){
                aiList[i].inRange = 1;
                aiList[i].fire();
            }else if(missionType == 2){
                if(odleglosc(aiList[i].x,Radar.x,aiList[i].y,Radar.y) < aiList[i].range){
                    aiList[i].inRange = 1;
                    aiList[i].fire();
                }
            }else{
                aiList[i].inRange = 0;
            }
        }
    }
    
                                    //ULTRALISK Special attack
    for(i=0;i < aiList.length;i++){
        if(aiList[i] instanceof ultralisk){
            aiList[0].specialCode();
        }
    }
    
                                      //MOVE ALL - CODE IN ENEMY.JS
    bulletMove(bulletList);
    bulletMove(aiBulletList);
    if(freezeActive == false){
        moveAll(aiList);
    }
    if(magnes.active == true){
        moveAll(itemList);
    }
                                    //TURRET SHOTS
    for(i=0;i < alliesList.length;i++){
        if(alliesList[i].cd == 0){
            bulletList.push(new bullet1( alliesList[i].x,alliesList[i].y,alliesList[i].a));
            alliesList[i].cd = 3;
        }else{alliesList[i].cd--;}
        alliesList[i].a = alliesList[i].a + 3;
        if(alliesList[i].a > 269) { alliesList[i].a = -90; }
        if(alliesList[i].timer <= 0) { 
            alliesList.splice(i, 1); 
        }else{alliesList[i].timer--;}
        
    }
  
    
                                      //HITBOX CHECK - CODE IN ENEMY.JS
    hitboxbz(aiList); 
    hitboxbs(spawnList);
    hitboxpz(aiList);
    hitboxpi(itemList);
    hitboxpzb(aiBulletList);
    if(missionType == 2){
        hitboxzobj(aiList);
    }
    
                                    //BONUSES
    if(freezeActive == true){
        freezeTimer--;
        if(freezeTimer<=0){
            freezeActive = false;
        }
    }
    
    
    
                                    //CONSTANT PERK
    if(medic2.active){
        if(hp < 100){
            hp=hp+0.025;
        }
    }
    if(medic1.active){
        if(hp < 40){
            hp=hp+0.05;
        }
    }
    
}  //END UPDATE FUNCTION

                                      //LEVEL UP, CREATE LEVEL-UP WINDOW
    function checkLvlUp(){
        if(plevel >= perkList.length+1){
            exp = 0;
        }else{
        if(exp>=expNeeded){
        pause=1;
        levelUp = true;
        lvlUpX = width/2;
        levelUpWindow();
        plevel++;
        exp=exp-expNeeded;
        expNeeded = expNeeded+expNeeded*0.5;
    }
    }}
