const fs = require('fs');

let charLevel = 1;
let spellcaster = false;
let stats = [0, 0, 0, 0, 0, 0];
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

genFeatAmount = 0;
skillFeatAmount = 0;
ancestry = getAncestry();
background = getBackground();
charClass = getCharacterClass();
ancestryFeats = getAncestryFeats();
classFeats = getClassFeats();
generalFeats = getGeneralFeats();
skillFeats = getSkillFeats();
gender = getGender();
applyFreeBoosts();
hp += stats[2] * charLevel;
console.log("Level: " + charLevel);
console.log("Ancestry: " + ancestry);
console.log("Background: " + background);
console.log("Class: " + charClass);
console.log("Stats: STR " + stats[0] + " DEX " + stats[1] + " CON " + stats[2] + " INT " + stats[3] + " WIS " + stats[4] + " CHA " + stats[5]);
console.log("HP: " + hp);
console.log("Ancestry Feats: " + ancestryFeats);
console.log("Class Feats: " + classFeats);
console.log("General Feats: " + generalFeats);
console.log("Skill Feats: " + skillFeats);
if(spellcaster){ console.log("Spells: " + spells); }
console.log("Your gender is: " + gender);


function applyFreeBoosts() {
}

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
    return randomAncestry;
}

function getCharacterClass() {
    const fileData = fs.readFileSync('aon-data/classes.json', 'utf8');
    const classes = JSON.parse(fileData);
    const randomIndex = Math.floor(Math.random() * classes.length);
    const randomClassName = classes[randomIndex].name;
    console.log(classes[randomIndex].tradition)
    if (classes[randomIndex].tradition != "") { spellcaster = true; }
    hp += parseInt(classes[randomIndex].hp);
    if (classes[randomIndex].ability == "Strength") { stats[0] += 1; }        // does not work for multi-ability choice classes
    else if (classes[randomIndex].ability == "Dexterity") { stats[1] += 1; }
    else if (classes[randomIndex].ability == "Constitution") { stats[2] += 1; }
    else if (classes[randomIndex].ability == "Intelligence") { stats[3] += 1; }
    else if (classes[randomIndex].ability == "Wisdom") { stats[4] += 1; }
    else if (classes[randomIndex].ability == "Charisma") { stats[5] += 1; }
    return randomClassName;
}

function getClassFeats() {
    const fileData = fs.readFileSync('aon-data/classfeats/feats-' + charClass + '.json', 'utf8');
    const classFeats = JSON.parse(fileData);
    const randomIndex = Math.floor(Math.random() * classFeats.length);
    const randomName = classFeats[randomIndex].name;
    
    return randomName + " " + classFeats[randomIndex].level;
}

function getBackground() {
    const fileData = fs.readFileSync('aon-data/backgrounds.json', 'utf8');
    const backgrounds = JSON.parse(fileData);
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    const randomBackground = backgrounds[randomIndex].name;
    return randomBackground;
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
