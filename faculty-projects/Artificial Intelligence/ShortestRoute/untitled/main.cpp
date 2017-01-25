#include <iostream>
#include <vector>
#include "link.cpp"

using namespace std;


int main(int argc, char const *argv[])
{
    short Cities_Num = 5;
    short Links_Num = 6;
    Node* nodes;
    nodes = nodes->generatePoints(nodes, Cities_Num);

    Link* links;
    links = links->generateLinks(nodes,Links_Num, Cities_Num);


    BFS(links, Cities_Num, Links_Num, 'a', 'e');

    return 0;
}
