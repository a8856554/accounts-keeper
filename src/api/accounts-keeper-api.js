import axios from 'axios';

// Develop server URL
 const postBaseUrl = 'http://localhost:3001/api';

export function addAccountItem(newItem){
    let url = `${postBaseUrl}/posts`;

    console.log(`Making POST request to: ${url}`);
    
    return axios.post(url, {
        ...newItem
    }).then(function(res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
export function getAccountsData(startDate, endDate){
    console.log(`startDate :${startDate} ,endDate :${endDate}`  );
    /*
    return [{consumption: "西瓜", amount: 200, date: "2020-07-01", tag: "", key: 1594476315614},
            {consumption: "電視", amount: 50000, date: "2020-07-02", tag: "", key: 1594476327571},
            {consumption: "盆栽", amount: 250, date: "2020-07-14", tag: "", key: 1594476348800},
            {consumption: "青菜", amount: 300, date: "2020-07-15", tag: "", key: 1594476369020},
            {consumption: "午餐", amount: 150, date: "2020-07-19", tag: "", key: 1594476383598}];*/
    let url = `${postBaseUrl}/posts`;
    let query = [];
    if (startDate)
        query.push(`startDate=${startDate}`);
    if (endDate)
        query.push(`endDate=${endDate}`);
    if (query.length)
        url += '?' + query.join('&');
        
    console.log(`Making GET request to: ${url}`);
    
    return axios.get(url).then(
        function onfullfilled(res) {
            if (res.status !== 200){
                throw new Error(`Unexpected response code: ${res.status}`);
            }
            /*
            res.data.forEach(element => {
                console.log(element);
            });*/
            return res.data;
        }
    ).catch(function(err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
    
}