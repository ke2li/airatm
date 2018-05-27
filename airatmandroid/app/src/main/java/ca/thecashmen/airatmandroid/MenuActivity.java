package ca.thecashmen.airatmandroid;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.InputFilter;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class MenuActivity extends AppCompatActivity {

    private EditText requestAmount;
    private Button requestMoney;
    private Button lend;
    private Button viewTransactions;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu);

        requestAmount = findViewById(R.id.request_amount);
        requestAmount.setFilters(new InputFilter[] {new DecimalDigitsInputFilter(4,2)});
        requestMoney = findViewById(R.id.request_money_button);
        lend = findViewById(R.id.lend_button);
        viewTransactions = findViewById(R.id.view_transactions_button);

        requestMoney.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                if(!requestAmount.getText().toString().matches("") && Float.parseFloat(requestAmount.getText().toString()) != 0){
                    Bundle bundle = new Bundle();
                    bundle.putString("email", getIntent().getExtras().getString("email"));
                    bundle.putString("password", getIntent().getExtras().getString("password"));
                    bundle.putFloat("amount", Float.parseFloat(requestAmount.getText().toString()));
                    Intent intent = new Intent(MenuActivity.this, MapActivity.class);
                    intent.putExtras(bundle);
                    startActivity(intent);
                } else{
                    Toast.makeText(getApplicationContext(), "Please enter a monetary amount.", Toast.LENGTH_LONG).show();
                }
            }
        });

        lend.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                Intent intent = new Intent(MenuActivity.this, LendActivity.class);
                startActivity(intent);
            }
        });

        viewTransactions.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                // if(a transaction exists)
                Intent intent = new Intent(MenuActivity.this, ConfirmationActivity.class);
                Bundle bundle = new Bundle();
                bundle.putBoolean("confirmationButtonHide", true);
                intent.putExtras(bundle);
                startActivity(intent);
            }
        });
    }
}
