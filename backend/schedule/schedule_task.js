var schedule = require('node-schedule');

//测试用方法

function everySecond() {
    let arr = [], i
    for (i = 0; i++; i < 60) {
        arr.push(i)
    }
    return arr
}


let rule_of_task_1 = new schedule.RecurrenceRule();
// rule_of_task_1.hour = 2;
rule_of_task_1.second = [0,5,10,15,20,25,30,35,40,45,50,55];
const task_1 = schedule.scheduleJob(rule_of_task_1, function () {//该定时任务负责重新修改密码加密的任务
    console.log(Date.now())
})