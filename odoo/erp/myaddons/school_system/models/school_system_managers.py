from odoo import fields, models, api
from odoo.exceptions import AccessError, ValidationError

class school_system_managers(models.Model):
    _name = 'school.system.managers'
    _inherit = 'school.system.active'

    _inherits = {'res.users': 'related_user'}

    name = fields.Char(string='Name')
    school_ids = fields.Many2one(comodel_name='school.system.schools', string='Schools')
    years_of_experience = fields.Integer(string='Years Of Experience')

    related_user = fields.Many2one(comodel_name='res.users', string='Related User')

    @api.multi
    def toggle_active(self):
        """ Inverse the value of the field ``active`` on the records in ``self``. """
        for record in self:
            record.active = not record.active

    @api.constrains('name', 'years_of_experience')
    def _check_teachers_values(self):
        if not self.name or not self.years_of_experience:
            raise ValidationError("You are missing some values that are required.")