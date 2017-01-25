TEMPLATE = app
CONFIG += console c++11
CONFIG -= app_bundle
CONFIG -= qt

SOURCES += main.cpp \
    initiator.cpp

DISTFILES += \
    test.txt

QT += opengl
