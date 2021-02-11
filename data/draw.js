function GameDraw()
{

        background(51);
        
        push();                            // prawdziwe 0,0
    
        // background X end
        if(px<(width/2)){
            bcgx=0;
        }
        else if(px>bckground.width - width/2){
            bcgx = 0-bckground.width+width;
        }
        else{
            bcgx=0-px+(1/2*width);
        }
        
        // background Y end
        if(py<(height/2)){
            bcgy=0;
        }else if(py>bckground.height - height/2){
            bcgy = 0-bckground.height+height;
        }else
        {
            bcgy=0-py+(1/2*height);
        }
    translate(bcgx,bcgy); 
    image(bckground, 0, 0);
    drawObjectsCorpse(aiCorpseList);
    drawObjectsSpawn(spawnList);
    drawObjectsAi(aiList);
    drawObjectsAllies(alliesList);
    drawObjectsAiBullets(aiBulletList);
    drawObjectsBullets(bulletList);
    drawObjectsItem(itemList);
    if(missionType == 2){
        image(ObjectDefImg,Radar.x-Radar.size,Radar.y-Radar.size);
        
    }
    
    
    pop();
        
    
    

        
                                     //PLAYER DRAW
{
        if(px<(width/2)) //X
           {
               drawpx = px
           }else if(px>bckground.width - width/2){
               drawpx = px - bckground.width+width;
           }else{
               drawpx = width/2;
           }
        if(py<(height/2)) //Y
           {
               drawpy = py;
           }else if(py>bckground.height - height/2){
               drawpy = py - bckground.height+height;
           }else{
               drawpy =  height/2;
           }
    
    pAlfa = atan2(mouseY - drawpy, mouseX - drawpx) + 90;
    push();
    translate(drawpx,drawpy);
    
    //LEGS
    if(legsx !=0 || legsy!=0){
        legsStepC++;
    }
    if(legsStepC > 8){
        legsStepC = 0;
        legsStep++;
        if(legsStep > 7){
            legsStep = 0;
        }
    }
    push();
    if(legsx>0){
        if(legsy>0){
            rotate(45);
        }else if(legsy<0){
            rotate(135);
        }else{
            rotate(90);
        }
        
    }else if(legsx<0){
        if(legsy>0){
            rotate(-45);
        }else if(legsy<0){
            rotate(-135);
        }else{
            rotate(-90);
        }
    }else if(legsy<0){
        rotate(180);
    }
    image(legsAnimation[legsStep],0-legsAnimation[0].width/2,0-legsAnimation[0].height/2);
    pop();
    
    image(shadow,0-shadow.width/2,0-shadow.height/2);
    rotate(pAlfa);
    image(playerImage,0-playerImage.width/2,0-playerImage.height/2);
    
    pop();
    if(hp <= 0){
        buttonReset.locate(width/2-75, height-100);
        buttonReset.text = "Reset";
        buttonReset.draw();
    }
    if((missionType == 1 || missionType == 3) && objectiveCount == 0){
        missonCompleteButton.locate(width/2-75, height-100);
        missonCompleteButton.text = "Main menu";
        missonCompleteButton.draw();
    }
    if(missionType == 2 && objectiveTime == 0){
        missonCompleteButton.locate(width/2-75, height-100);
        missonCompleteButton.text = "Main menu";
        missonCompleteButton.draw();
    }
}
                
    
    
    
                                          //SCORE HUD
    push();
    
    image(HUD,0,0);
    image(scorehud,width/2-scorehud.width/2,0);
    if(missionType == 0){
    fill('white');
    scoretext = score;
    if(score<100000){
        scoretext='0'+scoretext;
    }
    if(score<10000){
        scoretext='0'+scoretext;
    }
    if(score<1000){
        scoretext='0'+scoretext;
    }
    if(score<100){
        scoretext='0'+scoretext;
    }
    if(score<10){
        scoretext='0'+scoretext;
    }
    text(scoretext,width/2,10);
                                        //EXP BAR
    fill('white');
    rect(width/2-70,31,140,10);
    fill('blue');
    rect(width/2-70,31,(exp/expNeeded)*140,10);
    }else if(missionType == 1){ //kill em all
        fill('white');
        if(objectiveCount == 0){
            text('Mission complete',width/2,10);
        }else{
        text('Monsters left: ' + objectiveCount,width/2,10); 
        }
    }else if(missionType == 2){ //def objective
        fill('white');
        if(objectiveTime < 1){
            text('Mission complete',width/2,10);
        }else{
        text('Signal send: ' + floor((((objectiveTimeStart)-objectiveTime)/(objectiveTimeStart))*100) + "%",width/2,10);
        text('Turret integrity: ' + floor((Radar.hp/Radar.maxhp)*100) + '%',width/2,33);
        }
    }else if(missionType == 3){ //BOSS FIGHT
        fill('white');
        if(objectiveCount == 0){
            text('Mission complete',width/2,10);
        }else{
        text('Kill the Ultralisk!',width/2,10); 
        }
        fill('white');
        rect(width/2-50,33,100,5);
        fill('red');
        if(aiList.length>0){
           rect(width/2-50,33,aiList[0].hp/aiList[0].hpmax,5); 
        }
        
    }
                                        //HP/WEAPON
    
    fill('white');                          //HP
    rect(25,6,100,5);
    if(hp > 40){
        fill('green');
    }else{
        fill('red');
    }
    
    rect(25,6,hp,5);
    fill('grey');                         //ARMOR
    rect(25,10,100,4);
    fill('blue');                         
    rect(25,10,armor,4);
                                          //WEAPON
    if(pistol.active){
        image(pistolImg, 150, 0);
    }else if(rifle.active){
        image(rifleImg, 150, 0);
    }else if(machinegun.active){
        image(machinegunImg, 150, 0);
    }else if(doublebarrel.active){
        image(dbarrelImg, 150, 0);
    }else if(bazooka.active){
        image(bazookaImg, 150, 0);
    }
    pop();

    if(levelUp == true)
        {
            
            if(lvlUpX > 0){
                lvlUpX = lvlUpX-20;
            }
            /*else{
                lvlUpX=0;
                
            }*/
            push();
            translate(lvlUpX,0);
            fill(61);
            rect(width/2-200,100,400,350);
            button1.draw();
            if(button2.active){
                button2.draw();
            }
            if(button3.active){
                button3.draw();
            }
            if(button4.active){
                button4.draw();
            }
            fill('white');
            text( 'Level up!' , width/2 , 120 );
            text( levelUpText , width/2+10 , 150 , 150 , 200);
            pop();
        }
    
    image(aim,mouseX-15,mouseY-15,30,30);
    
    
    if(!pause){
        for( b = 0 ; b < weaponList.length ; b++)
        {
            if(weaponList[b].active){
                push();
                noFill();
                strokeWeight(2);
                if(weaponList[b].reloadCurrent/weaponList[b].reload > 0.25 && weaponList[b].reloadCurrent/weaponList[b].reload < 0.50 && freload.active == true){
                    stroke('green');
                }else{
                    stroke('blue');
                }
                
                
                arc(mouseX,mouseY,37,37,-90,(((weaponList[b].reload-weaponList[b].reloadCurrent)/weaponList[b].reload)*360)-90);
                strokeWeight(1);
                stroke('blue');
                text(weaponList[b].clipCurrent,mouseX+30,mouseY-30);
                pop();
                
            }
        }
    }
    
    
} //END GameDraw() function

