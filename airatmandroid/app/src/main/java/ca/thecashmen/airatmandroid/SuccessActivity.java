package ca.thecashmen.airatmandroid;

import android.content.Intent;
import android.content.res.ColorStateList;
import android.support.v4.content.ContextCompat;
import android.support.v4.widget.ImageViewCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

public class SuccessActivity extends AppCompatActivity {


    private Button OKButton;
    private ImageView thumbsUp;
    private ImageView thumbsDown;
    private int colorThumbsUp;
    private int colorThumbsDown;
    private int colorThumbsDefault;
    private Boolean thumbsUpBool = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_success);

        OKButton = findViewById(R.id.OK_button);
        thumbsUp = findViewById(R.id.thumbs_up);
        thumbsDown = findViewById(R.id.thumbs_down);

        colorThumbsUp = ContextCompat.getColor(this, R.color.colorThumbsUp);
        colorThumbsDown = ContextCompat.getColor(this, R.color.colorThumbsDown);
        colorThumbsDefault = ContextCompat.getColor(this, R.color.colorThumbsDefault);

        thumbsUp.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                if(thumbsUpBool == null){
                    thumbsUpBool = true;
                }else{
                    thumbsUpBool = !thumbsUpBool;
                }
                ImageViewCompat.setImageTintList(thumbsUp, ColorStateList.valueOf(colorThumbsUp));
                ImageViewCompat.setImageTintList(thumbsDown, ColorStateList.valueOf(colorThumbsDefault));
            }
        });

        thumbsDown.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                if(thumbsUpBool == null){
                    thumbsUpBool = false;
                }else{
                    thumbsUpBool = !thumbsUpBool;
                }
                ImageViewCompat.setImageTintList(thumbsDown, ColorStateList.valueOf(colorThumbsDown));
                ImageViewCompat.setImageTintList(thumbsUp, ColorStateList.valueOf(colorThumbsDefault));
            }
        });

        OKButton.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view){
                if(thumbsUpBool != null){
                    Intent intent = new Intent(SuccessActivity.this,
                            MenuActivity.class);
                    Bundle bundle = new Bundle();
                    bundle.putBoolean("thumbs", thumbsUpBool);
                    bundle.putString("merchant", getIntent().getExtras().getString("merchant"));
                    bundle.putString("email", getIntent().getExtras().getString("email"));
                    bundle.putString("password", getIntent().getExtras().getString("password"));
                    bundle.putFloat("amount", getIntent().getExtras().getFloat("amount"));
                    bundle.putDouble("latitude", getIntent().getExtras().getDouble("latitude"));
                    bundle.putDouble("longitude", getIntent().getExtras().getDouble("longitude"));
                    intent.putExtras(bundle);
                    startActivity(intent);
                } else{
                    Toast.makeText(getApplicationContext(), "Please rate your merchant.",
                            Toast.LENGTH_LONG).show();
                }
            }
        });
    }
}
