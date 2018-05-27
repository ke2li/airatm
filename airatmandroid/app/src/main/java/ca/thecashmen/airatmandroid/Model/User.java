package ca.thecashmen.airatmandroid.Model;

public class User {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private float reputation;
    private boolean verified;
    private boolean online;
    private float accBalance;
    private float cashOnHand;
    private double longitude;
    private double latitude;

    public void setFirstName(String firstName){
        this.firstName = firstName;
    }

    public void setLastName(String lastName){
        this.lastName = lastName;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public void setPassword(String password){
        this.password = password;
    }

    public void setReputation(float reputation){
        this.reputation = reputation;
    }

    public void setVerified(boolean verified){
        this.verified = verified;
    }

    public void setOnline(boolean online){
        this.online = online;
    }

    public void setAccBalance(float accBalance){
        this.accBalance = accBalance;
    }

    public void setCashOnHand(float cashOnHand){
        this.cashOnHand = cashOnHand;
    }

    public void setLongitude(double longitude){
        this.longitude = longitude;
    }

    public void setLatitude(double latitude){
        this.latitude = latitude;
    }
}
