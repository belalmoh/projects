from odoo import fields, models, api
from odoo.exceptions import AccessError, ValidationError

class school_system_courses(models.Model):
    _inherit = 'school.system.active'
    _name = 'school.system.courses'

    name = fields.Char(string='Name')
    teacher_id = fields.One2many(comodel_name='school.system.teachers', string='Teachers', inverse_name='course_id', default=lambda self: self.get_default_values('school.system.teachers'))
    student_ids = fields.Many2many(comodel_name='school.system.students', string='Students')

    def get_default_values(self, modelName):
        return self.env.get(modelName).search([])

    @api.multi
    def toggle_active(self):
        """ Inverse the value of the field ``active`` on the records in ``self``. """
        for record in self:
            record.active = not record.active

    @api.constrains('name')
    def _check_teachers_values(self):
        if not self.name:
            raise ValidationError("You are missing some values that are required.")

