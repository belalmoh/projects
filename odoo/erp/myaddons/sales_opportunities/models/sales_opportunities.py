from odoo import fields, models, api

class sales_opportunities(models.Model):
    _inherit = 'res.partner'
    employee_opportunities = fields.One2many('crm.lead', inverse_name='partner_id', string='Opportunities')
