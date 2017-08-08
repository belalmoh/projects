from odoo import models, fields

class HrEmployeeInherit(models.Model):

    _inherit = 'hr.employee'

    emp_code = fields.Char(string="Employee code")
