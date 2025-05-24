#include<iostream>
#include<iomanip>
void showbalance(double balance);
double deposit();
double withdraw (double balance);

using namespace std;

int main()
{
    double balance= 4563;
    int choice;
    do {
        cout<<" Enter Your Choice\n";
        cout<<"1.Show Balance\n";
        cout<<"2.Deposited \n";
        cout<<"3.Withdraw\n";
        cout<<"4.Exit\n";

        cin >> choice;

        if (cin.fail()) {
            cin.clear(); 
            cin.ignore(1000, '\n');
            choice = -1; 
        }

        switch(choice) {

        case 1:
            showbalance(balance);
            break;
        case 2:
            balance += deposit();
            showbalance(balance);
            break;
        case 3:
            balance = balance-withdraw(balance);
            showbalance(balance);
            break;
        case 4:
            cout<<"Thanks For Visiting\n";
            break;
        default:
            cout <<"Invalid Choice\n";
        }
    } while(choice != 4);
    return 0;
}
void showbalance(double balance) {
    cout<<"Your account balance is ="<<setprecision(2)<<fixed<<balance <<'\n';

}
double deposit() {
    double amount;
    cout<<" How much do you want to deopoit?\n=";

    cin>>amount;
    if(amount>0) {
        return amount;
    }
    else {
        cout<<"ki chas tui\n";
        return 0;
    }
}

double withdraw (double balance) {
    double amount;
    cout<<" Enter amount to be withdraw =\n";
    cin>>amount ;
    if(amount<balance) {
        return amount;
    }
    else {
        cout<<":(Tomar ato tk nai!\n";
        return 0;
    }

    return 0;
}