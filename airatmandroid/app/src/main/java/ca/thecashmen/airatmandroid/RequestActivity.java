package ca.thecashmen.airatmandroid;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.InputFilter;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class RequestActivity extends AppCompatActivity {

    private Button requestMoney;
    private EditText requestAmount;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_request);

        requestAmount = (EditText) findViewById(R.id.requestAmount);
        requestAmount.setFilters(new InputFilter[] {new DecimalDigitsInputFilter(4,2)});
        requestMoney = findViewById(R.id.requestMoneyButton);

        requestMoney.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                if(!requestAmount.getText().toString().matches("")){
                    Intent intent = new Intent(RequestActivity.this, MapActivity.class);
                    startActivity(intent);
                } else{
                    Toast.makeText(getApplicationContext(), "Please enter a monetary amount.", Toast.LENGTH_LONG).show();
                }
            }
        });
    }
}
