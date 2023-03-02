const request = require('supertest');
import app from "../../../../index";

describe('api test suite', () => {
    
    const newProduct = {
        "name":"NewProduct02",
        "price":"750"
    }

    beforeAll(async () => {
        // insert product
        const response = await request(app).post("/v1/product/create").send(newProduct);
        expect(response.body).not.toBeNull();
        expect(response.body).toHaveProperty(['data'],{"p_name": "NewProduct02", "price": 750});
        expect(response.statusCode).toBe(200);
    });
    
    afterAll(async () => {
        // clear product tbl
        // const response = await request(app).delete("/v1/product/deleteProduct/1");
        // expect(response.statusCode).toBe(200);
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
        expect(rspData).toHaveProperty('updated_at',null);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([]));
    });

});