const fs = require('fs');


let charLevel = 1;
let spellcaster = false;
let stats = new Array(6);
let profs = new Array(17);
let skills = new Array(17);
let saves = new Array(6);
let spells = [];
let genFeatAmount = 0;
let skillFeatAmount = 0;
let ancestryFeatAmount = 0;
let ancestry;
let background;
let charClass;


genFeatAmount = 0;
skillFeatAmount = 0;
ancestry = getAncestry();
background = getBackground();
charClass = getCharacterClass();
if (["Bard", "Cleric", "Druid", "Magus", "Oracle", "Psychic", "Ranger", "Sorcerer", "Summoner", "Witch", "Wizard"].includes(charClass)) {
    spellcaster = true;
}
console.log("Level: " + charLevel);
console.log("Ancestry: " + ancestry);
console.log("Background: " + background);
console.log("Class: " + charClass);
console.log("Stats: " + stats);
console.log("Ancestry Feats: " + getAncestryFeats());
console.log("Class Feats: " + getClassFeats());
console.log("General Feats: " + getGeneralFeats());
console.log("Skill Feats: " + getSkillFeats());
if(spellcaster){
    console.log("Spells: " + spells);
}
console.log("Your gender is: " + getGender());


function getGender() {
    let gender = ["Male", "Female", "Non-Binary"];
    return gender[Math.floor(Math.random() * gender.length)];
}

function getAncestry() {
    const fileData = fs.readFileSync('aon-data/ancestries.json', 'utf8');
    const ancestries = JSON.parse(fileData);
    const randomIndex = Math.floor(Math.random() * ancestries.length);
    const randomAncestry = ancestries[randomIndex].name;
    return randomAncestry;
}


function getCharacterClass() {
    const fileData = fs.readFileSync('aon-data/classes.json', 'utf8');
    const classes = JSON.parse(fileData);
    const randomIndex = Math.floor(Math.random() * classes.length);
    const randomClass = classes[randomIndex].name;
    return randomClass;
}

function getClassFeats() {
    const fileData = fs.readFileSync('aon-data/classfeats/feats-' + charClass.toLowerCase() + '.json', 'utf8');
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
