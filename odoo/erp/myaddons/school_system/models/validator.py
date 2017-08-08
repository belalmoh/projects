from odoo.exceptions import AccessError, ValidationError

class validator:

    @staticmethod
    def isEmpty(**vals):
        errorMessage = []
        for key, val in vals.iteritems():
            if val == '' or not val:
                errorMessage.append(key)

        if len(errorMessage):
            raise ValidationError("You are missing %s." % (errorMessage))