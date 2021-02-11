let musicBcg;
let musicBcgV=0.3;
let musicShoot;
let musicHit;
let musicHitActive;

function preload() {
    
    bckground = loadImage('graphic/tlo.jpg');
    title = loadImage('graphic/title.png');
    playerImage = loadImage('graphic/player.png');
    
    legsSprite = loadImage('graphic/legsSprite.png');
    legsData = loadJSON('data/legs.json');
    
    shadow = loadImage('graphic/shadow.png');
    aim = loadImage('graphic/aim.png');
    HUD = loadImage('graphic/hud.png');
    scorehud = loadImage('graphic/scorehud.png');
    
    zerg1Data = loadJSON('data/zerg1Data.json');
    ultraliskData = loadJSON('data/ultraliskData.json');
    
    zerg1Sprite = loadImage('graphic/zerg1Sprite.png');
    zerg2Sprite = loadImage('graphic/zerg2Sprite.png');
    zerg3Sprite = loadImage('graphic/zerg3Sprite.png');
    spawn1img = loadImage('graphic/spawn1.png');
    ultraliskSprite = loadImage('graphic/ultraliskSprite.png');
    
    pistolImg = loadImage('graphic/pistol.png');
    rifleImg = loadImage('graphic/rifle.png');
    rifleBig = loadImage('graphic/rifleBig.png');
    machinegunImg = loadImage('graphic/machinegun.png');
    machinegunBig = loadImage('graphic/machinegunBig.png');
    bazookaImg = loadImage('graphic/bazooka.png');
    bazookaBig = loadImage('graphic/bazookaBig.png');
    dbarrelImg = loadImage('graphic/dbarrel.png');
    dbarrelBig = loadImage('graphic/dbarrelBig.png');
    scoreBig = loadImage('graphic/scoreBig.png');
    armorBig = loadImage('graphic/armorBig.png');
    
    explosion = loadImage('graphic/explosion.png');
    
    //BONUSES
    freezeBig = loadImage('graphic/freezeBig.png');
    freeze = loadImage('graphic/freeze.png');
    
    //ALLIES
    turretImg = loadImage('graphic/turret.png');
    turretBig = loadImage('graphic/turretBig.png');
    ObjectDefImg = loadImage('graphic/ObjectDefImg.png');
    
    musicBcg = loadSound('sound/bcg.mp3');
    musicBcg.setVolume(0.2, 0, 0);
    musicBcg.playMode('restart');
    musicShot = loadSound('sound/shot.mp3');
    musicShot.playMode('sustain');
    musicShot.setVolume(0.5, 0, 0);
    
    musicDie = loadSound('sound/die.mp3');
    musicDie.setVolume(0.2, 0, 0);
    
    musicZerg1 = loadSound('sound/zerg1.mp3');
    musicZerg1.setVolume(0.2, 0, 0);
    
    musicHit1 = loadSound('sound/hit1.mp3');
    musicHit2 = loadSound('sound/hit2.mp3');
    musicHit3 = loadSound('sound/hit3.mp3');
    musicHit4 = loadSound('sound/hit4.mp3');
    musicHit5 = loadSound('sound/hit5.mp3');
    musicHit6 = loadSound('sound/hit6.mp3');
    musicHit7 = loadSound('sound/hit7.mp3');
    musicHit8 = loadSound('sound/hit8.mp3');
    musicHitActive = musicHit1;
}

