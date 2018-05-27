package ca.thecashmen.airatmandroid;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.gson.Gson;

import ca.thecashmen.airatmandroid.Model.User;
import ca.thecashmen.airatmandroid.Services.PostService;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RegistrationActivity extends AppCompatActivity {

    private EditText password;
    private EditText firstName;
    private EditText lastName;
    private EditText email;
    private Button registerButton;
    private Retrofit retrofit;
    private Retrofit.Builder builder;
    private PostService postService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registration);

        builder = new Retrofit.Builder()
                .baseUrl("https://cryptic-tundra-96163.herokuapp.com")
                .addConverterFactory(GsonConverterFactory.create());

        retrofit = builder.build();

        postService = retrofit.create(PostService.class);

        firstName = findViewById(R.id.first_name);
        lastName = findViewById(R.id.last_name);
        email = findViewById(R.id.email);
        password = findViewById(R.id.password);
        registerButton = findViewById(R.id.register_button);

        registerButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                if(!firstName.getText().toString().matches("")
                        && !lastName.getText().toString().matches("")
                        && !email.getText().toString().matches("")){

                    User user = new User();
                    user.setFirstName(firstName.getText().toString());
                    user.setLastName(lastName.getText().toString());
                    user.setEmail(email.getText().toString());
                    user.setPassword(password.getText().toString());
                    Call<ResponseBody> call = postService.createUserCall(user);

                    call.enqueue(new Callback<ResponseBody>() {
                                     @Override
                                     public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                                         if(response.code() == 200) {
                                             Toast.makeText(getApplicationContext(), "Registration successful!", Toast.LENGTH_LONG).show();
                                             Intent intent = new Intent(RegistrationActivity.this, LoginActivity.class);
                                             startActivity(intent);
                                         } else{
                                             Toast.makeText(getApplicationContext(), "Error registering.", Toast.LENGTH_LONG).show();
                                             System.out.println(response.code());

                                         }
                                     }

                                     @Override
                                     public void onFailure(Call<ResponseBody> call, Throwable t) {

                                     }
                                 });




                    /*
                        just add to database?

                        Bundle bundle = new Bundle();
                        bundle.putString("firstName", firstName.getText().toString());
                        bundle.putString("lastName", lastName.getText().toString());
                        bundle.putString("email", email.getText().toString());
                    */
                }else{
                    Toast.makeText(getApplicationContext(), "Please fill in all required boxes.", Toast.LENGTH_LONG).show();
                }
            }
        });
    }
}
