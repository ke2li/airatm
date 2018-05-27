package ca.thecashmen.airatmandroid.Services;

import java.util.List;

import ca.thecashmen.airatmandroid.Model.ExchangeRequest;
import ca.thecashmen.airatmandroid.Model.Transaction;
import ca.thecashmen.airatmandroid.Model.User;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Query;
import retrofit2.http.Path;

public interface PostService {
	@POST("/newuser")
	Call<ResponseBody> createUserCall(@Body User user);

	@POST("/login")
	Call<ResponseBody> loginUserCall(@Body User user);

	@POST("/findUsers")
	Call<List<User>> getAllUsers();

	@POST("/findUserByEmail")
	Call<User> getUserByEmail(@Body User user);

	@POST("/exchangeCash")
	Call<ResponseBody> performTransaction(@Body ExchangeRequest exchangeRequest);

	@POST("/newTransaction")
	Call<ResponseBody> makeTransaction(@Body Transaction transaction);

	@POST("/allTransactions")
	Call<List<Transaction>> getAllTransactions();

	@POST("/satisfyRequest")
	Call<ResponseBody> confirmTrasnactionAccepted(@Body Transaction transaction);

	@POST("/transactionLookup")
	Call<Transaction> findTransaction(@Body User user);
}

/*
newuser
login
findusers
transaction*/