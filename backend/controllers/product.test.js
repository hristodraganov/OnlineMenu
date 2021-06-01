const request = require('supertest')
const { app } = require('../server')
jest.setTimeout(30000)
beforeAll(done => {
    done()
})
describe('POST /product/add', () => {
    describe('given data for product to be added', () => {
        test('should respond with 201 status code', async () => {
            const response = await request(app).post('/product/add').send({
                name: 'test',
                category: "Food",
                subCategory: 'Salads',
                description: 'test description',
                alergens: "testal1, testal2",
                price: 1,
                imageName: 'test.jpg'
            })
            expect(response.statusCode).toBe(201)
        })

    })
})
describe('GET /product/get', () => {
    describe('getting all products', () => {
        test('should respond with 201 status code', async () => {
            const response = await request(app).get('/product/get')
            expect(response.statusCode).toBe(201)
        })
        test("should specify json in the content type header", async () => {
            const response = await request(app).get('/product/get')
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("response has products", async () => {
            const response = await request(app).get('/product/get')
            expect(response.body.data.products).toBeDefined()
        })
    })
})
describe('GET /product/get/:sub_category', () => {
    describe('getting products by subcategory', () => {
        let subcategory = 'Wine'
        test('should respond with 201 status code', async () => {
            const response = await request(app).get(`/product/get/${subcategory}`)
            expect(response.statusCode).toBe(201)
        })
        test("should specify json in the content type header", async () => {
            const response = await request(app).get(`/product/get/${subcategory}`)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("response has products", async () => {
            const response = await request(app).get(`/product/get/${subcategory}`)
            expect(response.body.data.products).toBeDefined()
        })
    })
})
describe('GET /product/get/names/:sub_category', () => {
    describe('getting product names by category', () => {
        let subcategory = 'Sushi'
        test('should respond with 201 status code', async () => {
            const response = await request(app).get(`/product/get/names/${subcategory}`)
            expect(response.statusCode).toBe(201)
        })
        test("should specify json in the content type header", async () => {
            const response = await request(app).get(`/product/get/names/${subcategory}`)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("response has products", async () => {
            const response = await request(app).get(`/product/get/names/${subcategory}`)
            expect(response.body.data.products).toBeDefined()
        })
    })
})
describe('GET /product/get/one/:productName', () => {
    describe('getting one product by name', () => {
        let name = 'Sushi 2'
        test('should respond with 201 status code', async () => {
            const response = await request(app).get(`/product/get/one/${name}`)
            expect(response.statusCode).toBe(201)
        })
        test("should specify json in the content type header", async () => {
            const response = await request(app).get(`/product/get/one/${name}`)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("response has product", async () => {
            const response = await request(app).get(`/product/get/one/${name}`)
            expect(response.body.data.product).toBeDefined()
        })
    })
})
describe('PUT /product/update', () => {
    describe('updating product', () => {
        test('should respond with 201 status code', async () => {
            const response = await request(app).put('/product/update').send({
                name: 'Sushi test 1',
                oldProductName: 'Sushi 1',
                description: 'test description',
                alergens: "testal1, testal2",
                price: 1,
                imageName: 'test.jpg'
            })
            expect(response.statusCode).toBe(201)
        })
        test("should specify json in the content type header", async () => {
            const response = await request(app).put('/product/update')
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
})
describe('DELETE /product/delete/:item', () => {
    describe('deleting product', () => {
        const name = 'Sushi 1'
        test('should respond with 201 status code', async () => {
            const response = await request(app).delete(`/product/delete/${name}`)
            expect(response.statusCode).toBe(201)
        })
        test("should specify json in the content type header", async () => {
            const response = await request(app).delete(`/product/delete/${name}`)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
})
afterAll(done => {
    done()
})