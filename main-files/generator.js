let charLevel = 1;
let spellcaster = false;
let stats = new Array(6);
let profs = new Array(17);
let skills = new Array(17);
let saves = new Array(6);
let spells = [];
let feats = [];
let genFeatAmount = 0;
let skillFeatAmount = 0;
let ancestryFeatAmount = 0;
let ancestry;
let background;
let charClass;

function main(){
    genFeatAmount = 0;
    skillFeatAmount = 0;
    charLevel = document.getElementById("userLevel").value;
    ancestry = getAncestry();
    background = getBackground();
    charClass = getCharacterClass();
    if (["Bard", "Cleric", "Druid", "Magus", "Oracle", "Psychic", "Ranger", "Sorcerer", "Summoner", "Witch", "Wizard"].includes(charClass)) {
        spellcaster = true;
    }
    document.getElementById("Level").innerHTML = "Level: " + charLevel;
    document.getElementById("Ancestry").innerHTML = "Ancestry: " + ancestry;
    document.getElementById("Background").innerHTML = "Background: " + background;
    document.getElementById("Class").innerHTML = "Class: " + charClass;
    document.getElementById("Stats").innerHTML = "Stats: ";
    document.getElementById("Feats").innerHTML = "Your feats are: ";
    if(spellcaster){
        document.getElementById("Spells").innerHTML = "Your spells are: ";
    }
    document.getElementById("Gender").innerHTML = "Your gender is: " + getGender();
}


function getGender() {
    let gender = ["Male", "Female", "Non-Binary"];
    return gender[Math.floor(Math.random() * gender.length)];
}

function getAncestry() {
    let ancestries = ["Anadi", "Android", "Automaton", "Azarketi", "Catfolk", "Conrasu", "Dwarf", "Elf", "Fetchling", "Fleshwarp", "Ghoran", "Gnoll", "Gnome", "Goblin", "Goloma", "Grippli", "Halfling", "Hobgoblin", "Human", "Kashrishi", "Kitsune", "Kobold", "Leshy", "Lizardfolk", "Nagaji", "Orc", "Poppet", "Ratfolk", "Ratfolk", "Shisk", "Shoony", "Skeleton", "Sprite", "Strix", "Tengu", "Vanara", "Vishkanya"];
    return ancestries[Math.floor(Math.random() * ancestries.length)];
}

function getCharacterClass() {
    let classes = ["Alchemist", "Barbarian", "Bard", "Champion", "Cleric", "Druid", "Fighter", "Investigator", "Kineticist", "Magus", "Monk", "Oracle", "Psychic", "Ranger", "Rogue", "Sorcerer", "Summoner", "Swashbuckler", "Thaumaturge", "Witch", "Wizard", "Gunslinger", "Inventor"];
    return classes[Math.floor(Math.random() * classes.length)];
}

function getBackground() { //not all backgrounds, just a proof of concept
    let backgrounds = ["Acrobat", "Animal Whisperer", "Barkeep", "Barrister", "Blacksmith", "Bounty Hunter", "Criminal", "Entertainer", "Farmhand", "Field Medic", "Fortune Teller", "Gambler", "Gladiator", "Guard", "Herbalist", "Hermit", "Hunter", "Laborer", "Merchant", "Miner", "Noble", "Nomad", "Prisoner", "Sailor", "Scholar", "Scout", "Street Urchin", "Tinker", "Warrior", "Wasteland Scavenger"];
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}

function getGeneralFeats() {
    let tempCharLevel = charLevel;
    while (tempCharLevel >= 3) {
        generalFeatAmount++;
        tempCharLevel -= 4;
    }
    
}

function getSkillFeats() {
    if (charClass != "Rogue") {
        let tempCharLevel = charLevel;
        while (tempCharLevel >= 2) {
            skillFeatAmount++;
            tempCharLevel -= 2;
        }
    } else {
        skillFeatAmount = charLevel;
    }
    return skillFeatAmount;
}

function getAncestryFeats() {
    let tempCharLevel = charLevel;
    while (tempCharLevel >= 5) {
        ancestryFeatAmount++;
        tempCharLevel -= 4;
    }
    return ancestryFeatAmount;
}
