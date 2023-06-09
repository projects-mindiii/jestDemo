// This test file will only be use for initial config.
import path from "path";
import {LocalStorage} from "node-localstorage";



describe('Initial test configuration',()=>{
    test('setting-up test configuration',()=>{
        // constructor function to create a storage directory inside our project for test cases.
        var localStorage = new LocalStorage(path.join(__dirname,'localStorage'));
        // Setting localStorage Item.
        localStorage.setItem('apiHeader', JSON.stringify(
            [{'header1':
                        {'device-id': 'deviceId',
                         'device-type': '1',
                         'device-token': 'fdfdfdsfdsssupdated',
                         'api-key': 'FwD0063eK9muZzPkMvkzE43ddsf'
                        },
              'header2':{
                        'device-id2': 'deviceId',
                        'device-type2': '1',
                        'device-token2': 'fdfdfdsfdsssupdated',
                        'api-key2': 'FwD0063eK9muZzPkMvkzE43ddsf'
                        }          
            }]
        ));
        const headerData = localStorage.getItem('apiHeader');
        const parsedData = JSON.parse(headerData);
        console.log(parsedData[0].header);
        console.log(path.join(__dirname,'testLocalStorage'));

    })
});
