package ca.thecashmen.airatmandroid;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class ConfirmationActivity extends AppCompatActivity {

    private EditText merchant_id;
    private EditText amount_id;
    private EditText location_id;
    private Button confirmButton;
    private Button authenticateButton;
    private Button cancelButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_confirmation);

        merchant_id = findViewById(R.id.merchant_id);
        amount_id = findViewById(R.id.amount_id);
        location_id = findViewById(R.id.location_id);
        confirmButton = findViewById(R.id.confirm_button);
        authenticateButton = findViewById(R.id.authenticate_button);
        cancelButton = findViewById(R.id.cancel_button);

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
}
