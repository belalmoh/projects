package com.example.belal.project2;

/**
 * Created by Belal on 12/23/2016.
 */

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;


import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.util.SharedByteArrayInputStream;


public class EmailActivity extends AppCompatActivity {
    String email;
    String password;
    static int inboxSize = 0;

    Notification.Builder notificationBuilder;
    Intent resultIntent;
    PendingIntent resultPendingIntent;
    NotificationManager mNotificationManager;

    Message[] messages;
    String sender;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.email_layout);

        moveTaskToBack(true);

        Toast.makeText(getApplicationContext(), "Your App Is Working On The Background", Toast.LENGTH_LONG).show();

        // perparing the handler that interacts with the main UI Thread
        final Handler handler = new Handler();

        // Reading the variables from the intent, that are passed from the mainActivity
        Bundle extras = getIntent().getExtras();
        email = extras.getString("userEmail");
        password = extras.getString("userPassword");

        final ListView emailsList = (ListView) findViewById(R.id.emailsList);

        final ArrayList<String> listItems = new ArrayList<String>();
        final ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, listItems);

        emailsList.setAdapter(adapter);

        final Email emailCredentials = new Email(email, password);

        // preparing the notifications
        Thread thread = new Thread(new Runnable() {

            @Override
            public void run() {
                try {

                    messages = emailCredentials.getEmails();

                    for (int i = 0; i < 10000; i++) {
                        messages = emailCredentials.getEmails();
                        Address[] froms = messages[messages.length - 1].getFrom();


                        sender = froms == null ? null : ((InternetAddress) froms[0]).getAddress();
                        final String subject = messages[messages.length - 1].getSubject();
                        String[] body2 = getUTF8Content(messages[messages.length - 1].getContent());
                        final String body = body2[0];


                        if (messages.length > inboxSize && i > 1) {
                            handler.post(new Runnable() {
                                @Override
                                public void run() {
                                    issueNotification(sender, subject, body);
                                    Log.d("Sender", sender);
                                    listItems.add(sender);
                                    adapter.notifyDataSetChanged();
                                }
                            });
                        }
                        inboxSize = messages.length;

                        Thread.sleep(1000);
                    }

                } catch (Exception e) {

                    e.printStackTrace();
                }
            }
        });


        thread.start();

    }

    public void issueNotification(String sender, String subject, String body) {

        resultIntent = new Intent(this, EmailViewerActivity.class);
        resultIntent.putExtra("sender", sender);
        resultIntent.putExtra("subject", subject);
        resultIntent.putExtra("body", body);

        resultPendingIntent = PendingIntent.getActivity(this, (int) System.currentTimeMillis(), resultIntent, PendingIntent.FLAG_UPDATE_CURRENT);

        notificationBuilder = new Notification.Builder(getApplicationContext());
        notificationBuilder.setContentTitle("New Email.");
        notificationBuilder.setTicker("New Email.");
        notificationBuilder.setVibrate(new long[]{1000, 400});
        notificationBuilder.setContentText("New Email Has Been Arrived to your inbox.");
        notificationBuilder.setSmallIcon(R.drawable.email);
        notificationBuilder.setAutoCancel(true);
        notificationBuilder.setContentIntent(resultPendingIntent);

        mNotificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        mNotificationManager.notify((int) System.currentTimeMillis(), notificationBuilder.build());
    }

    public static String[] getUTF8Content(Object contentObject) throws IOException {
        // possible ClassCastException
        SharedByteArrayInputStream sbais = (SharedByteArrayInputStream) contentObject;
        // possible UnsupportedEncodingException
        InputStreamReader isr = new InputStreamReader(sbais, Charset.forName("UTF-8"));
        int charsRead = 0;
        StringBuilder content = new StringBuilder();
        int bufferSize = 1024;
        char[] buffer = new char[bufferSize];
        // possible IOException
        while ((charsRead = isr.read(buffer)) != -1) {
            content.append(Arrays.copyOf(buffer, charsRead));
        }
        content.delete(0, 72);
        String[] message = content.toString().split("--00");

        return (message);
    }


}
