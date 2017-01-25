#include <iostream>
#include <vector>
using namespace std;


class Node {
private:
    char Name;
    bool Status;

public:
    void setNodeName(char c);
    char getNodeName();

    void setVisited();
    bool isVisited();

    Node* generatePoints(Node *p, short index);

    Node(char nodeName);
    Node();
};


void Node::setNodeName(char c){
        this->Name = c;
}


void Node::setVisited(){
        this->Status = true;
}


char Node::getNodeName(){
    return this->Name;
}

bool Node::isVisited(){
    return this->Status;
}

Node::Node(char nodeName){
    this->Name = nodeName;
}

Node::Node(){
    this->Name = NULL;
    this->Status = false;
}


Node* Node::generatePoints(Node* p, short index){

    char user_inp;

    p = new Node[index];

    for(int i = 0; i < index; i++){
        cout << "For point #" << i << " Enter its symbol: ";
        cin >> user_inp;
        p[i].setNodeName(user_inp);
    }

    return p;
}

