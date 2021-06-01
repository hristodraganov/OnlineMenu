const request = require('supertest')
const { app } = require('../server')
jest.setTimeout(30000)
beforeAll(done => {
    done()
})
describe('POST /orders/post', () => {
    describe('given data for an order to be added', () => {
        test('should respond with 201 status code', async () => {
            const response = await request(app).post('/orders/post').send({
                date: '2021-04-17 20:02:29',
                table: 1,
                cart: [{ name: "Sushi 1", price: "18", quantity: 2 }, { name: "Sushi 2", price: "15", quantity: 1 }]
            })
            expect(response.statusCode).toBe(201)
        })
    })
})
describe('GET /orders/get/all', () => {
    describe('getting all orders', () => {
        test('should respond with 201 status code', async () => {
            const response = await request(app).get('/orders/get/all')
            expect(response.statusCode).toBe(201)
        })
        test("should specify json in the content type header", async () => {
            const response = await request(app).get('/orders/get/all')
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("response has orders", async () => {
            const response = await request(app).get('/orders/get/all')
            expect(response.body.data.orders).toBeDefined()
        })
    })
})
describe('GET /orders/get/byTable/:table', () => {
    describe('getting orders by table', () => {
        let table = 1
        test('should respond with 201 status code', async () => {
            const response = await request(app).get(`/orders/get/byTable/${table}`)
            expect(response.statusCode).toBe(201)
        })
        test("should specify json in the content type header", async () => {
            const response = await request(app).get(`/orders/get/byTable/${table}`)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("response has orders", async () => {
            const response = await request(app).get(`/orders/get/byTable/${table}`)
            expect(response.body.data.orders).toBeDefined()
        })
    })
})
describe('GET /orders/get/byDate/:from/:to', () => {
    describe('getting orders by date range', () => {
        let from = '2021-04-17 20:02:29'
        let to = '2021-05-31 11:01:20'
        test('should respond with 201 status code', async () => {
            const response = await request(app).get(`/orders/get/byDate/${from}/${to}`)
            expect(response.statusCode).toBe(201)
        })
        test("should specify json in the content type header", async () => {
            const response = await request(app).get(`/orders/get/byDate/${from}/${to}`)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("response has orders", async () => {
            const response = await request(app).get(`/orders/get/byDate/${from}/${to}`)
            expect(response.body.data.orders).toBeDefined()
        })
    })
})

afterAll(done => {
    done()
})