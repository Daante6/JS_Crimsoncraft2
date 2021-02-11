class Perks
{
    constructor(id, name, text)
    {
        this.id = id;
        this.name = name;
        this.active = false;
        this.description = text;
        this.used = false;
    }
}

function loadPerks()
{
    medic1 = new Perks(0, 'Medic','You can slowly regenerate yourself up to 40% of your hp');
    medic2 = new Perks(1, 'Medic lvl2','You can veeeery slowly regenerate yourself up to full health');
    magnes = new Perks(2, 'Magnet','You pull items to yourself');
    runner = new Perks(3, 'Marathon runner','You can run faster');
    dwish = new Perks(4, 'Death wish','Your hp becomes 1%, but your score is doubled');
    freload = new Perks(5, 'Fast reload','Press "R" during reloading to reload instantly');
    
    perkList = [
    medic1,medic2,magnes,runner,dwish,freload
    ]
    
    perkListAval = [];
    
    for(l=0 ; l < perkList.length ; l++){
        
        perkListAval.push(perkList[l].id);
        
    }

}

function perksRe()
{
    perkListAval = [];
    for(l=0 ; l < perkList.length ; l++){
        if(!perkList[l].active){
            if(perkList[l].id == 1){ //medic2
                if(medic1.active == true){
                    perkListAval.push(perkList[l].id);
                }
            }else{
                perkListAval.push(perkList[l].id);
            }
            
        }
    }
}

function perkEffect()
{
    if(runner.active == true && runner.used == false){
        pspeed=6;
        runner.used = true;
    }
    if(dwish.active == true && dwish.used == false){
        hp = 1;
        score = score * 2;
        dwish.used = true;
    }
}

