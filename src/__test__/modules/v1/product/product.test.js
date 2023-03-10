const request = require('supertest');
import BaseModel from "../../../../models/BaseModel";
import app from "../../../../index";

const baseModel = new BaseModel();

describe('api test suite', () => {
    
    const newProduct = {
        "name":"NewProduct02",
        "price":"750"
    }

    const updatedData = {
        "name":"ProductNameUpdated",
        "price":"510"
    }

    beforeAll(async () => {
        // insert product
        console.log('before-all hook');
        const response = await request(app).post("/v1/product/create").send(newProduct);
        expect(response.body).not.toBeNull();
        expect(response.body).toHaveProperty(['data'],{"p_name": "NewProduct02", "price": 750});
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchSnapshot(); // Take an snapshot
    });
    
    afterAll(async () => {
        // clear product tbl after all test cases executed.
        console.log('after-all hook');
        const res = baseModel.truncateTable('user_products');
    })

    it('tests /updateProduct/:id endpoints', async() => {
        const response = await request(app).put("/v1/product/updateProduct/1").send(updatedData);
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
        const response = await request(app).get("/v1/product/get/1");
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

    it('tests /deleteProduct/:id endpoints', async() => {
        const response = await request(app).delete("/v1/product/deleteProduct/1");
        const rspData = response.body;
        expect(rspData).toHaveProperty('message');
        expect(rspData).not.toHaveProperty('message',null);
        expect(typeof rspData.message).toBe("string");
        expect(rspData.message).toMatch("Product deleted successfully!");
        expect(typeof rspData.data).not.toBeNull();
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchSnapshot(); // Take an snapshot
    });

    // JEST --updateSnapshot

});