function setup(){
        
    document.addEventListener('contextmenu', event => event.preventDefault());
    
    createCanvas(windowWidth-5, windowHeight-5);
    frameRate(60);
    
    mute=0;
    missionsAva = 1;
    objectiveCount = 0;
    missionActive = 0; //0: survival, 1: 1. level etc.
    clockActive = false;
    clockCount = 0;
    clockSec = 0;
    missionList = [];
    score = 0;
    hiscore = 0;
    start = 0;
    pause = 0;
    levelUp = false;
    levelUpText = "Choose a perk";
    missionDescription = '';
    angleMode(DEGREES);
    textSize(16);
    strokeWeight(1);
    font="15px Georgia";
    textAlign(CENTER, CENTER);
    ellipseMode(CENTER);
    drawpx = 0;
    drawpy = 0;
    pAlfa = 0;
    showMissions = false;
    
    
    //bonuses
    freezeActive = false;
    freezeTimer = 0;
    
    checkCookie();
    hiscore = getCookie("hiscoreV");
    missionsAva = getCookie("missionsAvaV");
    
                                                            //main menu
                                                            //campaign button
    missions = new Clickable();
    missions.locate(width/2-50, height/2-40);        
    missions.resize(120, 90);
    
    missions.text = 'Campaign';
    missions.onHover = function()
    {
        	
    }
    missions.onOutside = function()
    {
        
    }
    missions.onPress = function()
    { 
        showMissions = true;
        missionAvaCheck();
    }
                                                            //mission select
    for(i=0;i<40;i++){
        missionList.push(new Clickable());
        if(i<10){ //1-10
            missionList[i].locate(width/2-660+(i*130),height/2);
        }else if(i>9 && i<20){ //11-20
            //missionList[i].locate(20+((i-10)*130),height/2+100);
            missionList[i].locate(width/2-660+((i-10)*130),height/2+100);
        }else if(i>19 && i<30){ //21-30
            missionList[i].locate(width/2-660+((i-20)*130),height/2);
        }else if(i>29){ //31-40
            missionList[i].locate(width/2-660+((i-30)*130),height/2+100);
        }
        missionList[i].value = i+1;
        missionList[i].resize(120,90);
        if(missionsAva-1 >= i){
            missionList[i].text = i+1;
        }else{
           missionList[i].text = 'X'; 
        }
        
        missionList[i].onPress = function()
        { 
            if(missionsAva >= this.value){
            missionActive = this.value;
            missionTypeF();
            clockActive = true;
            clockCount = 0;
            clockSec = 0;
            start = 1;
            noCursor();
            //BACKGROUND MUSIC
            musicBcg.play();
            if(this.value == 1){ //first mission
               objectiveCount = 40;
            }else if(this.value == 2){ //2. mission
               objectiveCount = 60;
            }else if(this.value == 3){ //3. mission
                objectiveTime = 140; //5 minutes
                objectiveTimeStart = 140;
                Radar = new ObjectDef(bckground.width / 2,bckground.height / 2);
            }else if(this.value == 4){ //4. mission
                objectiveTime = 220; //5 minutes
                objectiveTimeStart = 220;
                Radar = new ObjectDef(bckground.width / 2,bckground.height / 2);
            }else if(this.value == 5){//5. mission
                objectiveCount = 1;
            }
            }
            
        }
    }//end for mission select
    loadMissionText();
    missionAvaCheck();
    
                                                            //survival button
    survival = new Clickable();
    survival.locate(width/2-50, height/2+60);        
    survival.resize(120, 90);
    
    survival.text = 'Survival\nHighscore: ' + hiscore;
    survival.onHover = function()
    {
        	
    }
    survival.onOutside = function()
    {
        
    }
    survival.onPress = function()
    { 
        clockActive = true;
        clockCount = 0;
        clockSec = 0;
        start = 1;
        noCursor();
        missionActive = 0;
        missionTypeF();
        //BACKGROUND MUSIC
    musicBcg.play();
    musicZerg1.play();
    }
    
                                                //MISSION COMPLETE BUTTON
    missonCompleteButton = new Clickable();
            missonCompleteButton.locate(width/2-75, height/2-25);
            missonCompleteButton.resize(150, 50);
            missonCompleteButton.text = "Reset";
            missonCompleteButton.onPress = function()
        { 
            cursor();
            resetToMenu();
            missionAvaCheck();
            if(missionActive == missionsAva){
                //missionsAva = missionActive+1;
                missionsAva++;
                setCookie("missionsAvaV",missionsAva,365);
            }
        }
    
                                                //RESET TO MENU BUTTON
    buttonReset = new Clickable();     //Create button
            buttonReset.active = true;
            buttonReset.locate(width/2-75, height/2-25);        //Position Button
            buttonReset.resize(150, 50);
            buttonReset.text = "Reset";
            buttonReset.onPress = function() //When myButton is pressed
        { 
            cursor();
            missionAvaCheck();
            resetToMenu();
        }
            //NEXT/PREVIOUS MISSIONS
            nextMissions = 0;
    buttonNextMissions = new Clickable();     //Create button
            buttonNextMissions.active = false;
            buttonNextMissions.locate(width/2+100, height/2+250);        //Position Button
            buttonNextMissions.resize(150, 50);
            buttonNextMissions.text = "More chapters";
            buttonNextMissions.onPress = function() //When myButton is pressed
        { 
            if(nextMissions==0){
                nextMissions=1;
                buttonNextMissions.text = "Previous chapters";
            }else{
                nextMissions=0;
                buttonNextMissions.text = "More chapters";
            }
            
                
        }
    
    resetToMenu();
    
    
                                                            //legs animation
    legsAnimation = [];
    legsFrames = legsData.frames;
    for(i=0 ; i < legsFrames.length ; i++){
        legsPosition = legsFrames[i].position;
        legsImage = legsSprite.get(legsPosition.x , legsPosition.y , legsPosition.w , legsPosition.h);
        legsAnimation.push(legsImage);
    }
    legsStep = 0;
    legsStepC = 0;
    
    //animacja zerg1 0-6, 7 to trup
    zerg1Animation = [];
    zerg1Frames = zerg1Data.frames;
    for(i=0 ; i < zerg1Frames.length ; i++){
        zerg1Position = zerg1Frames[i].position;
        zerg1Image = zerg1Sprite.get(zerg1Position.x , zerg1Position.y , zerg1Position.w , zerg1Position.h);
        zerg1Animation.push(zerg1Image);
    }
    //animacja zerg2 0-6, 7 to trup
    zerg2Animation = [];
    zerg2Frames = zerg1Data.frames;
    for(i=0 ; i < zerg2Frames.length ; i++){
        zerg2Position = zerg1Frames[i].position;
        zerg2Image = zerg2Sprite.get(zerg2Position.x , zerg2Position.y , zerg2Position.w , zerg2Position.h);
        zerg2Animation.push(zerg2Image);
    }
    //animacja zerg3 0-3 movement, 4-6 shoot, 7 dead
    zerg3Animation = [];
    zerg3Frames = zerg1Data.frames;
    for(i=0 ; i < zerg3Frames.length ; i++){
        zerg3Position = zerg1Frames[i].position;
        zerg3Image = zerg3Sprite.get(zerg3Position.x , zerg3Position.y , zerg3Position.w , zerg3Position.h);
        zerg3Animation.push(zerg3Image);
    }
    //animacja Ultralisk 0-4 movement, 5-7 attack, 8-10 special, 11 dead
    ultraliskAnimation = [];
    ultraliskFrames = ultraliskData.frames;
    for(i=0 ; i < ultraliskFrames.length ; i++){
        ultraliskPosition = ultraliskFrames[i].position;
        ultraliskImage = ultraliskSprite.get(ultraliskPosition.x , ultraliskPosition.y , ultraliskPosition.w , ultraliskPosition.h);
        ultraliskAnimation.push(ultraliskImage);
    }
    
    psize=playerImage.width/2;
    px=bckground.width / 2;
    py=bckground.height / 2;
    pspeed = 6;
    hp = 100;
    armor = 50;
    plevel = 1;
    exp = 0;
    expNeeded = 100;
    
    recoil = 0;
    cdspawn=10;
    cdSpawn = 300;
    Radar=0;
    aiList = [];
    aiCorpseList = [];
    bulletList=[];
    itemList = [];
    spawnList = [];
    alliesList = [];
    aiBulletList = [];
    
    loadPerks();
    loadWeapons();
} //END SETUP

