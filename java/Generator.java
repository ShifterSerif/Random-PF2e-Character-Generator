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
        System.out.println("What level would you like to generate a character for?");
        level = scan.nextInt();
        System.out.println("Ancestry: " + getAncestry());
        System.out.println("Background: " + getBackground());
        System.out.println("Class: " + getClass(level));
        System.out.println("Stats: ");
        System.out.println("Your feats are: ");
        if(spellcaster){
            System.out.println("Your spells are: ");
        }
        System.out.println("Your age is: ");
        System.out.println("Your gender is: ");
        
    }
    
    private static String getAncestry() {
        String ancestry = "";
        return ancestry;
    }
    
    
    private static String getBackground() {
        String background = "";
        return background;
    }
    
    private static String getClass(int level) {
        String characterClass = "";
        return characterClass;
    }
}
