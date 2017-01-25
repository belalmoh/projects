/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.belal.project2;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.mail.Address;
import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.NoSuchProviderException;
import javax.mail.Part;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Store;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

/**
 *
 * @author Belal
 */
public class Email {

    private String userName;
    private String password;
    private Properties props = new Properties();
    private Session session;
    private Folder emailFolder;
    private Store store;
    private Message[] messages;

    private static boolean isPop3Connected = false;

    public Email(String userName, String password) {
        this.userName = userName;
        this.password = password;

        // SMTP -> Sending Email
        this.props.put("mail.smtp.auth", "true");
        this.props.put("mail.smtp.starttls.enable", "true");
        this.props.put("mail.smtp.host", "smtp.gmail.com");
        this.props.put("mail.smtp.port", "587");

        //POP3 -> Accessing and retrieving info
        this.props.put("mail.pop3.host", "pop.gmail.com");
        this.props.put("mail.pop3.port", "995");
        this.props.put("mail.pop3.starttls.enable", "true");


        final String uName = this.userName;
        final String pass = this.password;

        this.session = Session.getInstance(props,
                new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(uName, pass);
            }
        });

    }

    private void isPop3Connected() throws MessagingException{
        try {
            this.session = Session.getDefaultInstance(this.props);

            //create the POP3 store object and connect with the pop server
            this.store = this.session.getStore("pop3s");
            this.store.connect(this.props.getProperty("mail.pop3.host"), this.userName, this.password);

            this.emailFolder = this.store.getFolder("INBOX");
            this.emailFolder.open(Folder.READ_ONLY);
            this.messages = this.emailFolder.getMessages();
            isPop3Connected = true;

        } catch (NoSuchProviderException ex) {
            Logger.getLogger(Email.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public Message[] getEmails() throws MessagingException{

        this.isPop3Connected();
        return this.messages;
    }


    public void sendEmail(String Recipient, String Subject, String Body) {
        try {

            Message message = new MimeMessage(this.session);
            message.setFrom(new InternetAddress(this.userName));
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(Recipient));
            message.setSubject(Subject);
            message.setText(Body);

            Transport.send(message);

            System.out.println("Done");

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public static String printMessage(Message message) {

        String myMail = "";

        try {
            // Get the header information
            String from = ((InternetAddress) message.getFrom()[0])
                    .getPersonal();


            if (from == null)
                from = ((InternetAddress) message.getFrom()[0]).getAddress();
//            System.out.println("FROM: " + from);
            String subject = message.getSubject();
//            System.out.println("SUBJECT: " + subject);
            // -- Get the message part (i.e. the message itself) --
            Part messagePart = message;
            Object content = messagePart.getContent();
            // -- or its first body part if it is a multipart message --
            if (content instanceof Multipart) {
                messagePart = ((Multipart) content).getBodyPart(0);
//                System.out.println("[ Multipart Message ]");
            }
            // -- Get the content type --
            String contentType = messagePart.getContentType();
            // -- If the content is plain text, we can print it --
//            System.out.println("CONTENT:" + contentType);
            if (contentType.startsWith("TEXT/PLAIN")
                    || contentType.startsWith("TEXT/HTML")) {
                InputStream is = messagePart.getInputStream();
                BufferedReader reader = new BufferedReader(
                        new InputStreamReader(is));
                String thisLine = reader.readLine();
                while (thisLine != null) {
//                    System.out.println(thisLine);
                    myMail = myMail + thisLine;
                    thisLine = reader.readLine();
                }


            }
//            System.out.println("-----------------------------");
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return myMail;

    }


}
