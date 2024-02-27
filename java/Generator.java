import java.util.Random;
import java.util.Scanner;
import java.util.ArrayList;


public class Generator {
    static Scanner scan = new Scanner(System.in);
    static Random rand = new Random();
    static int level = 1;
    static boolean spellcaster = false;
    static int[] stats = new int[6];
    static int[] profs = new int[18];
    static int[] skills = new int[18];
    static int[] saves = new int[6];
    static ArrayList<String> spells = new ArrayList<>();
    static ArrayList<String> feats = new ArrayList<>();
    
    public static void main(String[] args) {
        System.out.println("Welcome to the Character Generator!");
        System.out.print("What level would you like to generate a character for?: ");
        level = scan.nextInt();
        String ancestry = getAncestry();
        String background = getBackground();
        String characterClass = getCharacterClass();
        if (characterClass.equals("Bard") || characterClass.equals("Cleric") || characterClass.equals("Druid") || characterClass.equals("Magus") || characterClass.equals("Oracle") || characterClass.equals("Psychic") || characterClass.equals("Ranger") || characterClass.equals("Sorcerer") || characterClass.equals("Summoner") || characterClass.equals("Witch") || characterClass.equals("Wizard")) {
            spellcaster = true;
        }
        System.out.println("Ancestry: " + ancestry);
        System.out.println("Background: " + background);
        System.out.println("Class: " + characterClass);
        System.out.println("Stats: ");
        System.out.println("Your feats are: ");
        if(spellcaster){
            System.out.println("Your spells are: ");
        }
        System.out.println("Your gender is: " + getGender());
        
    }
    
    private static String getGender() {
        String[] gender = {"Male", "Female", "Non-Binary"};
        return gender[rand.nextInt(gender.length)];
    }

    private static String getAncestry() {
        String[] ancestries = {"Anadi", "Android", "Automaton", "Azarketi", "Catfolk", "Conrasu", "Dwarf", "Elf", "Fetchling", "Fleshwarp", "Ghoran", "Gnoll", "Gnome", "Goblin", "Goloma", "Grippli", "Halfling", "Hobgoblin", "Human", "Kashrishi", "Kitsune", "Kobold", "Leshy", "Lizardfolk", "Nagaji", "Orc", "Poppet", "Ratfolk", "Ratfolk", "Shisk", "Shoony", "Skeleton", "Sprite", "Strix", "Tengu", "Vanara", "Vishkanya"};
        return ancestries[rand.nextInt(ancestries.length)];
    }
    
    private static String getBackground() {
        String[] backgrounds = {"Academy Dropout", "Acolyte", "Acrobat", "Alkenstar Outlaw", "Alkenstar Sojourner", "Alloysmith", "Amnesiac", "Animal Whisperer", "Anti-Magical", "Anti-Tech Activist", "Archaeologist", "Artisan", "Artist", "Astrologer", "Astrological Augur", "Awful Scab", "Back-Alley Doctor", "Bandit", "Barber", "Barkeep", "Barrister", "Beast Blessed", "Blessed", "Bookkeeper", "Bounty Hunter", "Cannoneer", "Charlatan", "Child of the Twin Village", "Chosen One", "Circuit Judge", "Clockfighter", "Clockwork Researcher", "Close Ties", "Codebreaker", "Concordance Researcher", "Concordance Scout", "Cook", "Courier", "Criminal", "Crystal Healer", "Cultist", "Curandero", "Cursed", "Dauntless", "Deckhand", "Deep-Sea Diver", "Dendrologist", "Deputy", "Detective", "Discarded Duplicate", "Disciple of the Gear", "Doomcaller", "Dreamer of the Verdant Moon", "Driver", "Droskari Disciple", "Eclipseborn", "Eidolon Contact", "Elementally Infused", "Emissary", "Empty Whispers", "Energy Scarred", "Entertainer", "False Medium", "Farmhand", "Farmsteader", "Feral Child", "Feybound", "Field Medic", "Fightbreaker", "Fire Warden", "Firebrand Follower", "Fireworks Performer", "Folklore Enthusiast", "Fortune Teller", "Free Spirit", "Gambler", "Genie-Blessed", "Gladiator", "Goldhand Arms Dealer", "Grave Robber", "Guard", "Gunsmith", "Harrow-Chosen", "Harrow-Led", "Haunted", "Haunted Citizen", "Herbalist", "Hermit", "Highborn Snoop", "Hired Killer", "Hookclaw Digger", "Hounded Thief", "Hunter", "Insurgent", "Junk Collector", "Junker", "Laborer", "Legacy of the Hammer", "Magical Experiment", "Magical Merchant", "Magical Misfit", "Martial Disciple", "Mechanic", "Mechanical Symbiosis", "Medicinal Clocksmith", "Merchant", "Miner", "Musical Prodigy", "Mystic Tutor", "Necromancer's Apprentice", "Night Watch", "Noble", "Nocturnal Navigator", "Nomad", "Northridge Scholar", "Occult Librarian", "Once Bitten", "Osprey Barnraiser", "Osprey Fisher", "Osprey Scion", "Osprey Scout", "Osprey Scribe", "Osprey Spellcaster", "Osprey Warrior", "Otherworldly Mission", "Outrider", "Outskirt Dweller", "Ozem Experience", "Pathfinder Recruiter", "Pilgrim", "Pillar", "Planar Migrant", "Plant Whisperer", "Press-Ganged (G&G)", "Printer", "Prisoner", "Pyre Tender", "Quick Refugee", "Raised by Belief", "Reborn Soul", "Reclaimed", "Reclaimed Investigator", "Refugee", "Relentless Dedication", "Returned", "Revenant", "Root Worker", "Royalty", "Runner", "Saboteur", "Sailor", "Saloon Entertainer", "Saved by Clockwork", "Scavenger", "Scholar", "Scion of Slayers", "Scout", "Seer of the Dead", "Sentinel Reflectance", "Servant", "Sewer Dragon", "Sheriff", "Sign Bound", "Sky Rider", "Song of the Deep", "Southbank Traditionalist", "Spell Seeker", "Spotter", "Squire", "Starless One", "Street Preacher", "Street Urchin", "Student of Magic", "Sun Dancer", "Surge Investigator", "Tall-Tale", "Tax Collector", "Teacher", "Tech-Reliant", "Thrill-Seeker", "Tide Watcher", "Time Traveler", "Tinker", "Tomb Born", "Toymaker", "Trailblazer", "Translator", "Tyrant Witness", "Undertaker", "Union Representative", "Unremarkable", "Wandering Preacher", "Ward", "Warrior", "Waste Walker", "Willing Host", "Willowshire Urchin", "Wished Alive"};
        return backgrounds[rand.nextInt(backgrounds.length)];
    }
    
    private static String getCharacterClass() {
        String[] classes = {"Alchemist", "Barbarian", "Bard", "Champion", "Cleric", "Druid", "Fighter", "Investigator", "Kineticist", "Magus", "Monk", "Oracle", "Psychic", "Ranger", "Rogue", "Sorcerer", "Summoner", "Swashbuckler", "Thaumaturge", "Witch", "Wizard", "Gunslinger", "Inventor"};
        return classes[rand.nextInt(classes.length)];
    }
}
