from odoo import models, fields, api
from odoo.exceptions import AccessError, ValidationError


class school_system_teachers(models.Model):
    _inherit = ['school.system.active', 'mail.thread']

    _inherits = {'res.users': 'related_user'}

    _name = 'school.system.teachers'

    name = fields.Char(string='Name')
    teacher_type = fields.Selection(string='Type', selection=[('mr', 'Mr'), ('ms', 'Mrs')])
    title = fields.Char(string='Title')

    course_id = fields.Many2one(comodel_name='school.system.courses', string='Course')
    related_user = fields.Many2one(comodel_name='res.users', string='Related User')

    @api.onchange('title')
    def _onchange_title(self):
        if self.title == 'dr':
            return {'domain': {'course_id': [('name', 'ilike', '_')]}}
        else:
            return {'domain': {'course_id': [('name', 'not like', '_')]}}


    @api.multi
    def toggle_active(self):
        """ Inverse the value of the field ``active`` on the records in ``self``. """
        for record in self:
            record.active = not record.active

    # checking the availability of the values
    @api.constrains('name', 'teacher_type', 'title')
    def _check_teachers_values(self):
        if not self.name or not self.teacher_type or not self.title:
            raise ValidationError("You are missing some values that are required.")


class school_system_teachers_wizard(models.TransientModel):
    """ A wizard to manage the change of users' passwords. """
    _name = "school.system.teachers.wizard"

    def _default_teacher_value(self, key):
        obj = self.env['school.system.teachers'].browse(self._context.get('active_id'))
        return obj[key]

    teacher_name = fields.Char(string='Teachers', default=lambda self: self._default_teacher_value('name'),
                               readonly=True)
    teacher_type = fields.Char(string='Teachers', default=lambda self: self._default_teacher_value('teacher_type'),
                               readonly=True)
