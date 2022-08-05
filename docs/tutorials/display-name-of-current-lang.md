## Display the name  

we have two methods to display the name of the field

---

### auto display 
when you write to a field the system should fill other fields automatically
based on the value you entered and auto display function config 

> How doses autoDisplay function work?
1. we set a lister to that field
2. when the field changes set the value loading
3. send to get the value from the server 
4. then display it 

**API** 

In the component did mount method you call the auto display function
with some config information tell the function about the names of fields we deal with 

example 
``` javascript
    const config = {
      main: {
        d: { recordProp: "province_d_name", stateProp: "province_no_d_name" },
        f: { recordProp: "province_f_name", stateProp: "province_no_f_name" },
      },
      others: [
        {
          d: {
            recordProp: "country_no_d_name",
            stateProp: "country_no_d_name",
          },
          f: {
            recordProp: "country_no_f_name",
            stateProp: "country_no_f_name",
          },
        },
        {
          d: { recordProp: "country_no", stateProp: "country_no" },
          f: { recordProp: "country_no", stateProp: "country_no" },
        },
      ],
    };
    autoDisplayModel.call(this, "province_no", "province", config);
```
- the auto Display model works behind the sense by using FieldsAutoDisplayer class so make sure that you init 
  an object form it called autoDisplayHandler 
- config object contain all the fields names that should be displayed automatically in the d and f mode 

___

### display the d_name or f_name according to the langNo

to solve this problem we change the field property name according to the langNO and by this way when the record is filled the name name will be shown according to the langNo

> How does this work?
1. using changeFieldPropNameAccordingToLanNo which is well documented 
2. isolate a method in the component responsible for calling that function
3. call that method in the componentDidMount 
4. call it in the componentDidUpdate in the condition of language changed

