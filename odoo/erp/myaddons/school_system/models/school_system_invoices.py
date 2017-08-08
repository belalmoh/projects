from odoo import fields, api, models
from odoo.exceptions import AccessError, ValidationError


class school_system_invoices(models.TransientModel):
    _name = 'school.system.invoices.wizard'

    date_from = fields.Date(string='Date From', required=True)
    date_to = fields.Date(string='Date To', required=True)

    def dates_constrains(self):
        if self.date_to < self.date_from:
            raise ValidationError("Date To can't be less than Date From")
            return False
        return True

    # @api.model
    # def render_html(self, docids, data=None):
    #
    #     report_obj = self.env['report']
    #     report = report_obj._get_report_from_name('school_system.report_invoices_sheet')
    #
    #     mydata = {
    #         data: self.env.get('account.invoice').search([])
    #     }
    #
    #     docargs = {
    #         'doc_ids': self._ids,
    #         'doc_model': self.model,
    #         'docs': self,
    #         'mydata': mydata
    #     }
    #
    #     return self.env['report'].render('school_system.report_invoices_sheet', docargs)


    @api.multi
    def on_print_clicked(self):

        invoiceModel = self.env['account.invoice']
        invoices = self.env['account.invoice'].search([('date_invoice', '>=', self.date_from), ('date_invoice', '<=', self.date_to)])

        datas = {
            'ids': invoices._ids,
            'model': invoiceModel._name,
            # 'form': invoiceModel.read(),
            'context': self._context
        }

        print(self._context)

        return {
            'type': 'ir.actions.report.xml',
            'report_name': 'school_system.report_invoices_sheet',
            'datas': datas
        }

    @api.multi
    def on_view_clicked(self):
        if self.dates_constrains():
            wizard_form = self.env.ref('account_invoice_tree', False)
            return {
                'name': 'Invoices Report Generator',
                'type': 'ir.actions.act_window',
                'res_model': 'account.invoice',
                'view_id': wizard_form,
                'view_type': 'form',
                'view_mode': 'tree',
                'target': 'new',
                'domain': [('date_invoice', '>=', self.date_from), ('date_invoice', '<=', self.date_to)]
            }
