const fs = require('fs');

let charLevel = 1;
let spellcaster = false;
let spellsTradition = "";
let stats = [0, 0, 0, 0, 0, 0];
let statNames = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
let skills = [["Acrobatics", "untrained"], ["Arcana", "untrained"], ["Athletics", "untrained"], ["Crafting", "untrained"], ["Deception", "untrained"], ["Diplomacy", "untrained"], ["Intimidation", "untrained"], ["Medicine", "untrained"], ["Nature", "untrained"], ["Occultism", "untrained"], ["Performance", "untrained"], ["Religion", "untrained"], ["Society", "untrained"], ["Stealth", "untrained"], ["Survival", "untrained"], ["Thievery", "untrained"], ["Perception", "untrained"]];
let saves = [["Fortitude", "untrained"], ["Reflex", "untrained"], ["Will", "untrained"]];
let spellListCantrips = [" Cantrips:"];
let spellListRank1 = ["\n","  Rank 1:"];
let spellListRank2 = ["\n","  Rank 2:"];
let spellListRank3 = ["\n","  Rank 3:"];
let spellListRank4 = ["\n","  Rank 4:"];
let spellListRank5 = ["\n","  Rank 5:"];
let spellListRank6 = ["\n","  Rank 6:"];
let spellListRank7 = ["\n","  Rank 7:"];
let spellListRank8 = ["\n","  Rank 8:"];
let spellListRank9 = ["\n","  Rank 9:"];
let spellListRank10 = ["\n","  Rank 10:"];
let spellList = [spellListCantrips, spellListRank1, spellListRank2, spellListRank3, spellListRank4, spellListRank5, spellListRank6, spellListRank7, spellListRank8, spellListRank9, spellListRank10];
let genFeatAmount = 0;
let skillFeatAmount = 0;
let ancestryFeatAmount = 0;
let hp = 0;
let ancestry;
let background;
let charClass;
let keyAbility = "";
let languages = [];
let weaponProficiencies = [["Unarmed", "untrained"], ["Simple", "untrained"], ["Martial", "untrained"], ["Advanced", "untrained"]];
let armorProficiencies = [["Unarmored", "untrained"], ["Light", "untrained"], ["Medium", "untrained"], ["Heavy", "untrained"]];

genFeatAmount = 0;
skillFeatAmount = 0;
charClass = getCharacterClass();
ancestry = getAncestry();
background = getBackground();
ancestryFeats = getAncestryFeats();
classFeats = getClassFeats();
generalFeats = getGeneralFeats();
skillFeats = getSkillFeats();
if (spellcaster) {getSpells();}
getGender();
useFreeBoosts();
getSkills();
getSaves();
useFreeIntPoints();
hp += stats[2] * charLevel;

getRandomSpell("Primal", 1, "Cantrip");

console.log("Level: " + charLevel);
console.log("Ancestry: " + ancestry);
console.log("Background: " + background);
console.log("Class: " + charClass);
console.log("Key Ability: " + keyAbility);
console.log("Stats: STR " + stats[0] + " DEX " + stats[1] + " CON " + stats[2] + " INT " + stats[3] + " WIS " + stats[4] + " CHA " + stats[5]);
// console.log("Skills: " + skills);
// console.log("Saves: " + saves);
// console.log("Languages: " + languages);
console.log("Weapon Proficiencies: " + weaponProficiencies);
console.log("Armor Proficiencies: " + armorProficiencies);
console.log("HP: " + hp);
console.log("Ancestry Feats: " + ancestryFeats);
console.log("Class Feats: " + classFeats);
console.log("General Feats: " + generalFeats);
console.log("Skill Feats: " + skillFeats);
if(spellcaster){ console.log("Spells: " + spellList); }
console.log("Your gender is: " + gender);


function getGender() {
    let genderOptions = ["Male", "Female", "Non-Binary"];
    gender = genderOptions[Math.floor(Math.random() * genderOptions.length)];
}

