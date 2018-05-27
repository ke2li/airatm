package ca.thecashmen.airatmandroid;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import ca.thecashmen.airatmandroid.Model.User;
import ca.thecashmen.airatmandroid.Services.PostService;
import okhttp3.Response;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LoginActivity extends AppCompatActivity {

    private EditText email;
    private EditText password;
    private Button loginButton;
    private Button registerButton;
    private User user;
    private Retrofit retrofit;
    private Retrofit.Builder builder;
    private PostService postService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        builder = new Retrofit.Builder()
                .baseUrl("https://cryptic-tundra-96163.herokuapp.com")
                .addConverterFactory(GsonConverterFactory.create());

        retrofit = builder.build();

        postService = retrofit.create(PostService.class);

        email = findViewById(R.id.email);
        password = findViewById(R.id.password);
        loginButton = findViewById(R.id.login_button);
        registerButton = findViewById(R.id.register_button);

        loginButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                if(!email.getText().toString().matches("") && !password.getText().toString().matches("")
                    /*&& valid credentials*/){
                    user = new User();
                    user.setEmail(email.getText().toString());
                    user.setPassword(password.getText().toString());
                    Call<ResponseBody> call = postService.loginUserCall(user);

                    call.enqueue(new Callback<ResponseBody>() {
                        @Override
                        public void onResponse(Call<ResponseBody> call, retrofit2.Response<ResponseBody> response) {
                            if(response.code() == 200){
                                Bundle bundle = new Bundle();
                                bundle.putString("email", email.getText().toString());
                                bundle.putString("password", password.getText().toString());
                                Intent intent = new Intent(LoginActivity.this, MenuActivity.class);
                                intent.putExtras(bundle);
                                startActivity(intent);
                            } else{
                                Toast.makeText(getApplicationContext(), "Invalid credentials", Toast.LENGTH_LONG).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<ResponseBody> call, Throwable t) {
                            Toast.makeText(getApplicationContext(), "Please check your network connection.", Toast.LENGTH_LONG).show();

                        }
                    });

                }

            }
        });

        registerButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                Intent intent = new Intent(LoginActivity.this, RegistrationActivity.class);
                startActivity(intent);
            }
        });
    }
}
