from odoo import fields, models, api
from odoo.exceptions import AccessError, ValidationError

class school_system_schools(models.Model):
    _name = 'school.system.schools'

    _inherit = ['school.system.active']

    name = fields.Char(string='Name')
    location = fields.Char(string='Location')

    manager_ids = fields.One2many(comodel_name='school.system.managers', inverse_name='school_ids', string='Managers')

    @api.multi
    def toggle_active(self):
        """ Inverse the value of the field ``active`` on the records in ``self``. """
        for record in self:
            record.active = not record.active

    @api.constrains('name', 'location')
    def _check_teachers_values(self):
        if not self.name or not self.location:
            raise ValidationError("You are missing some values that are required.")