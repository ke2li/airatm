package ca.thecashmen.airatmandroid.Model;

public class Transaction {
    private float commission;
    private float amount;
    private String clientEmail;
    private String merchantEmail;

    public void setCommission(float comission){
        this.commission = comission;
    }

    public void setAmount(float amount){
        this.amount = amount;
    }

    public void setClientEmail(String clientEmail){
        this.clientEmail = clientEmail;
    }

    public void setMerchantEmail(String merchantEmail){
        this.merchantEmail = merchantEmail;
    }
}