from odoo import fields, models, api
from odoo.exceptions import AccessError, ValidationError

class school_system_students(models.Model):
    _inherit = 'school.system.active'
    _name = 'school.system.students'

    _inherits = {'res.users': 'related_user'}

    name = fields.Char(string='Name')
    year = fields.Integer(string='Year')
    course_ids = fields.Many2many(comodel_name='school.system.courses', string='Courses')
    related_user = fields.Many2one(comodel_name='res.users', string='Related User')

    @api.multi
    def toggle_active(self):
        """ Inverse the value of the field ``active`` on the records in ``self``. """
        for record in self:
            record.active = not record.active

    @api.constrains('name', 'year')
    def _check_teachers_values(self):
        if not self.name or not self.year:
            print(self.env.context.get('default_name'))
            raise ValidationError("You are missing some values that are required.")