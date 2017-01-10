package com.example.belal.myapplication;

import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {

    WebView searchWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        searchWebView = (WebView) findViewById(R.id.searchWebView);
        searchWebView.getSettings().setJavaScriptEnabled(true);
        searchWebView.getSettings().setLoadWithOverviewMode(true);
        searchWebView.getSettings().setUseWideViewPort(true);
        searchWebView.setWebViewClient(new existsViewClient());

        if(savedInstanceState != null){
            ((WebView) findViewById(R.id.searchWebView)).restoreState(savedInstanceState);
        }

    }

    @Override
    protected void onSaveInstanceState(Bundle outState){
        searchWebView.saveState(outState);
    }

    public void searchText(View v){

        // to hide the keyboard after entering the text.
        InputMethodManager imm = (InputMethodManager)getSystemService(Context.INPUT_METHOD_SERVICE);
        imm.hideSoftInputFromWindow(v.getWindowToken(), 0);

        EditText searchText = (EditText) findViewById(R.id.editText);
        String url = searchText.getText().toString().replaceAll(" ","+");
        searchWebView.loadUrl(getResources().getString(R.string.googlePlacesURI) + url);

    }

}
