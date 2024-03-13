

level = 1;
spellcaster = false;
stats = new Array(6);
profs = new Array(18);
skills = new Array(18);
saves = new Array(6);
spells = [];
feats = [];


// readline.question("What level would you like to generate a character for?: ", level => {
    level = level;

    let ancestry = getAncestry();
    let background = getBackground();
    let characterClass = getCharacterClass();
    if (["Bard", "Cleric", "Druid", "Magus", "Oracle", "Psychic", "Ranger", "Sorcerer", "Summoner", "Witch", "Wizard"].includes(characterClass)) {
        spellcaster = true;
    }
    document.getElementById("Ancestry").innerHTML = "Ancestry: " + ancestry;
    document.getElementById("Background").innerHTML = "Background: " + background;
    document.getElementById("Class").innerHTML = "Class: " + characterClass;
    document.getElementById("Stats").innerHTML = "Stats: ";
    document.getElementById("Feats").innerHTML = "Your feats are: ";
    if(spellcaster){
        document.getElementById("Spells").innerHTML = "Your spells are: ";
    }
    document.getElementById("Gender").innerHTML = "Your gender is: " + getGender();
    // readline.close();
// });


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

function getBackground() {
    let backgrounds = ["Acrobat", "Animal Whisperer", "Barkeep", "Barrister", "Blacksmith", "Bounty Hunter", "Criminal", "Entertainer", "Farmhand", "Field Medic", "Fortune Teller", "Gambler", "Gladiator", "Guard", "Herbalist", "Hermit", "Hunter", "Laborer", "Merchant", "Miner", "Noble", "Nomad", "Prisoner", "Sailor", "Scholar", "Scout", "Street Urchin", "Tinker", "Warrior", "Wasteland Scavenger"];
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}