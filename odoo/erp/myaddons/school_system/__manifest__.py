# -*- coding: utf-8 -*-
{
    'name': "School System",

    'summary': """
        A very good school system for you to get""",

    'description': """
        You can monitor your schools, teachers, students and courses
    """,

    'author': "Belal",
    'version': '1.0',

    # any module necessary for this one to work correctly
    'depends': ['base', 'mail', 'hr', 'account', 'report'],

    # always loaded
    'data': [
        'security/school_system_security.xml',
        'security/ir.model.access.csv',
        'views/school_system_view_trees.xml',
        'views/school_system_view_forms.xml',
        'views/school_system_view_searches.xml',
        'views/school_system_view.xml'
    ],
}