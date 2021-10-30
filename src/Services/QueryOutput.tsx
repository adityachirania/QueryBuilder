import { queryBuilder } from '../Utils';
import { MyState } from '../Utils';

export async function getQueryOutput(props: MyState) {
    console.log(queryBuilder(props));
    console.log("Uncomment if connected to backend");
    // API Call can be made from here
    // await fetch('https://mywebsite.com/endpoint/', {
    // method: 'POST',
    // headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    // },
    // // Query String passed to get output 
    // body: queryBuilder(props),
    // })
    // .then(function(res) {
    //     return res;
    // })
    return "Dummy Query Output";
}