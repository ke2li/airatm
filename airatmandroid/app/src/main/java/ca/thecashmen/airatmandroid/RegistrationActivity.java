package ca.thecashmen.airatmandroid;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class RegistrationActivity extends AppCompatActivity {

    private EditText fName;
    private EditText lName;
    private EditText email;
    private Button registerButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registration);

        fName = (EditText) findViewById(R.id.fName);
        lName = (EditText) findViewById(R.id.lName);
        email = (EditText) findViewById(R.id.email);
        registerButton = findViewById(R.id.register_button);

        registerButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                if(!fName.getText().toString().matches("")
                        && !lName.getText().toString().matches("")
                        && !email.getText().toString().matches("")){
                    Toast.makeText(getApplicationContext(), "Registration successful!", Toast.LENGTH_LONG).show();
                    Intent intent = new Intent(RegistrationActivity.this, LoginActivity.class);
                    startActivity(intent);
                }else{
                    Toast.makeText(getApplicationContext(), "Please fill in all required boxes.", Toast.LENGTH_LONG).show();
                }
            }
        });
    }
}
