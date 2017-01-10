package com.example.belal.project2;

import android.content.Context;
import android.content.Intent;
import android.os.Vibrator;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import javax.mail.*;

public class MainActivity extends AppCompatActivity {

    EditText email;
    EditText password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        email = (EditText) findViewById(R.id.email);
        password = (EditText) findViewById(R.id.password);
    }

    public void onLoginButtonClicked(View v) {


        if (email.getText().toString().length() != 0 && password.getText().toString().length() != 0) {
            Intent toEmailActivity = new Intent(getApplicationContext(), EmailActivity.class);
            toEmailActivity.putExtra("userEmail", email.getText().toString());
            toEmailActivity.putExtra("userPassword", password.getText().toString());

            startActivity(toEmailActivity);

        } else {
            Toast.makeText(getApplicationContext(), "Please fill the fields.", Toast.LENGTH_LONG).show();
        }

    }

    public void onClearButtonClicked(View v){
        email.setText("");
        password.setText("");
    }
}
