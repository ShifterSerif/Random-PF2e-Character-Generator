const fs = require('fs');

let charLevel = 1;
let spellcaster = false;
let stats = [0, 0, 0, 0, 0, 0];
let statNames = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
let skills = ["Acrobatics", "Arcana", "Athletics", "Crafting", "Deception", "Diplomacy", "Intimidation", "Medicine", "Nature", "Occultism", "Performance", "Religion", "Society", "Stealth", "Survival", "Thievery", "Perception"];
let profs = new Array(17);
let saves = new Array(6);
let spells = [];
let genFeatAmount = 0;
let skillFeatAmount = 0;
let ancestryFeatAmount = 0;
let hp = 0;
let ancestry;
let background;
let charClass;
let keyAbility = "";

genFeatAmount = 0;
skillFeatAmount = 0;
charClass = getCharacterClass();
ancestry = getAncestry();
// background = getBackground();
ancestryFeats = getAncestryFeats();
classFeats = getClassFeats();
generalFeats = getGeneralFeats();
skillFeats = getSkillFeats();
gender = getGender();
// useFreeBoosts();
hp += stats[2] * charLevel;
console.log("Level: " + charLevel);
console.log("Ancestry: " + ancestry);
console.log("Background: " + background);
console.log("Class: " + charClass);
console.log("Key Ability: " + keyAbility);
console.log("Stats: STR " + stats[0] + " DEX " + stats[1] + " CON " + stats[2] + " INT " + stats[3] + " WIS " + stats[4] + " CHA " + stats[5]);
console.log("HP: " + hp);
console.log("Ancestry Feats: " + ancestryFeats);
console.log("Class Feats: " + classFeats);
console.log("General Feats: " + generalFeats);
console.log("Skill Feats: " + skillFeats);
if(spellcaster){ console.log("Spells: " + spells); }
console.log("Your gender is: " + gender);


function getGender() {
    let gender = ["Male", "Female", "Non-Binary"];
    return gender[Math.floor(Math.random() * gender.length)];
}

function getAncestry() {
    const fileData = fs.readFileSync('aon-data/ancestries.json', 'utf8');
    const ancestries = JSON.parse(fileData);
    const randomIndex = Math.floor(Math.random() * ancestries.length);
    const randomAncestry = ancestries[randomIndex].name;
    
    hp += parseInt(ancestries[randomIndex].hp);
    
    let ancestryAbilityChoices = ancestries[randomIndex].ability_boost.split(", ");
    let increasedKeyAbility = false;
    statNames = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
    if (ancestryAbilityChoices.includes(keyAbility)) {
        increaseAbility(keyAbility);
        statNames = statNames.filter(item => item !== keyAbility);
        ancestryAbilityChoices = ancestryAbilityChoices.filter(item => item !== keyAbility);
        increasedKeyAbility = true;
    }
    while(ancestryAbilityChoices.length > 0) {                          //NOT FULLY WORKING
        let randomStat = Math.floor(Math.random() * statNames.length);
        
        if (ancestryAbilityChoices[0] != "Free") {
            if (!increasedKeyAbility) {
                increaseAbility(keyAbility);
                increasedKeyAbility = false;
                statNames = statNames.filter(item => item !== keyAbility);
            }
            else { increaseAbility(ancestryAbilityChoices[0]); }
        } else {
            increaseAbility(statNames[randomStat]);
        }
        statNames = statNames.filter(item => item !== randomStat);
        ancestryAbilityChoices = ancestryAbilityChoices.slice(1);
    }
    
    
    let flaw = ancestries[randomIndex].ability_flaw;
    if (flaw == "Strength") { stats[0] -= 1; }      
    else if (flaw == "Dexterity") { stats[1] -= 1; }
    else if (flaw == "Constitution") { stats[2] -= 1; }
    else if (flaw == "Intelligence") { stats[3] -= 1; }
    else if (flaw == "Wisdom") { stats[4] -= 1; }
    else if (flaw == "Charisma") { stats[5] -= 1; }
    
    
    return randomAncestry;
}

function getCharacterClass() {
    let keyAbilityChoices = [];
    const fileData = fs.readFileSync('aon-data/classes.json', 'utf8');
    const classes = JSON.parse(fileData);
    const randomIndex = Math.floor(Math.random() * classes.length);
    const randomClassName = classes[randomIndex].name;
    
    if (classes[randomIndex].tradition != "") { spellcaster = true; }
    
    hp += parseInt(classes[randomIndex].hp);
    
    if (classes[randomIndex].ability.includes(", ")) {
        keyAbilityChoices = classes[randomIndex].ability.split(", ");
        keyAbility = keyAbilityChoices[Math.floor(Math.random() * keyAbilityChoices.length)];
    } else { keyAbility = classes[randomIndex].ability; }
    increaseAbility(keyAbility); //increase from class
    
    
    return randomClassName;
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
    let nextStat = statNames[Math.floor(Math.random() * statNames.length)];
    increaseAbility(nextStat);
    statNames = statNames.filter(item => item !== nextStat);
    nextStat = statNames[Math.floor(Math.random() * statNames.length)];
    increaseAbility(nextStat);
    statNames = statNames.filter(item => item !== nextStat);
    nextStat = statNames[Math.floor(Math.random() * statNames.length)];
    increaseAbility(nextStat);
}

function increaseAbility(ability) {
    if (ability == "Strength") { stats[0] += 1; }      
    else if (ability == "Dexterity") { stats[1] += 1; }
    else if (ability == "Constitution") { stats[2] += 1; }
    else if (ability == "Intelligence") { stats[3] += 1; }
    else if (ability == "Wisdom") { stats[4] += 1; }
    else if (ability == "Charisma") { stats[5] += 1; }
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
        generalFeatAmount++;
        tempCharLevel -= 4;
    }
    
    const fileData = fs.readFileSync('aon-data/feats-general.json', 'utf8');
    const generalFeats = JSON.parse(fileData);
    const randomIndex = Math.floor(Math.random() * generalFeats.length);
    const randomName = generalFeats[randomIndex].name;
    // for (let i = 0; i < generalFeats.length; i++) {
    //     if (generalFeats[i].level == 7){
    //         console.log(generalFeats[i].name)
    //     }
    // }
    
    return randomName + " " + generalFeats[randomIndex].level;
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