function drawObjectsAllies(list){

for(i=0;i < list.length;i++){
    if(list[i] instanceof turret){
        push();
        translate( list[i].x , list[i].y );
        rotate(list[i].a);
        image(turretImg,0-list[i].size,0-list[i].size);
        pop();
    }
}
}

function drawObjectsAiBullets(list){
    for(i=0;i < list.length;i++){
        if(list[i] instanceof zerg3Bullet)  //Pistol,Rifle,Machinegun
    {
        fill('green');
        circle(list[i].x, list[i].y, list[i].size );
    }
    }
}

function drawObjectsSpawn(list){

for(i=0;i < list.length;i++){
    if(list[i] instanceof Spawn){
        push();
        translate( list[i].x , list[i].y );
        image(spawn1img,0-list[i].size/2,0-list[i].size/2,50,50);
        pop();
    }
    }
}


function drawObjectsBullets(list){

for(i=0;i < list.length;i++){
    if(list[i] instanceof bullet1 || list[i] instanceof bullet2)  //Pistol,Rifle,Machinegun
    {
        fill('red');
        circle(list[i].x, list[i].y, list[i].size );
    }else if(list[i] instanceof bullet3){                         //Shotgun/whatever
        fill('red');
        circle(list[i].x, list[i].y, list[i].size );
    }else if(list[i] instanceof bullet4){
        if(list[i].explode == true){
            push();
            translate( list[i].x , list[i].y );
            tint(255, (list[i].explodeLife/30)*255);
            image(explosion,0-list[i].size/2,0-list[i].size/2);
            noTint();
            pop();
        }else {                         //Shotgun/whatever
        fill('red');
        circle(list[i].x, list[i].y, list[i].size-4 );
    }
    }
    }
}