function getAncestry() {
    const fileData = fs.readFileSync('aon-data/ancestries.json', 'utf8');
    const ancestries = JSON.parse(fileData);
    const randomIndex = Math.floor(Math.random() * ancestries.length);
    const randomAncestry = ancestries[randomIndex].name;
    
    //HP
    hp += parseInt(ancestries[randomIndex].hp);
    
    //Languages
    languages = ancestries[randomIndex].language.split(", ");

    //Ability Boosts, incorporate alternate ability boosts in the future
    let ancestryAbilityChoices = ancestries[randomIndex].ability_boost.split(", ");
    let increasedKeyAbility = false;
    statNames = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
    
    for (let i = 0; i < ancestryAbilityChoices.length; i++) {
        if (ancestryAbilityChoices[i] != "Free") {
            increaseAbility(ancestryAbilityChoices[i]);
            if (ancestryAbilityChoices[i] == keyAbility) {
                increasedKeyAbility = true;
            }
            statNames = statNames.filter(item => item !== ancestryAbilityChoices[i]);
        } else { // If i is Free
            if (!increasedKeyAbility) {
                increaseAbility(keyAbility);
                increasedKeyAbility = true;
                statNames = statNames.filter(item => item !== keyAbility);
            } else {
                let randomStat = Math.floor(Math.random() * statNames.length);
                increaseAbility(statNames[randomStat]);
                statNames = statNames.filter(item => item !== statNames[randomStat]);
            }
        }
        
        
    }
    
    //Ability Flaw
    if (ancestries[randomIndex].ability_flaw != "") {
        let flaw = ancestries[randomIndex].ability_flaw;
        switch (flaw) {
            case "Strength":
                stats[0] -= 1;
                break;
            case "Dexterity":
                stats[1] -= 1;
                break;
            case "Constitution":
                stats[2] -= 1;
                break;
            case "Intelligence":
                stats[3] -= 1;
                break;
            case "Wisdom":
                stats[4] -= 1;
                break;
            case "Charisma":
                stats[5] -= 1;
                break;
            default:
                console.log("Error: Flaw not found");
                break;
        }
    }
    
    return randomAncestry;
}

function getCharacterClass() {
    let keyAbilityChoices = [];
    const fileData = fs.readFileSync('aon-data/classes.json', 'utf8');
    const classes = JSON.parse(fileData);
    const randomIndex = Math.floor(Math.random() * classes.length);
    const randomClassName = classes[randomIndex].name;
    
    //Check if spellcaster
    if (classes[randomIndex].tradition != "") { 
        spellcaster = true; 
        spellsTradition = classes[randomIndex].tradition;    //Does not accout for classes that choose tradition
    }
    
    //HP
    hp += parseInt(classes[randomIndex].hp);
    
    
    //Key Ability
    if (classes[randomIndex].ability.includes(", ")) {
        keyAbilityChoices = classes[randomIndex].ability.split(", ");
        keyAbility = keyAbilityChoices[Math.floor(Math.random() * keyAbilityChoices.length)];
    } else { keyAbility = classes[randomIndex].ability; }
    increaseAbility(keyAbility); //increase from class
    
    //Saves
    saves[0][1] = classes[randomIndex].fortitude_proficiency;
    saves[1][1] = classes[randomIndex].reflex_proficiency;
    saves[2][1] = classes[randomIndex].will_proficiency;
    
    //Skills
    skills[16][1] = classes[randomIndex].perception_proficiency
    // "Trained in  Crafting\nTrained in a number of additional skills equal to 3 plus your Intelligence modifier";
    // let skillChoices = classes[randomIndex].skill_proficiency.split("\\n");
    // console.log(skillChoices);
    
    
    
    return randomClassName;
}

function getSkills() {
    
}

function getSaves() {
}

function useFreeIntPoints() {
    let skillBoostsRemaining, languagesRemaining = stats[3]; //make json file for languages from excel table
}

function getClassFeats() {
    const fileData = fs.readFileSync('aon-data/classfeats/feats-' + charClass + '.json', 'utf8');
    const classFeats = JSON.parse(fileData);
    const randomIndex = Math.floor(Math.random() * classFeats.length);
    const randomName = classFeats[randomIndex].name;
    
    return randomName + " " + classFeats[randomIndex].level;
}

function useFreeBoosts() {
    increaseAbility(keyAbility); //increase from free boost
    statNames = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
    statNames = statNames.filter(item => item !== keyAbility);
    
    for (let i = 0; i < 3; i++) {
        let randomStat = statNames[Math.floor(Math.random() * statNames.length)];
        increaseAbility(randomStat);
        statNames = statNames.filter(item => item !== randomStat);
    }
}

