/*
NAME    :   Belal Mohammed
ID      :   4131148
Section :   B2
 */
package playfair;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

/**
 *
 * @author belal
 */
public class Playfair {

/*
    Notes to be considered.
    -*- getEngLetters
    -*- setArray
    -*- getInput
    -*- ClearRepitition
    
    are all functions that prepare the big 2d array
    
    
*/
    
    
    
    public static char[] getEngLetters(String user_word){
        char[] engLetters = {'a', 'b', 'c', 'd', 'e',
                             'f', 'g', 'h', 'i',
                             'k', 'l', 'm', 'n', 'o',
                             'p', 'q', 'r', 's', 't',
                             'u', 'v', 'w', 'x', 'y', 'z'};
        
        ArrayList<Character> list = new ArrayList<>();
        
        for(int i = 0; i < user_word.length(); i++){
            for(int j = 0; j < engLetters.length; j++){
                if(user_word.charAt(i) == engLetters[j]){
                    engLetters[j] = 'X';
                }
                continue;
            }
            
        }
       
        
        for(int i = 0; i < engLetters.length; i++){
            if(engLetters[i] != 'X'){
                list.add(engLetters[i]);
            }
        }
        
        // I had to to this to remove , [] from the string when it get casted from list to str.
        String theWord = list.toString();
        theWord = theWord.replaceAll("[ ,\\[ \\] ]", "");
        
        
        return theWord.toCharArray();
    }
    
    public static char[][] setArray(){
        char[][] myArray = new char[5][5];
        
        char[] arr_word = getInput();
        
        
        String str_word = String.copyValueOf(arr_word);
        
        char[] engLetters = getEngLetters(str_word);
        
        // Fill myArray with arr_word
        for(int i = 0; i < myArray.length; i++){
            for(int j = 0; j < arr_word.length; j++){
                //its illustration is in the main.
                if(j > 0 && j % myArray.length == 0)
                    i++;
                    
                myArray[i][j%5] = arr_word[j];
                
            }
            break;
        }
        
        short counter = 0;
        //fill myArray with Alphabets
        for(int i = 0; i < myArray.length; i++){
            
            for(int j = 0; j < myArray.length; j++){
                 if(myArray[i][j] == 0){
                     myArray[i][j] = engLetters[counter];
                     counter++;
                 }
            }
        }
        
        return myArray;
    }
    
    public static char[] getInput(){
        Scanner sc = new Scanner(System.in);
        boolean flag = true;
        String user_word = null;
        
        while(flag){
            System.out.println("Enter your key");
            user_word = sc.nextLine();
           
            if(user_word.length() > 25){
                System.out.println("\nPlease enter > 25 character");
            }
            else
                flag = false;
        }
        user_word = ClearRepetition(user_word);
        
        return user_word.toCharArray();
    }
    
    public static String ClearRepetition(String word){
        
        Character letter = ' ';
        short letterCount = 0;
        for(int i = 0; i < word.length(); i++){
            letter = word.charAt(i);
            for(int j = 0; j < word.length(); j++){
                if(word.charAt(j) == letter){
                    letterCount++;
                    if(letterCount > 1){
//                        System.out.println(letter + " => " + word.charAt(j) + " is " + letterCount);
                        word = word.replaceFirst(Character.toString(word.charAt(j)), "");
                    }
                }
            }
            
            letterCount = 0;
        }
        
        return word;
    }
    
    public static String getInputMessage(String myWord){
        Scanner sc = new Scanner(System.in);
        
        System.out.println("Enter your plain text");
        myWord = sc.next();
        
        myWord = myWord.replaceAll(" ", "");
        String FstChar, SecChar = null;
        char temp = 0; // for the sake of swapping.
        
        // to store my FstChar & SecChar.
        ArrayList<String> splitted = new ArrayList<>();
        
        if(myWord.length() % 2 != 0){
            myWord += 'x';
        }
        
        for(int i = 0; i < myWord.length(); i+=2){
            // Getting characters then casting to string to be able to append 'x' if (0) == (1)
            FstChar = Character.toString(myWord.substring(i, i+2).charAt(0));
            SecChar = Character.toString(myWord.substring(i, i+2).charAt(1));
            
            // compare & put x to left char, and x before right char
            if(FstChar.equals(SecChar)){
                FstChar += 'x';
                temp = SecChar.charAt(0);
                SecChar = "x";
                SecChar += temp;

            }
                splitted.add(FstChar);
                splitted.add(SecChar);
//            System.out.println(FstChar + " " + SecChar);
            
        }
        
        
        myWord = splitted.toString();
        myWord = myWord.replaceAll("[ ,\\[ \\] ]", "");
        
        return myWord;
    }
    
    
    public static void Encode(String myWord, char[][] encodedArray){
        
        String encodedMessage = null;
        short counter = 0;
        
        int first = 0 , second = 0, third = 0, fourth = 0;

            for(int k = 2; k < myWord.length()+2; k+=2){

                System.out.println(myWord.substring(k-2, k).charAt(0));
                System.out.println(myWord.substring(k-2, k).charAt(1));
                
                for(int i = 0; i < encodedArray.length; i++){
                    for(int j = 0; j < encodedArray.length; j++){
                        if(encodedArray[i][j] == myWord.substring(k-2, k).charAt(0)){
                            first = i;
                            second = j;
                            System.out.println("FOUND : " + encodedArray[i][j] + " AT " + first + " " + second);
                        }
                        
                        if(encodedArray[i][j] == myWord.substring(k-2, k).charAt(1)){
                            third = i;
                            fourth = j;
                            System.out.println("FOUND : " + encodedArray[i][j] + " AT " + third + " " + fourth);
                        }
                        
                    }
                    
//                    System.out.println(first + " " + second + " " + third + " " + fourth);
                    
                    
                }
                
                if(second == fourth){
                        first++;
                        third++;

                        if(first%5 == 0 && first > 0){
                            first = 0;
                        } else if(third%5 == 0 && third > 0){
                            third = 0;
                        }

                        encodedMessage += encodedArray[first][second];
                        encodedMessage += encodedArray[third][fourth];
                        
                        
                    } else if(first == third){
                        second++;
                        fourth++;

                        if(second %5 == 0 && second > 0){
                            second = 0;
                        } else if(fourth %5 == 0 && fourth > 0){
                            fourth = 0;
                        }
                    } else if(first != third){
                        third = first;
                        encodedMessage += encodedArray[third][fourth];
                    }
                
                System.out.println(first + " " + second + "\n" + third + " " + fourth);
                
                
            }
        

        for(int i = 0; i < encodedArray.length; i++){
            for(int j = 0; j < encodedArray.length; j++){
                
                System.out.print(encodedArray[i][j] + " ");
            }
            System.out.println();
        }
        
        
        
        
    }
    
    public static void main(String[] args) {
        
        char[][] firstArray = setArray();
//        
        String word = null;
        word = getInputMessage(word);
        
        Encode(word, firstArray);
        
//        System.out.println(word);
        
        
//        char[] engLetters = getEngLetters("helo");
        
        
//        System.out.println(delRedun("helloo"));
        
        //This loop is for illustration about the condition of filling the array.
//        for(int i = 0; i <= 5; i++){
//            System.out.println(i + "%5"+" = " + i % 5);
//        }
        
        
    }
    
}
