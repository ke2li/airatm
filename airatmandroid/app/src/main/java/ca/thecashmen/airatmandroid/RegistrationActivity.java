package ca.thecashmen.airatmandroid;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class RegistrationActivity extends AppCompatActivity {

    private EditText firstName;
    private EditText lastName;
    private EditText email;
    private Button registerButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registration);

        firstName = findViewById(R.id.first_name);
        lastName = findViewById(R.id.last_name);
        email = findViewById(R.id.email);
        registerButton = findViewById(R.id.register_button);

        registerButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                if(!firstName.getText().toString().matches("")
                        && !lastName.getText().toString().matches("")
                        && !email.getText().toString().matches("")){
                    Toast.makeText(getApplicationContext(), "Registration successful!", Toast.LENGTH_LONG).show();
                    Intent intent = new Intent(RegistrationActivity.this, LoginActivity.class);
                    /*
                        just add to database?

                        Bundle bundle = new Bundle();
                        bundle.putString("firstName", firstName.getText().toString());
                        bundle.putString("lastName", lastName.getText().toString());
                        bundle.putString("email", email.getText().toString());
                    */
                    startActivity(intent);
                }else{
                    Toast.makeText(getApplicationContext(), "Please fill in all required boxes.", Toast.LENGTH_LONG).show();
                }
            }
        });
    }
}