function draw(){
    
    if(start == 0){
    MainMenu();    
    }else if(start == 1){
        if(pause == 0){
            
            Update();
            
        }else{
            
            Pause();
        }
        GameDraw();
    }
    
    
} //END DRAW

function Pause()
{
    
}
function MainMenu()
{
    background("teal");
    if(!showMissions){ //Main Menu
        image(title, width/2-title.width/2,50);
        missions.draw(); //Campaign
        survival.draw(); //survival 
        fill('white');
        text('v0.15', width/2 , 500);
        text("Music background volume: Mouse scroll", 150,30);
        text("mute/unmute: keyboard M/N", 150, 60);
        text("This site is using Cookies to keep track of your progress.", 10, 150, 300,100);
    }else{             //Mission select
        fill('black');
        rect(width/2-400,10,800,height/2-20);
        fill('white');
        push();
        textSize(20);
        strokeWeight(1);
        font="20px Georgia";
        text(missionDescription,width/2-400,0,800,height/2-100);
        pop();
        if(nextMissions==0){
           for(i=0;i<20;i++){
            missionList[i].draw();
            } 
        }else{
            for(i=20;i<40;i++){
            missionList[i].draw();
            }
        }
        
        buttonReset.text = "Back";
        buttonReset.locate(width/2-215, height/2+250);
        //buttonReset.locate(width/2-75, height/2+250);
        buttonReset.draw();
        buttonNextMissions.draw();
    }
    
    
    missionDescription = '';
    }

    function levelUpWindow()
{
    perksRe();
    
                                        //BUTTON 1
    if(perkListAval.length > 0){
        button1 = new Clickable();
        button1.active = true;
    button1.locate(width/2-180, 150);        
    button1.resize(150, 50);
    
    button1.perk=random(perkListAval);
        
    for(l = 0 ; l < perkListAval.length ; l++){
        if(perkListAval[l] == button1.perk){
            perkListAval.splice( l , 1 );
        }
    }
    
    button1.text = perkList[button1.perk].name;
    button1.onHover = function()
    {
        levelUpText = perkList[button1.perk].description;	
    }
    button1.onOutside = function()
    {
        levelUpText = "Choose a perk";
    }
    button1.onPress = function() //When myButton is pressed
    { 
        perkList[button1.perk].active = true;
        perkEffect();
        levelUp = false;
        pause = 0;
        button1 = 0;
        button2 = 0;
        button3 = 0;
        button4 = 0;
    }
    }else{
        button1.active = false;
    }
    
                              //BUTTON 2
    if(perkListAval.length > 0){
    button2 = new Clickable();
        button2.active = true;
    button2.locate(width/2-180, 210);
    button2.resize(150, 50);
    button2.perk=random(perkListAval);
    
    for(l = 0 ; l < perkListAval.length ; l++){
        if(perkListAval[l] == button2.perk){
            perkListAval.splice( l , 1 );
        }
    }
    
    button2.text = perkList[button2.perk].name;
    button2.onHover = function()
    {
        levelUpText = perkList[button2.perk].description;	
    }
    button2.onOutside = function()
    {
        levelUpText = "Choose a perk";
    }
    button2.onPress = function() //When myButton is pressed
    { 
        perkList[button2.perk].active = true;
        perkEffect();
        perksRe();
        levelUp = false;
        pause = 0;
        button1 = 0;
        button2 = 0;
        button3 = 0;
        button4 = 0;
    }
    }else{
        button2.active = false;
    }
                              //BUTTON 3
    if(perkListAval.length > 0){
    button3 = new Clickable();     //Create button
        button3.active = true;
    button3.locate(width/2-180, 270);        //Position Button
    button3.resize(150, 50);
    button3.perk=random(perkListAval);
    
    for(l = 0 ; l < perkListAval.length ; l++){
        if(perkListAval[l] == button3.perk){
            perkListAval.splice( l , 1 );
        }
    }
    
    button3.text = perkList[button3.perk].name;
    button3.onHover = function()
    {
        levelUpText = perkList[button3.perk].description;	
    }
    button3.onOutside = function()
    {
        levelUpText = "Choose a perk";
    }
    button3.onPress = function() //When myButton is pressed
    { 
        perkList[button3.perk].active = true;
        perkEffect();
        perksRe();
        levelUp = false;
        pause = 0;
        button1 = 0;
        button2 = 0;
        button3 = 0;
        button4 = 0;
    }
    }else{
        button3.active = false;
    }
                          //BUTTON 4
    if(perkListAval.length > 0){
    button4 = new Clickable();     //Create button
        button4.active = true;
    button4.locate(width/2-180, 330);        //Position Button
    button4.resize(150, 50);
    
    button4.perk=random(perkListAval);
    
    
    button4.text = perkList[button4.perk].name;
    button4.onHover = function()
    {
        levelUpText = perkList[button4.perk].description;	
    }
    button4.onOutside = function()
    {
        levelUpText = "Choose a perk";
    }
    button4.onPress = function() //When myButton is pressed
    { 
        perkList[button4.perk].active = true;
        perkEffect();
        perksRe();
        levelUp = false;
        pause = 0;
        button1 = 0;
        button2 = 0;
        button3 = 0;
        button4 = 0;
    }
    }else{
        button4.active = false;
    }

} //END LVLUPWINDOW FUNCTION
    


    function mousePressed()
{
    
}

