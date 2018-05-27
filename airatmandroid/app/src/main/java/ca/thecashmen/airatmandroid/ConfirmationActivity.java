package ca.thecashmen.airatmandroid;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;

public class ConfirmationActivity extends AppCompatActivity implements OnMapReadyCallback {

    private TextView merchant_id;
    private Button confirmButton;
    private Button authenticateButton;
    private Button cancelButton;

    GoogleMap mGoogleMap;
    MapView mapView;
    Marker mCurrLocationMarker;
    LatLng meetingLocation;

    @Override
    protected void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_confirmation);

        merchant_id = findViewById(R.id.merchant_id);
        confirmButton = findViewById(R.id.confirm_button);
        authenticateButton = findViewById(R.id.authenticate_button);
        cancelButton = findViewById(R.id.cancel_button);

        mapView = findViewById(R.id.map);
        mapView.onCreate(savedInstanceState);
        mapView.getMapAsync(this);
        meetingLocation = new LatLng(getIntent().getExtras().getDouble("latitude")
                , getIntent().getExtras().getDouble("longitude"));
        mapView.onResume();

        cancelButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                ConfirmationActivity.this.finish();
            }
        });

        authenticateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(ConfirmationActivity.this, ScannerActivity.class);
                Bundle bundle = new Bundle();
                bundle.putString("merchant", merchant_id.getText().toString());
                bundle.putString("email", getIntent().getExtras().getString("email"));
                bundle.putString("password", getIntent().getExtras().getString("password"));
                bundle.putFloat("amount", getIntent().getExtras().getFloat("amount"));
                bundle.putDouble("latitude", getIntent().getExtras().getDouble("latitude"));
                bundle.putDouble("longitude", getIntent().getExtras().getDouble("longitude"));
                intent.putExtras(bundle);
                startActivity(intent);
            }
        });

        if(getIntent().getExtras() != null && getIntent().getExtras().getBoolean("confirmationButtonHide",false)){
            confirmButton.setVisibility(View.GONE);
            authenticateButton.setVisibility(View.VISIBLE);
            cancelButton.setVisibility(View.VISIBLE);
        } else{
            confirmButton.setVisibility(View.VISIBLE);
            authenticateButton.setVisibility(View.GONE);
            cancelButton.setVisibility(View.GONE);
        }

        confirmButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                Toast.makeText(getApplicationContext(), "Transaction confirmed!", Toast.LENGTH_LONG).show();
                /*
                implement saving the data of transaction
                 */
                Intent intent = new Intent(ConfirmationActivity.this, MenuActivity.class);
                startActivity(intent);
            }
        });
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mGoogleMap = googleMap;
        mCurrLocationMarker = mGoogleMap.addMarker((new MarkerOptions().position(meetingLocation))
                .title("Meetup Point"));
        mGoogleMap.animateCamera(CameraUpdateFactory.newLatLngZoom(meetingLocation, 17));
    }
}
