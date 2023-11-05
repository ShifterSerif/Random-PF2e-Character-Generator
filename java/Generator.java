import java.util.Random;
import java.util.Scanner;
import java.util.ArrayList;


public class Generator {
    static Scanner scan = new Scanner(System.in);
    static Random rand = new Random();
    static int level = 1;
    static int[] stats = new int[6];
    static int[] profs = new int[18];
    static int[] skills = new int[18];
    static int[] saves = new int[6];
    static ArrayList<String> spells = new ArrayList<>();
    static ArrayList<String> feats = new ArrayList<>();
    
    
    
    public static void main(String[] args) {
        System.out.println("Hello World!");
        System.out.println("Welcome to the Character Generator!");
        System.out.println("What level would you like to generate a character for?");
        level = scan.nextInt();
        System.out.print("Ancestry: ");
        System.out.print("Background: ");
        System.out.print("Class: ");
        
        
    }
}
