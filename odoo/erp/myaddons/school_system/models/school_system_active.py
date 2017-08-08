from odoo import models, fields

class school_system_active(models.AbstractModel):
    _name = 'school.system.active'
    active = fields.Boolean(string='Active', default=True)