function increaseAbility(ability) {
    switch (ability) {
        case "Strength":
            stats[0] += 1;
            break;
        case "Dexterity":
            stats[1] += 1;
            break;
        case "Constitution":
            stats[2] += 1;
            break;
        case "Intelligence":
            stats[3] += 1;
            break;
        case "Wisdom":
            stats[4] += 1;
            break;
        case "Charisma":
            stats[5] += 1;
            break;
        default:
            console.log("Error: Ability not found");
            break;
    }
}

function getBackground() {
    const fileData = fs.readFileSync('aon-data/backgrounds.json', 'utf8');
    const backgrounds = JSON.parse(fileData);
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    const randomBackgroundName = backgrounds[randomIndex].name;
    
    let backgroundAbilityChoices = backgrounds[randomIndex].ability.split(", ");
    
    if (backgroundAbilityChoices.includes(keyAbility)) {
        increaseAbility(keyAbility);
        
        statNames = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
        statNames = statNames.filter(item => item !== keyAbility);
        increaseAbility(statNames[Math.floor(Math.random() * statNames.length)]);
    } else {
        increaseAbility(backgroundAbilityChoices[Math.floor(Math.random() * backgroundAbilityChoices.length)]);
        increaseAbility(keyAbility); //increase from background
    }
    
    
    return randomBackgroundName;
}

function getGeneralFeats() {
    let tempCharLevel = charLevel;
    while (tempCharLevel >= 3) {
        genFeatAmount++;
        tempCharLevel -= 4;
    }
    
    const fileData = fs.readFileSync('aon-data/feats-general.json', 'utf8'); // does not include abnormal prerequisites
    const generalFeats = JSON.parse(fileData);
    
    
    let genFeatsTaken = new Array(0);
    
    
    //A better way might be to have a list of each level of feat and then go top down to see what can be taken with prerecs met
    // this ensures that you always get a higher level feat if you meet the prerecs, but does not break the system if you dont meet them
    
    let genFeatsLevel1 = new Array(0);
    let genFeatsLevel3 = new Array(0);
    let genFeatsLevel7 = new Array(0);
    let genFeatsLevel11 = new Array(0);
    let genFeatsLevel19 = new Array(0);
    for (let i = 0; i < generalFeats.length; i++) { 
        if (generalFeats[i].level == 1){
            genFeatsLevel1.push(generalFeats[i].name);
        } else if (generalFeats[i].level == 3){
            genFeatsLevel3.push(generalFeats[i].name);
        } else if (generalFeats[i].level == 7){
            genFeatsLevel7.push(generalFeats[i].name);
        } else if (generalFeats[i].level == 11){
            genFeatsLevel11.push(generalFeats[i].name);
        } else if (generalFeats[i].level == 19){
            genFeatsLevel19.push(generalFeats[i].name);
        } else {
            console.log("Error: General Feat level not found " + generalFeats[i].name + " " + generalFeats[i].level);
        }
    }
    
    
    genFeatAmount = 0; // for testing purposes
    
    for (let i = 3; i <= (genFeatAmount*4)-1; i = i + 4){  // does not take into account prerequisites
        // let genFeatChoices = new Array(0); //reset available feats
        // for (let j = 0; j < generalFeats.length; j++) { //find available feats for the level range
        //     if (generalFeats[j].level <= i && generalFeats[j].level > Math.min(i-4, 7)){
        //         genFeatChoices.push(generalFeats[j].name);
        //     }
        // }
        // let randomFeat = Math.floor(Math.random() * genFeatChoices.length);
        // genFeatsTaken.push(genFeatChoices[randomFeat]);
    }
    return genFeatsTaken;
}

function getSkillFeats() {
    skillFeatAmount = charLevel;
    if (charClass != "Rogue") {
        let tempCharLevel = charLevel;
        while (tempCharLevel >= 2) {
            skillFeatAmount++;
            tempCharLevel -= 2;
        }
    } 
    const fileData = fs.readFileSync('aon-data/feats-skill.json', 'utf8');
    const skillFeats = JSON.parse(fileData);
    const randomIndex = Math.floor(Math.random() * skillFeats.length);
    const randomName = skillFeats[randomIndex].name;
    
    return randomName + " " + skillFeats[randomIndex].level;
}

function getAncestryFeats() {
    let tempCharLevel = charLevel;
    while (tempCharLevel >= 5) {
        ancestryFeatAmount++;
        tempCharLevel -= 4;
    }
    return ancestryFeatAmount;
}

