#include "Node.cpp"
class Link{
public:
    Node city1;
    Node city2;
    float h1;
    float h2;

public:
    Link* generateLinks(Node* nodes, short index, short index1);

};


Link* Link::generateLinks(Node *nodes, short index, short index1){

    Link* myLinks = new Link[index];
    char input1, input2;
    float cost;

    for(int i = 0; i < index; i++){
        cout << "For link #" << i << endl;
        cout << "What is City 1? ";
        cin >> input1;
        for(int j = 0; j < index1; j++){
            if(nodes[j].getNodeName() == input1){
                myLinks[i].city1 = nodes[j];
            }
        }

        cout << "What is City 2? ";
        cin >> input2;
        for(int j = 0; j < index1; j++){
            if(nodes[j].getNodeName() == input2){
                myLinks[i].city2 = nodes[j];
            }
        }


        //you can get costs here.

    }
    return myLinks;
}



/*Frontiers to Explored RULES:
 * --------------------------
 * After Expansion.
 * its children have been explored before.
 * --------------------------
*/



vector<Node> BFS(Link* links, short Cities_Num, short Links_Num, char start, char goal){

    vector<Node> Frontier;
    vector<Node> Explored;

    //this is to check if the start == goal
    if(start == goal){
        cout << "You didn't do any effort!. You reached your goal "<< goal << " with 0 steps";
        return Frontier;
    }

    //this loop to push the start to the Frontier.
    for(int i = 0; i < Cities_Num; i++){
        if(start == links[i].city1.getNodeName()){
            Frontier.push_back(links[i].city1);
            break;
        }
        else if(start == links[i].city2.getNodeName()) {
            Frontier.push_back(links[i].city2);
            break;
        }
    }



    short fc = 0; // frountier counter.
    //this is the expansion.

    // make an inner loop to loop on frontier and stop if node is founded again with visited signature
    for(int i = 0; i < Links_Num; i++){
                    VALIDATE:
                        if(Frontier.at(fc).getNodeName() == links[i].city1.getNodeName() && Frontier.at(i).isVisited() == false){
                            Frontier.push_back(links[i].city2);

                            cout << links[i].city1.getNodeName() << " and " << links[i].city2.getNodeName() << " is in frontier" << endl;

                        } else if(Frontier.at(fc).getNodeName() == links[i].city2.getNodeName() && Frontier.at(i).isVisited() == false){
                            Frontier.push_back(links[i].city1);

                            cout << links[i].city2.getNodeName() << " and " << links[i].city1.getNodeName() << " is in frontier" << endl;

                        } else {
                            //this happens when the city is changed. so you change the fc to next item and then compare again.
                            //when this change occurs, then the prev one is visited.

                            Frontier.at(fc).setVisited();
                            Explored.push_back(Frontier.at(fc));

                            cout << Frontier.at(fc).getNodeName() << " is now at Explored" << endl;
                            Frontier.at(fc).setVisited();
                            cout << Frontier.at(fc).getNodeName() << " is now " << Frontier.at(fc).isVisited() << endl;

                            if(links[i].city1.getNodeName() == goal){
                                cout << links[i].city1.getNodeName() << " is a goal, it's in Explored now" << endl;

                                Explored.push_back(links[i].city1);
                                break;
                            } else if(links[i].city2.getNodeName() == goal){
                                cout << links[i].city2.getNodeName() << " is a goal, it's in Explored now" << endl;

                                Explored.push_back(links[i].city2);
                                break;
                            }

                                ++fc;
                                goto VALIDATE;

                        }
                    }


    //this loop to clear redundant values.
    for(int i = 0; i < Frontier.size(); i++){
        for(int j = 0; j < Frontier.size(); j++){
            if(Frontier.at(i).getNodeName() == Frontier.at(j).getNodeName()){
                //Frontier.erase(j);
            }
        }
    }


cout << "\n\n\n\n\n" << endl;
    for(auto i : Frontier){
        cout << i.getNodeName() << endl;
    }


    cout << "\n\n" << endl;
        for(auto i : Explored){
            cout << i.getNodeName() << endl;
        }

    return Frontier;
}












