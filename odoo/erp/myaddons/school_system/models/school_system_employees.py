from odoo import fields, models, api
from odoo.exceptions import AccessError, ValidationError
import datetime

class school_system_employees(models.Model):
    _inherit = 'hr.employee'

    date_from = fields.Date(string='Date from')
    date_from_10days = fields.Date(string='Date from 10 days', default=lambda self: self.date_from_10days_compute())
    date_to = fields.Date(string='Date to')
    age = fields.Integer(compute ='calculate_age', string='Age')

    employee_id = fields.Many2one(comodel_name='hr.employee', string='ID')

    @api.constrains('date_from', 'date_to', 'birthday')
    def _employee_constrains(self):
        if not self.date_from or not self.date_to or not self.birthday:
            raise ValidationError("You've left some fields empty.")
        if self.cast_stringlist_to_int(self.date_to.split('-')) < self.cast_stringlist_to_int(self.date_from.split('-')):
            raise ValidationError("Date to can't be smaller than Date from.")

    @api.depends('birthday')
    def calculate_age(self):
        if self.birthday:
            current_date = self.cast_stringlist_to_int(str(datetime.datetime.now().date()).split('-'))
            birthday = self.cast_stringlist_to_int(str(self.birthday).split('-'))
            self.age = current_date[0] - birthday[0]

    @api.onchange('employee_id')
    def _onchange_employee_id(self):
        if self.employee_id:
            self.department_id = self.employee_id.department_id
            self.mobile_phone = self.employee_id.mobile_phone
            self.work_phone = self.employee_id.work_phone
            self.name = self.employee_id.name

    def cast_stringlist_to_int(self, list):
        result = []
        for value in list:
            result.append(int(value))
        return result

    def date_from_10days_compute(self):
        return datetime.datetime.now().date().replace(day=datetime.datetime.now().date().day-10)