/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package chattingapp.network;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author root
 */
public class MessageListener extends Thread {
    
    ServerSocket server;
    int port = 8877;
    WritableGUI gui;
    
    public MessageListener(WritableGUI gui, int port){
        try {
            this.port = port;
            this.gui = gui;
            server = new ServerSocket(port);
        } catch (IOException ex) {
            Logger.getLogger(MessageListener.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public MessageListener(){
        try {
            server = new ServerSocket(port);
        } catch (IOException ex) {
            Logger.getLogger(MessageListener.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

   public static String decipher(String text){
        String deciphered = "";
        for(int i=0 ; i<text.length();i++){
            char decipher=(char)(((int)text.charAt(i))-(10-i));
             deciphered += decipher;
        }
        return deciphered;
    }
    
    
    @Override
    public void run() {
        Socket clientSocket;
        try {
            while((clientSocket = server.accept()) != null){
                InputStream is = clientSocket.getInputStream();
                BufferedReader br = new BufferedReader(new InputStreamReader(is));
                String line  = br.readLine();
                if(line != null){
                    gui.write(decipher(line));
                }
            }
        } catch (IOException ex) {
            Logger.getLogger(MessageListener.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    
    
}
