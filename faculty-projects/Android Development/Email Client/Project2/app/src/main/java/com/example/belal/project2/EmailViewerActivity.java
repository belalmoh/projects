package com.example.belal.project2;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.webkit.WebView;
import android.widget.TextView;
import android.widget.Toast;

/**
 * Created by Belal on 12/24/2016.
 */

public class EmailViewerActivity extends AppCompatActivity {
    String sender;
    String subject;
    String body;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.emailview_layout);

        TextView emailSender = (TextView) findViewById(R.id.emailSender);
        TextView emailSubject = (TextView) findViewById(R.id.emailSubject);
        TextView emailBody = (TextView) findViewById(R.id.emailBody);

        Bundle extras = getIntent().getExtras();

        sender = extras.getString("sender");
        subject = extras.getString("subject");
        body = extras.getString("body");

        emailSender.setText(sender);
        emailSubject.setText(subject);
        emailBody.setText(body);

    }
}
