export function addAccountItem(newItem){
    console.log("call accounts-keeper api");
}
export function getAccountsData(startDate, endDate){
    console.log(`startDate :${startDate} ,endDate :${endDate}`  );
    return [{consumption: "西瓜", amount: 200, date: "2020-07-01", key: 1594476315614},
            {consumption: "電視", amount: 50000, date: "2020-07-02", key: 1594476327571},
            {consumption: "盆栽", amount: 250, date: "2020-07-14", key: 1594476348800},
            {consumption: "青菜", amount: 300, date: "2020-07-15", key: 1594476369020},
            {consumption: "午餐", amount: 150, date: "2020-07-19", key: 1594476383598}];
}