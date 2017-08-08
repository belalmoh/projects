from odoo import models, fields, api
from odoo.exceptions import ValidationError

class FirstAddon(models.Model):
    # name of the database table.
    _name = 'mansoura.student'

    @api.depends('salary')
    def calc_tax(self):
        tracks = self.env['mansoura.tracks'].search([('is_open', '=', True)])
        percent = 0.05 if (len(tracks) > 5) else 0.02
        self.tax = self.salary * percent

    # columns of the database table.
    name = fields.Char(string="Name")
    age = fields.Integer(string="Age")
    salary = fields.Float(string="Salary")
    tax = fields.Float(string="Taxes", compute=calc_tax)

    # any type of file
    image = fields.Binary(string='Image')
    is_accepted = fields.Boolean(string="Accepted")
    bio = fields.Text(string="Bio")
    cv = fields.Html(string="CV")

    # it takes list of tuples; where (dbValue, toBeViewedValue)
    grade = fields.Selection(selection=[
        ('g', 'Good'), ('vg', 'Very Good'), ('d', 'Distinct')
    ], string="Grade")

    track_id = fields.Many2one(comodel_name='mansoura.tracks', string='Track')
    skills_ids = fields.Many2many(comodel_name='mansoura.skills', string='Skills')

    @api.onchange('grade')
    def onchange_grade(selfs):
        if(selfs.grade == 'g'):
            selfs.salary = 1600
        elif(selfs.grade == 'vg'):
            selfs.salary = 1000
        else:
            selfs.salary = 0

class MansouraTracks(models.Model):
    _name = 'mansoura.tracks'

    name = fields.Char(string="Name")
    is_open = fields.Boolean(string="Opened?")
    student_ids = fields.One2many(comodel_name='mansoura.student', inverse_name='track_id', string='Students')


class MansouraSkill(models.Model):
    _name = 'mansoura.skills'

    _rec_name = 'skill'
    skill = fields.Char(string="Skill")

