const request = require('supertest')
const { app } = require('../server')
jest.setTimeout(30000)
beforeAll(done => {
    done()
})
describe('POST /subcategory/add', () => {
    describe('given subcategory name and image and category name', () => {
        test('should respond with 201 status code', async () => {
            const response = await request(app).post('/subCategory/add').send({
                name: 'test',
                category: "Food",
                imageName: 'test.jpg'
            })
            expect(response.statusCode).toBe(201)
        })
    })
})
describe('GET /subcategory/get', () => {
    describe('getting all subcategories', () => {
        test('should respond with 201 status code', async () => {
            const response = await request(app).get('/subCategory/get')
            expect(response.statusCode).toBe(201)
        })
        test("should specify json in the content type header", async () => {
            const response = await request(app).get('/subCategory/get')
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("response has subcategories", async () => {
            const response = await request(app).get('/subCategory/get')
            expect(response.body.data.sub_categories).toBeDefined()
        })
    })
})
describe('GET /subcategory/get/:group', () => {
    describe('getting single subcategory by category', () => {
        let category = 'Food'
        test('should respond with 201 status code', async () => {
            const response = await request(app).get(`/subCategory/get/${category}`)
            expect(response.statusCode).toBe(201)
        })
        test("should specify json in the content type header", async () => {
            const response = await request(app).get(`/subCategory/get/${category}`)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("response has subcategories", async () => {
            const response = await request(app).get(`/subCategory/get/${category}`)
            expect(response.body.data.sub_category).toBeDefined()
        })
    })
})
describe('GET /subcategory/get/name/:name', () => {
    describe('getting subcategories by category', () => {
        let name = 'Food'
        test('should respond with 201 status code', async () => {
            const response = await request(app).get(`/subCategory/get/names/${name}`)
            expect(response.statusCode).toBe(201)
        })
        test("should specify json in the content type header", async () => {
            const response = await request(app).get(`/subCategory/get/names/${name}`)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        test("response has subcategories", async () => {
            const response = await request(app).get(`/subCategory/get/names/${name}`)
            expect(response.body.data.sub_categories).toBeDefined()
        })
    })
})
describe('DELETE /subcategory/delete/:item', () => {
    describe('deleting subcategory', () => {
        const name = 'test'
        test('should respond with 201 status code', async () => {
            const response = await request(app).delete(`/subCategory/delete/${name}`)
            expect(response.statusCode).toBe(201)
        })
        test("should specify json in the content type header", async () => {
            const response = await request(app).delete(`/subCategory/delete/${name}`)
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
})
afterAll(done => {
    done()
})