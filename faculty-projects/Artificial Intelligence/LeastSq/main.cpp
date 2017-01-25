#include <iostream>
#include <math.h>
#include <fstream>
#include <vector>

using namespace std;

void generateLine(vector<double> x_points, vector<double> y_points, short N){

    double sumX = 0;
    double sumY = 0;
    double sumXY = 0;
    double sumXSquared = 0;
    for(int i = 0; i < N; i++){
        sumX += x_points[i];
        sumY += y_points[i];
        sumXY += x_points[i] * y_points[i];
        sumXSquared += x_points[i] * x_points[i];

    }

//    cout << "N * Σxy : " << sumXY * N << endl;
//    cout << "Σx * Σy : " << sumX * sumY << endl;

//    cout << "N * Σx^2 : " << sumXSquared * N << endl;
//    cout << "(Σx)^2 : " << sumX*sumX << endl;

    cout << "Point w.r.t X is = " << (sumY * (sumXSquared) - (sumX*sumXY) ) / ( (N * sumXSquared) - (sumX*sumX)) << endl;

    cout << "With angle = " <<  atan(( (sumXY*N) - (sumX*sumY) ) / ( (sumXSquared*N) - (sumX*sumX) )) * 180 / 3.14 << endl;


}

int SizeOfFile(string dir){

    int numOfLines = 0;
    string line;
    ifstream myFile(dir);

    while(getline(myFile, line))
        ++numOfLines;

    return numOfLines;
}


void readFile(string dir){
    string line;
    ifstream myFile(dir);

    while(myFile >> line){
        cout << line << endl;
    }
}

void readFileIntoArray(string dir, int sizeOfFile, vector<double>& x, vector<double>& y){
    int numOfLines = 0;
    string line;
    ifstream myFile(dir);
    int counter = 0;

    while(myFile >> line){
        if(counter %2 == 0)
            x.push_back(stod(line));
        else
            y.push_back(stod(line));

        counter++;
    }
}


int main(){

    int sizeOfFile = SizeOfFile("/home/belal/LeastSq/data.txt");
    cout << "Size Of Data: " << sizeOfFile << endl;
    vector<double> xPoints;
    vector<double> yPoints;


//    readFileIntoArray("/home/belal/LeastSq/data.txt", sizeOfFile, xPoints, yPoints);


//    generateLine(xPoints, yPoints, sizeOfFile);


    readFile("/home/belal/LeastSq/data.txt");


    return 0;
}
