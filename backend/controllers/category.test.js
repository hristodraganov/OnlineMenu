const request = require('supertest')
const { app } = require('../server')
jest.setTimeout(30000)
beforeAll(done => {
    done()
})
describe('POST /category/add', () => {
    describe('given category name and category image name', () => {
        test('should respond with 201 status code', async () => {
            const response = await request(app).post('/category/add').send({
                name: 'test',
                imageName: 'test.jpg'
            })
            expect(response.statusCode).toBe(201)
        })
    })
})
describe('GET /category/get', () => {
    describe('getting categories', () => {
        test('should respond with 201 status code', async () => {
            const response = await request(app).get('/category/get')
            expect(response.statusCode).toBe(201)
        })
        test("should specify json in the content type header", async () => {
            const response = await request(app).get('/category/get')
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("response has categories", async () => {
            const response = await request(app).get('/category/get')
            expect(response.body.data.categories).toBeDefined()
        })
    })
})
describe('GET /category/get/names', () => {
    describe('getting categories names', () => {
        test('should respond with 201 status code', async () => {
            const response = await request(app).get('/category/get/names')
            expect(response.statusCode).toBe(201)
        })
        test("should specify json in the content type header", async () => {
            const response = await request(app).get('/category/get/names')
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("response has categories", async () => {
            const response = await request(app).get('/category/get/names')
            expect(response.body.data.categories).toBeDefined()
        })
    })
})
describe('DELETE /category/delete/:item', () => {
    describe('deleting category', () => {
        const name = 'test'
        test('should respond with 201 status code', async () => {
            const response = await request(app).delete(`/category/delete/${name}`)
            expect(response.statusCode).toBe(201)
        })
        test("should specify json in the content type header", async () => {
            const response = await request(app).delete(`/category/delete/${name}`)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
})
afterAll(done => {
    done()
})