function mouseWheel(event) {
    
    musicBcgV -= 0.001*event.delta;
    if( musicBcgV > 1)
    {
        musicBcgV = 1;
    }else if(musicBcgV < 0){
        musicBcgV = 0;
    }
    
    musicBcg.setVolume(musicBcgV, 0, 0);
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
    
function odleglosc(x1,x2,y1,y2){ //x x y y
    wynik=Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y2-y1,2) );
    return wynik;
}

//DAMAGE SOUND
function musicRnd(){ 
    if(musicHitActive.isPlaying() == false){
        musicHitR=getRndInteger(1, 8);
        if(musicHitR == 1){
            musicHitActive = musicHit1;
            musicHitActive.play();
        }else if(musicHitR == 2){
            musicHitActive = musicHit2;
            musicHitActive.play();
        }else if(musicHitR == 3){
            musicHitActive = musicHit3;
            musicHitActive.play();
        }else if(musicHitR == 4){
            musicHitActive = musicHit4;
            musicHitActive.play();
        }else if(musicHitR == 5){
            musicHitActive = musicHit5;
            musicHitActive.play();
        }else if(musicHitR == 6){
            musicHitActive = musicHit6;
            musicHitActive.play();
        }else if(musicHitR == 7){
            musicHitActive = musicHit7;
            musicHitActive.play();
        }else if(musicHitR == 8){
            musicHitActive = musicHit8;
            musicHitActive.play();
        }
        if(mute == 1){
            musicHitActive.setVolume(0,0,0);
        }else{
            musicHitActive.setVolume(0.2,0,0);
        }
    }
}

