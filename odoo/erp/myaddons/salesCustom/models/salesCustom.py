from odoo import fields, models, api

class salesCustom(models.Model):

    _inherit = 'stock.picking'

    state = fields.Selection([
        ('draft', 'Draft'), ('pending', 'Pending Action'),
        ('cancel', 'Cancelled'),
        ('waiting', 'Waiting Another Operation'),
        ('confirmed', 'Waiting Availability'),
        ('partially_available', 'Partially Available'),
        ('assigned', 'Available'), ('done', 'Done')])

    stock_log = fields.One2many('stock.picking.custom.log', inverse_name="stock_picking", string="Log")


    @api.model
    def create(self, vals):
        rec_id = super(salesCustom, self).create(vals)
        for elem in vals.get('move_lines'):
            values = {"user_id": self.env.uid, "last_state": "none", "current_state": elem[2].get('state'), "stock_picking": rec_id.id}
            self.env['stock.picking.custom.log'].create(values)
        return rec_id

    @api.multi
    def action_pending(self):
        self.state = 'pending'


class salesCustomLog(models.Model):
    _name = 'stock.picking.custom.log'

    user_id = fields.Many2one('res.users', string="User")
    last_state = fields.Char(string="Last State")
    current_state = fields.Char(string="Current State")
    date = fields.Datetime(string="Date", readonly=True, default=fields.Datetime().now())

    stock_picking = fields.Many2one('stock.picking' ,string="Stock Picking")