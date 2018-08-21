import { FieldsOptions } from "../../../../common/fields-options";

const fieldsOptions : FieldsOptions = {
        name: {
            id: 'name',
            label: 'Nome'
        },
        email: {
            id: 'email',
            label: 'E-mail'
        },
        password: {
            id: 'password',
            label: 'Senha',
            validationMessage: {
                minlength: 6
            }
        }
};

export default fieldsOptions;