//COOKIES
function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  
  var hiscore=getCookie("hiscoreV");
    if (hiscore != "") {
  } else {
     hiscore = 0;
    setCookie("hiscoreV", hiscore, 365);
  }
    
    var missionsAva=getCookie("missionsAvaV");
    if (missionsAva != "") {
  } else {
     missionsAva = 1;
    setCookie("missionsAvaV", missionsAva, 365);
  }
    
}

// RESET GAME
function resetToMenu(){ 
    musicBcg.stop();
    score = 0;
    start = 0;
    pause = 0;
    showMissions = false;
    drawpx = 0;
    drawpy = 0;
    legsStep = 0;
    legsStepC = 0;
    px=bckground.width / 2;
    py=bckground.height / 2;
    pspeed=6;
    hp=100;
    armor=50;
    plevel=1;
    exp=0;
    expNeeded = 100;
    recoil = 0;
    cdspawn=10;
    cdSpawn = 300;
    aiList = [];
    aiCorpseList = [];
    bulletList=[];
    itemList = [];
    spawnList = [];
    loadPerks();
    loadWeapons();
    //bonuses
    freezeActive = false;
    freezeTimer = 0;
    objectiveTime=5*60;
    radar=0;
    missionAvaCheck();
    
    survival.text = 'Survival\nHighscore: ' + hiscore;
    
    for(l=0 ; l < perkList.length ; l++){
        perkList[l].active = false;
        perkList[l].used = false;
    }
    for(l=0 ; l < weaponList.length ; l++){
        weaponList[l].active = false;
    }
    weaponList[0].active = true;
}