export const label = {
            label_code:{
                inputType: "text",
                label: "label_code",
                validation: {
                    requiered: true,
                    length: 30
                },
                valid: true,
                writability: true,
                value: "",
                pk: true
            },
            label_desc:{
                inputType: "text",
                label: "label_desc",
                validation: {
                    requiered: true,
                    length: 200
                },
                valid: true,
                writability: true,
                value: ""
            },
            lang_no:{
                inputType: "text&select",
                label: "lang_no",
                validation: {
                    requiered: true
                },
                valid: true,
                writability: true,
                value: "",
                type: "number"
            },
            lang_no_name:{
                inputType: "text",
                label: "name",
                validation: {
                    requiered: true
                },
                writability: true,     
                readOnly: true,           
                value: ""
            }
}

