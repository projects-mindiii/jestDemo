import path from "path";
import request from 'supertest';
import app from "../../../../index";
import {LocalStorage} from "node-localstorage";
import { type } from "os";


describe('Auth test suite',()=>{
  it('test middleware on empty header(case) /v1/login', async()=>{
    // constructor function to retrieve localStorage.
    var localStorage = new LocalStorage(path.join(process.cwd(),'src/__test__/localStorage'));
    console.log(JSON.parse(localStorage.getItem('apiHeader')));
        const headerData = {
            'device-id': '',
            'device-type': '',
            'device-token': '',
            'api-key': ''
        }
        const response = await request(app).post("/v1/login/").set(headerData).send();
        const rspData = response.body;
        expect(rspData).toHaveProperty('status');
        expect(rspData).toHaveProperty('status','fail');
        expect(rspData).toHaveProperty('message');
        expect(rspData).toHaveProperty('message','Header is missing.');
        expect(rspData).toHaveProperty('data');
        expect(rspData).toHaveProperty('data','');
        expect(rspData).toHaveProperty('status_code');
        expect(rspData).toHaveProperty('status_code',400);
        expect(rspData).not.toHaveProperty('status_code',200);
        expect(response.body).toMatchSnapshot();
        const apiHeader = localStorage.getItem('apiHeader');
        const storedApiHeader = JSON.parse(apiHeader);
        storedApiHeader.push({'accessToken':'fdsferewedxxxdfweress'});
        localStorage.setItem('apiHeader',JSON.stringify(storedApiHeader));

  });

  it('test middleware on invalid header(case) /v1/login', async()=>{

    const headerData = {
        'device-id': 'dummyid',
        'device-type': '',
        'device-token': '',
        'api-key': ''
    }
    const response = await request(app).post("/v1/login/").set(headerData).send();
    const rspData = response.body;
    expect(rspData).toHaveProperty('status');
    expect(rspData).toHaveProperty('status','fail');
    expect(rspData).toHaveProperty('message');
    expect(rspData).toHaveProperty('message','Header is missing.');
    expect(rspData).toHaveProperty('data');
    expect(rspData).toHaveProperty('data','');
    expect(rspData).toHaveProperty('status_code');
    expect(rspData).toHaveProperty('status_code',400);
    expect(rspData).not.toHaveProperty('status_code',200);
    expect(response.body).toMatchSnapshot();
  });

  it('test middleware on invalid device-type header(case-2) /v1/login', async()=>{

    const headerData = {
        'device-id': 'dummyid',
        'device-type': '5',
        'device-token': 'dummytoken',
        'api-key': 'FwD0063eK9muZzPkMvkzE43ddsf'
    }
    const response = await request(app).post("/v1/login/").set(headerData).send();
    const rspData = response.body;
    expect(rspData).toHaveProperty('status');
    expect(rspData).toHaveProperty('status','fail');
    expect(rspData).toHaveProperty('message');
    expect(rspData).toHaveProperty('message','Device type not allowed');
    expect(rspData).toHaveProperty('data');
    expect(rspData).toHaveProperty('data','');
    expect(rspData).toHaveProperty('status_code');
    expect(rspData).toHaveProperty('status_code',400);
    expect(rspData).not.toHaveProperty('status_code',200);
    expect(response.body).toMatchSnapshot();
  });

  it('test middleware on invalid api-key header(case-3) /v1/login', async()=>{

    const headerData = {
        'device-id': 'dummyid',
        'device-type': '1',
        'device-token': 'dummytoken',
        'api-key': 'invalidAPIkey'
    }
    const response = await request(app).post("/v1/login/").set(headerData).send();
    const rspData = response.body;
    expect(rspData).toHaveProperty('status');
    expect(rspData).toHaveProperty('status','fail');
    expect(rspData).toHaveProperty('message');
    expect(rspData).toHaveProperty('message','Invalid Api Key');
    expect(rspData).toHaveProperty('data');
    expect(rspData).toHaveProperty('data','');
    expect(rspData).toHaveProperty('status_code');
    expect(rspData).toHaveProperty('status_code',401);
    expect(rspData).not.toHaveProperty('status_code',200);
    expect(response.body).toMatchSnapshot();
  });

  it('test request body required params1 /v1/login', async()=>{
  
    const headerData = {
        'device-id': 'dummyid',
        'device-type': '1',
        'device-token': 'dummytoken',
        'api-key': 'FwD0063eK9muZzPkMvkzE43ddsf'
    }
    const response = await request(app).post("/v1/login/").set(headerData).send();
    const rspData = response.body;
    expect(rspData).toHaveProperty('status');
    expect(rspData).toHaveProperty('status','fail');
    expect(rspData).toHaveProperty('message');
    expect(rspData.message).toBe("must have required property 'email'");
    expect(rspData).toHaveProperty('data');
    expect(rspData).toHaveProperty('status_code');
    expect(rspData).toHaveProperty('status_code',400);
    expect(rspData).not.toHaveProperty('status_code',200);
    expect(response.body).toMatchSnapshot();
  });

  it('test request body required params2 /v1/login', async()=>{
  
    const headerData = {
        'device-id': 'dummyid',
        'device-type': '1',
        'device-token': 'dummytoken',
        'api-key': 'FwD0063eK9muZzPkMvkzE43ddsf'
    }
    // test password param
    const requestBody = {
        email:'deepakkalme.mindiii@gmail.com'
    }
    const response = await request(app).post("/v1/login/").set(headerData).send(requestBody);
    const rspData = response.body;
    expect(rspData).toHaveProperty('status');
    expect(rspData).toHaveProperty('status','fail');
    expect(rspData).toHaveProperty('message');
    expect(rspData.message).toBe("must have required property 'password'");
    expect(rspData).toHaveProperty('data');
    expect(rspData).toHaveProperty('status_code');
    expect(rspData).toHaveProperty('status_code',400);
    expect(rspData).not.toHaveProperty('status_code',200);
    expect(response.body).toMatchSnapshot();

    // test email param
    const requestBody2 = {
        password:'testpassword'
    }
    const response2 = await request(app).post("/v1/login/").set(headerData).send(requestBody2);
    const rspData2 = response2.body;
    expect(rspData2).toHaveProperty('status');
    expect(rspData2).toHaveProperty('status','fail');
    expect(rspData2).toHaveProperty('message');
    expect(rspData2.message).toBe("must have required property 'email'");
    expect(rspData2).toHaveProperty('data');
    expect(rspData2).toHaveProperty('status_code');
    expect(rspData2).toHaveProperty('status_code',400);
    expect(rspData2).not.toHaveProperty('status_code',200);
    expect(response2.body).toMatchSnapshot();
  });

  it('test invalid credentials /v1/login', async()=>{
  
    const headerData = {
        'device-id': 'dummyid',
        'device-type': '1',
        'device-token': 'dummytoken',
        'api-key': 'FwD0063eK9muZzPkMvkzE43ddsf'
    }
    // test password param
    const requestBody = {
        email:'deepakkalme.mindiii@gmail.com',
        password:'#Test333'
    }
    const response = await request(app).post("/v1/login/").set(headerData).send(requestBody);
    const rspData = response.body;
    expect(rspData).toHaveProperty('status');
    expect(rspData).toHaveProperty('status','fail');
    expect(rspData).toHaveProperty('message');
    expect(rspData.message).toBe("Internal Server Error");
    expect(rspData).toHaveProperty('data');
    expect(rspData).toHaveProperty('status_code');
    expect(rspData).toHaveProperty('status_code',500);
    expect(rspData).not.toHaveProperty('status_code',200);
    expect(response.body).toMatchSnapshot();
  });

})