const orders = require('./orderTest'),
    ordersTest = orders.run;
const reports = require('./reportsTest'),
    reportsTest = reports.run;
const ordersQuery = require('./ordersQueryTest'),
    ordersQueryTest = ordersQuery.run;

let script_args = process.argv.slice(2);
let test_type = script_args.indexOf("type");
if (test_type > -1 && script_args[test_type + 1])
    test_type = script_args[test_type + 1];


const execute = async () => {
    switch (test_type) {
        case 'orders':
            await ordersTest(script_args)
            break;
        case 'reports':
            await reportsTest(script_args)
            break;
        case 'ordersquery':
            await ordersQueryTest(script_args)
            break;
        default:
            console.log('TEST TYPE MUST BE ONE OF THE FOLLOWING: orders | reports | ordersquery');
            console.log('TO RUN ALL DO NOT SPECIFY type PARAMETER');
            process.exit(1)
    }
}
execute()