function drawObjectsAi(list){

for(i=0;i < list.length;i++){
        
    if(list[i] instanceof zerg1){
        //OBRÓC
    if(freezeActive == true){
        
    }else{
        //list[i].a = atan2(py - list[i].y, px - list[i].x) + 90;
    }
    push();
    translate( list[i].x , list[i].y );
        
        //animacja
        list[i].drawStepC++;
        if(list[i].drawStepC > 8){
        list[i].drawStepC = 0;
        list[i].drawStep++;
        if(list[i].drawStep > 6){
            list[i].drawStep = 0;
            }
        }
        
    rotate(list[i].a);
        image(zerg1Animation[list[i].drawStep],0-list[i].size,0-list[i].size);
        //FREEZE ACTIVE
        if(freezeActive == true){
        image(freeze,0-list[i].size,0-list[i].size);
    }
    pop();
    
    }else if(list[i] instanceof zerg2){
        //OBRÓC
    if(freezeActive == true){
        
    }else{
        //list[i].a = atan2(py - list[i].y, px - list[i].x) + 90;
    }
    push();
    translate( list[i].x , list[i].y );
        
        //animacja
        list[i].drawStepC++;
        if(list[i].drawStepC > 8){
        list[i].drawStepC = 0;
        list[i].drawStep++;
        if(list[i].drawStep > 6){
            list[i].drawStep = 0;
            }
        }
        
    rotate(list[i].a);
        image(zerg2Animation[list[i].drawStep],0-list[i].size,0-list[i].size);
        //FREEZE ACTIVE
        if(freezeActive == true){
        image(freeze,0-list[i].size,0-list[i].size);
    }
    pop();
    
    }else if(list[i] instanceof zerg3){           //HYDRALISK
        //OBRÓC
    if(freezeActive == true){
        
    }else{
        //list[i].a = atan2(py - list[i].y, px - list[i].x) + 90;
    }
    push();
    translate( list[i].x , list[i].y );
        
        //animacja
        if(list[i].inRange){
            list[i].drawStepC++;
            if(list[i].drawStepC > 20){
            list[i].drawStepC = 0;
            list[i].drawStep++;
            if(list[i].drawStep > 6){
                list[i].drawStep = 4;
            }
            }
        }else{
           list[i].drawStepC++;
            if(list[i].drawStepC > 6){
            list[i].drawStepC = 0;
            list[i].drawStep++;
            if(list[i].drawStep > 3){
                list[i].drawStep = 0;
            }
            } 
        }
        
        
    rotate(list[i].a);
        image(zerg3Animation[list[i].drawStep],0-list[i].size,0-list[i].size);
        //FREEZE ACTIVE
        if(freezeActive == true){
        image(freeze,0-list[i].size,0-list[i].size);
    }
    pop();
    
    }
    
    else if(list[i] instanceof ultralisk){                //ULTRALISK
        //OBRÓC
    if(freezeActive == true){
        
    }else{
        //list[i].a = atan2(py - list[i].y, px - list[i].x) + 90;
    }
    push();
    translate( list[i].x , list[i].y );
        
        
        //animation
        if(list[i].inRange){ //collision with player
            list[i].drawStepC++;
            if(list[i].drawStepC > 3){
            list[i].drawStepC = 0;
            list[i].drawStep++;
            if(list[i].drawStep > 7){
                list[i].drawStep = 5;
            }
            }
        }else if(list[i].inRange == 0){               //movement
           list[i].drawStepC++;
            if(list[i].drawStepC > 3){
            list[i].drawStepC = 0;
            list[i].drawStep++;
            if(list[i].drawStep > 5){
                list[i].drawStep = 0;
            }
            } 
        }
        if(list[i].specialMode == 1){               //charging
           if(list[i].drawStep<8){
               list[i].drawStep=8;
           }
            list[i].drawStepC++;
            if(list[i].drawStepC > 2){
            list[i].drawStepC = 0;
            list[i].drawStep++;
            if(list[i].drawStep > 9){
                list[i].drawStep = 8;
            }
            } 
        }
        if(list[i].specialMode == 2){               //attack
           list[i].drawStep = 10; 
        }
        
    
    rotate(list[i].a);
    
        image(ultraliskAnimation[list[i].drawStep],0-list[i].size,0-list[i].size);
        //FREEZE ACTIVE
        if(freezeActive == true){
        image(freeze,0-list[i].size,0-list[i].size);
    }
    pop();
    
    }
    
    }
}

