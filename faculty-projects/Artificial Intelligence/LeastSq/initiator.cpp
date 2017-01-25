//#include <GL/glut.h>

//double xPoints[] = {3,7,1,5};
//double yPoints[] = {6,9,4,7};

//void displayAxis(double x, double y){
//    glBegin(GL_LINES);
//    glVertex2d(x,y);
//    glVertex2d(x,-y);
//    glVertex2d(y,x);
//    glVertex2d(-y,x);
//    glEnd();
//}


//void displayPoints(double x, double y){

//    glPointSize(3.2);
//    glBegin(GL_POINTS);
//    glColor3f(1,0,0);
//    for(int i = 0; i < 4; i++){
//        glVertex2d(xPoints[i], yPoints[i]);
//    }
//    glEnd();

////    glRotatef(38, 0, 0, 1);
//    glBegin(GL_LINES);
//    glColor3f(1,1,0);
//    glVertex2d(0,3.3);
//    glVertex2d(3.3, 3.3);
//    glEnd();
//}

//void displayMe(){
//    double x_axis = 0;
//    double y_axis = 100;
//    glClear(GL_COLOR_BUFFER_BIT);
//    displayAxis(x_axis, y_axis);


//    displayPoints(10,20);

//    glFlush();
//}

//int main(int argc, char** argv)
//{
//    glutInit(&argc, argv);
//    glutInitDisplayMode(GLUT_SINGLE);
//    glutInitWindowSize(700, 700);
//    glutInitWindowPosition(100, 100);
//    glutCreateWindow("Hello world :D");
//    gluOrtho2D(-10, 10, -10, 10);
//    glutDisplayFunc(displayMe);
//    glutMainLoop();
//    return 0;
//}
