export const label = {
            label_code:{
                fieldType: "input",
                type: "text",
                label: "label_code",
                validation: {
                    requiered: true,
                    length: 30
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: true,
                value: "",
                pk: true
            },
            label_desc:{
                fieldType: "input",
                type: "text",
                label: "label_desc",
                validation: {
                    requiered: true,
                    length: 200
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: true,
                value: ""
            },
            lang_no:{
                fieldType: "select",
                type: "number",
                label: "lang_no",
                validation: {
                    requiered: true
                },
                validity: {
                    valid: true,
                    touched: false,
                    message: null
                },
                writability: true,
                value: "",
            },
            lang_no_name:{
                fieldType: "input",
                type: "text",
                label: "name",
                validation: {
                    requiered: false
                },
                writability: true,     
                readOnly: true,           
                value: ""
            }
}

