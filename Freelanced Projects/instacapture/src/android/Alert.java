package com.custom.plugin.alert;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Alert extends CordovaPlugin {
  public final String ALERT_HI = "sayHi";
  public final String ALERT_HELLO = "sayHello";
  public final String ALERT_CONGRATS = "sayCongratulations";

  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) 
      throws JSONException {
    if (action.equals(ALERT_HI)) {
      callbackContext.success("hi");
      return true;
    } else if(action.equals(ALERT_HELLO)){
      callbackContext.success("hello");
      return true;
    } else if(action.equals(ALERT_CONGRATS)){
      callbackContext.success("congratulations");
      return true;
    }
    return false;
  }
}