package com.example.belal.myapplication;

import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * Created by Belal on 10/24/2016.
 */

public class existsViewClient extends WebViewClient {
    @Override
    public boolean shouldOverrideUrlLoading(WebView v, String url) {
        v.loadUrl(url);
        return true;
    }
}
