const request = require('supertest')
const { app } = require('../../server')
jest.setTimeout(30000)
beforeAll(done => {
    done()
})

describe('GET /get/overall/product/income', () => {
    describe('getting overall income by products', () => {
        test('should respond with 201 status code', async () => {
            const response = await request(app).get('/statistics/get/overall/product/income')
            expect(response.statusCode).toBe(201)
        })
        test("should specify json in the content type header", async () => {
            const response = await request(app).get('/statistics/get/overall/product/income')
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("response has products", async () => {
            const response = await request(app).get('/statistics/get/overall/product/income')
            expect(response.body.data.products).toBeDefined()
        })
    })
})
describe('GET /get/overall/:category', () => {
    describe('getting overall income by products', () => {
        let category = 'Food'
        test('should respond with 201 status code', async () => {
            const response = await request(app).get(`/statistics/get/overall/${category}`)
            expect(response.statusCode).toBe(201)
        })
        test("should specify json in the content type header", async () => {
            const response = await request(app).get(`/statistics/get/overall/${category}`)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("response has products", async () => {
            const response = await request(app).get(`/statistics/get/overall/${category}`)
            expect(response.body.data.info).toBeDefined()
        })
    })
})

afterAll(done => {
    done()
})