const request = require('supertest');
const fs = require('fs');
import BaseModel from "~/models/BaseModel";
import app from "~/index";
import path from "path";
import tableConstants from '~/constants/tableConstants'



const baseModel = new BaseModel();

let lastId = '';

describe('api test suite', () => {
    let uploadedFileName = '';

    const newProduct = {
        "name":"NewProduct02",
        "price":"750"
    }

    const updatedData =     {
        "name":"ProductNameUpdated",
        "price":"510"
    }

    beforeAll(async () => {
        // insert product
        console.log('before-all hook');
        const response = await request(app).post("/v1/product/create").send(newProduct);
        const lastInserted = await baseModel.getLastInsertedId('user_products'); // Getting last inserted product.
        lastId = lastInserted[0].id;
        expect(response.body).not.toBeNull();
        expect(response.body).toHaveProperty(['data'],{"p_name": "NewProduct02", "price": 750});
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchSnapshot(); // Take an snapshot
    });
    
    afterAll(async () => {
        // clear product_images tbl after all test cases executed.
        const res = baseModel.truncateTable(tableConstants.USERS_PRODUCT_IMAGES);
        // Unlinking the uploaded file.
        fs.unlink(uploadedFileName, (err)=>{
            if(err) throw err;
            console.log('Uploaded file deleted');
        }) 
        console.log(uploadedFileName);
        const lastInserted = await baseModel.getLastInsertedId('user_products');
        const lastObjDeleted = await baseModel.deleteObj({'id':lastInserted[0].id},'user_products');
        expect(lastObjDeleted).not.toBeNull();
        expect(lastObjDeleted).toBe(1);
        expect(lastObjDeleted).not.toBeFalsy();
    })

    it('tests /updateProduct/:id endpoints', async() => {
        const response = await request(app).put(`/v1/product/updateProduct/${lastId}`).send(updatedData);
        const rspData = response.body;
        expect(rspData).toHaveProperty('message');
        expect(rspData).not.toHaveProperty('message',null);
        expect(typeof rspData.message).toBe("string");
        expect(rspData.message).toMatch("Product updated successfully!");
        expect(response.body).not.toBeNull();
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchSnapshot(); // Take an snapshot
    })

    it('tests /get-all endpoints', async() => {
        const response = await request(app).get("/v1/product/get-all");
        const rspData = response.body.data[0];
        expect(rspData).toHaveProperty('id');
        expect(rspData).not.toHaveProperty('id',null);
        expect(rspData).toHaveProperty('p_name');
        expect(rspData).not.toHaveProperty('p_name',null);
        expect(rspData).toHaveProperty('price');
        expect(rspData).not.toHaveProperty('price',null);
        expect(rspData).toHaveProperty('status');
        expect(rspData).not.toHaveProperty('status',null);
        expect(typeof rspData.status).toBe("number");
        expect(rspData).toHaveProperty('created_at');
        expect(rspData).not.toHaveProperty('created_at',null);
        expect(rspData).toHaveProperty('updated_at');
        expect(response.body).not.toBeNull();
        expect(response.body).toEqual(expect.arrayContaining([]));
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchSnapshot(); // Take an snapshot
    });

    it('tests /get/:id endpoints', async() => {
        const response = await request(app).get(`/v1/product/get/${lastId}`);
        expect(response.body).not.toBeNull();// to check null response body
        expect(response.body).toHaveProperty(['status'],"success");
        expect(response.body).toHaveProperty(['message'],"Product fetched successfully!");
        const rspData = response.body.data;
        expect(rspData).toHaveProperty('p_name');
        expect(rspData).not.toHaveProperty('p_name',null);
        expect(rspData).toHaveProperty('created_at');
        expect(rspData).not.toHaveProperty('created_at',null);
        expect(rspData).toHaveProperty('id');
        expect(rspData).toHaveProperty('price');
        expect(rspData).not.toHaveProperty('price',null);
        expect(typeof rspData.price).toBe("string");
        expect(rspData).toHaveProperty('status');
        expect(typeof rspData.status).toBe("number");
        expect(rspData).toHaveProperty('updated_at');
        expect(rspData).not.toHaveProperty('updated_at',null);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([]));
        expect(response.body).toMatchSnapshot(); // Take an snapshot
    });

    // it('tests /deleteProduct/:id endpoints', async() => {
    //     const response = await request(app).delete(`/v1/product/deleteProduct/${lastId}`);
    //     const rspData = response.body;
    //     expect(rspData).toHaveProperty('message');
    //     expect(rspData).not.toHaveProperty('message',null);
    //     expect(typeof rspData.message).toBe("string");
    //     expect(rspData.message).toMatch("Product deleted successfully!");
    //     expect(typeof rspData.data).not.toBeNull();
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toMatchSnapshot(); // Take an snapshot
    // });

    // JEST --updateSnapshot
    
    it('tests /product/uploadImage endpoints', async () => {

        // Before attaching the file we need to convert it into the image-buffer.
        const imageBuffer = fs.readFileSync(path.join(process.cwd(),'src/__test__/testFiles/testImage.png'));
        
        const res = await request(app)
            .post('/v1/product/uploadImage')
            .set('Content-Type', 'multipart/form-data') // Set content-type is optional
            .field({'name':'Test name', 'age':'20'}) // Send request body for additional data
            .attach('image', imageBuffer,'testImage.png'); // Plz pass the image name with extension as 3rs param
          
        expect(res.statusCode).toEqual(200);
        expect(res.statusCode).not.toEqual(400);
        expect(res.body.message).toEqual('File uploaded successfully');

        uploadedFileName = res.body.data.image_path;
        
    });

});