function getRandomSpell(tradition, rank, spell_type){
    const fileData = fs.readFileSync('aon-data/spells/' + spell_type + '.json', 'utf8');
    const spells = JSON.parse(fileData);
    let applicableSpells = [];
    
    for (let i = 0; i < spells.length; i++) {
        if (spells[i].tradition.includes(tradition) && spells[i].rank == rank && spells[i].rarity == "Common") {
            applicableSpells.push(spells[i].name);
        }
    }
    
    const randomIndex = Math.floor(Math.random() * applicableSpells.length);
    const randomSpell = spells[randomIndex].name;
    
    return randomSpell;
}

function getSpells() {
    const fileData = fs.readFileSync('aon-data/spellcaster.json', 'utf8');
    const spellTable = JSON.parse(fileData);
    
    let classSpellProgression;
    
    for (let i = 0; i < spellTable.length; i++) {
        if (spellTable[i].class == charClass && spellTable[i].level == charLevel) {
            classSpellProgression = spellTable[i];
            break;
        }
    }
    
    for (let i = 0; i < classSpellProgression.cantrip; i++) {
        spellListCantrips.push(getRandomSpell(spellsTradition, 1, "Cantrip"));
    }
    for (let i = 0; i < classSpellProgression.rank1; i++) {
        spellListRank1.push(getRandomSpell(spellsTradition, 1, "Spell"));
    }
    spellList = [spellListCantrips, spellListRank1]
    if (charLevel >= 3) {
        for (let i = 0; i < classSpellProgression.rank2; i++) {
            spellListRank2.push(getRandomSpell(spellsTradition, 2, "Spell"));
        }
        spellList = [spellListCantrips, spellListRank1, spellListRank2]
        if (charLevel >= 5) {
            for (let i = 0; i < classSpellProgression.rank3; i++) {
                spellListRank3.push(getRandomSpell(spellsTradition, 3, "Spell"));
            }
            spellList = [spellListCantrips, spellListRank1, spellListRank2, spellListRank3]
            if (charLevel >= 7) {
                for (let i = 0; i < classSpellProgression.rank4; i++) {
                    spellListRank4.push(getRandomSpell(spellsTradition, 4, "Spell"));
                }
                spellList = [spellListCantrips, spellListRank1, spellListRank2, spellListRank3, spellListRank4]
                if (charLevel >= 9) {
                    for (let i = 0; i < classSpellProgression.rank5; i++) {
                        spellListRank5.push(getRandomSpell(spellsTradition, 5, "Spell"));
                    }
                    spellList = [spellListCantrips, spellListRank1, spellListRank2, spellListRank3, spellListRank4, spellListRank5]
                    if (charLevel >= 11) {
                        for (let i = 0; i < classSpellProgression.rank6; i++) {
                            spellListRank6.push(getRandomSpell(spellsTradition, 6, "Spell"));
                        }
                        spellList = [spellListCantrips, spellListRank1, spellListRank2, spellListRank3, spellListRank4, spellListRank5, spellListRank6]
                        if (charLevel >= 13) {
                            for (let i = 0; i < classSpellProgression.rank7; i++) {
                                spellListRank7.push(getRandomSpell(spellsTradition, 7, "Spell"));
                            }
                            spellList = [spellListCantrips, spellListRank1, spellListRank2, spellListRank3, spellListRank4, spellListRank5, spellListRank6, spellListRank7]
                            if (charLevel >= 15) {
                                for (let i = 0; i < classSpellProgression.rank8; i++) {
                                    spellListRank8.push(getRandomSpell(spellsTradition, 8, "Spell"));
                                }
                                spellList = [spellListCantrips, spellListRank1, spellListRank2, spellListRank3, spellListRank4, spellListRank5, spellListRank6, spellListRank7, spellListRank8]
                                if (charLevel >= 17) {
                                    for (let i = 0; i < classSpellProgression.rank9; i++) {
                                        spellListRank9.push(getRandomSpell(spellsTradition, 9, "Spell"));
                                    }
                                    spellList = [spellListCantrips, spellListRank1, spellListRank2, spellListRank3, spellListRank4, spellListRank5, spellListRank6, spellListRank7, spellListRank8, spellListRank9]
                                    if (charLevel >= 19) {
                                        for (let i = 0; i < classSpellProgression.rank10; i++) {
                                            spellListRank10.push(getRandomSpell(spellsTradition, 10, "Spell"));
                                        }
                                    }
                                }
                            }
                        }
                    }  
                }
            }
        }
    }
}

