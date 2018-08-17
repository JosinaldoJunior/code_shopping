import { FieldsOptions } from "../../../../common/fields-options";

const fieldsOptions : FieldsOptions = {
        name: {
            id: 'name',
            label: 'Nome',
        },
        description: {
            id: 'description',
            label: 'Descrição',
        },
        price: {
            id: 'price',
            label: 'Preço',
            validationMessage: {
                min: 1
            }
        }, 
        active: {
            id: 'active',
            label: 'Ativo?',
        }
};

export default fieldsOptions;