function drawObjectsItem(list){

for(i=0;i < list.length;i++){
    if(list[i] instanceof Item){
        if(list[i].hold == 0){
            image(scoreBig,list[i].x-list[i].size/2,list[i].y-list[i].size/2,list[i].size,list[i].size);
        }else if(list[i].hold == 1){
            image(rifleBig,list[i].x-list[i].size/2,list[i].y-list[i].size/2,list[i].size,list[i].size);
        }else if(list[i].hold == 2){
            image(machinegunBig,list[i].x-list[i].size/2,list[i].y-list[i].size/2,list[i].size,list[i].size);
        }else if(list[i].hold == 3){
            image(armorBig,list[i].x-list[i].size/2,list[i].y-list[i].size/2,list[i].size,list[i].size);
        }else if(list[i].hold == 4){
            image(dbarrelBig,list[i].x-list[i].size/2,list[i].y-list[i].size/2,list[i].size,list[i].size);
        }else if(list[i].hold == 5){
            image(bazookaBig,list[i].x-list[i].size/2,list[i].y-list[i].size/2,list[i].size,list[i].size);
        }else if(list[i].hold == 6){
            image(freezeBig,list[i].x-list[i].size/2,list[i].y-list[i].size/2,list[i].size,list[i].size);
        }else if(list[i].hold == 7){
            image(turretBig,list[i].x-list[i].size/2,list[i].y-list[i].size/2,list[i].size,list[i].size);
        }
    }
}}
    
function drawObjectsCorpse(list){

for(i=0;i < list.length;i++){
    if(list[i] instanceof zerg1Corpse){
        push();
        translate( list[i].x , list[i].y );
        rotate(list[i].a);
        //tint(255, list[i].time);
        image(zerg1Animation[7],0-list[i].size,0-list[i].size);
        //noTint();
        pop();
        
        
        list[i].time--;
        if(list[i].time < 0){
            list.splice(i, 1);
        }
    }else if(list[i] instanceof zerg2Corpse){
        push();
        translate( list[i].x , list[i].y );
        rotate(list[i].a);
        //tint(255, list[i].time);
        image(zerg2Animation[7],0-list[i].size,0-list[i].size);
        //noTint();
        pop();
        
        
        list[i].time--;
        if(list[i].time < 0){
            list.splice(i, 1);
        }
    }else if(list[i] instanceof zerg3Corpse){
        push();
        translate( list[i].x , list[i].y );
        rotate(list[i].a);
        //tint(255, list[i].time);
        image(zerg3Animation[7],0-list[i].size,0-list[i].size);
        //noTint();
        pop();
        
        
        list[i].time--;
        if(list[i].time < 0){
            list.splice(i, 1);
        }
    }else if(list[i] instanceof ultraliskCorpse){
        push();
        translate( list[i].x , list[i].y );
        rotate(list[i].a);
        //tint(255, list[i].time);
        image(ultraliskAnimation[11],0-list[i].size,0-list[i].size);
        //noTint();
        pop();
        
        
        list[i].time--;
        if(list[i].time < 0){
            list.splice(i, 1);
        }
    }
}
}