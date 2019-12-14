const db = require('../database/dbConfig')
const req = require('supertest')

const server = require('../api/server')
const generateToken = require('../auth/auth-router')



describe('POST /api/auth/register ', ()=>{
    it('will return 201 on registration of a /GOOD/ user', async ()=>{
        //first.. have to register a user..
        const mock_user = {
            'username':'donkey_kong',
            'password':'BiggestBananas'
        }
        const register = await req(server).post('/api/auth/register').send(mock_user)
        expect(register.status).toBe(201)

    })
    it('can register a user to the database', async ()=>{
        const mock_user = {
            'username':'donkey_kong',
            'password':'BiggestBananas'
        }
        const register = await req(server).post('/api/auth/register').send(mock_user)
        expect(register.body).toEqual({ confirm: 'users has been created'})

    })
})
describe('POST /api/auth/login ', async()=>{
    it('will return 200 on login of a user', async ()=>{
        //first.. have to register a user..
        const mock_user = {
            'username':'donkey_kong',
            'password':'BiggestBananas'
        }
        const register = await req(server).post('/api/auth/register').send(mock_user)
        expect(register.status).toBe(201)

    })
    it('can login a user to the database', async ()=>{

        const mock_user ={
            "username":"IronPatriot",
            "password":"IamIronPatriot"
        }

        let res = await req(server).post('/api/auth/register').send(mock_user)
        expect(res.body).toEqual({ confirm: 'users has been created'})

        const mock_login = {
            "username":"IronPatriot",
            "password":"IamIronPatriot"
        }
        
        res = await req(server).post('/api/auth/login').send(mock_login) 
        const token = res.body.token
        expect(token.length).toBeGreaterThan(10)
    })
})


describe('get /api/jokes ', ()=>{
    it('will return 200 after login of a user and get of jokes', async ()=>{
        //first.. have to register a user..
        const mock_user ={
            "username":"IronPatriot",
            "password":"IamIronPatriot"
        }

        let res = await req(server).post('/api/auth/register').send(mock_user)
        expect(res.body).toEqual({ confirm: 'users has been created'})

        const mock_login = {
            "username":"IronPatriot",
            "password":"IamIronPatriot"
        }
        
        res = await req(server).post('/api/auth/login').send(mock_login) 
        const token = res.body.token
        expect(token.length).toBeGreaterThan(10)
        res = await req(server).get('/api/jokes').set('Authorization',token)
        expect(res.status).toBe(200)
    })
    it('after login... user can see the jokes', async ()=>{

        const mock_user ={
            "username":"IronPatriot",
            "password":"IamIronPatriot"
        }

        let res = await req(server).post('/api/auth/register').send(mock_user)
        expect(res.body).toEqual({ confirm: 'users has been created'})

        const mock_login = {
            "username":"IronPatriot",
            "password":"IamIronPatriot"
        }
        
        res = await req(server).post('/api/auth/login').send(mock_login) 
        const token = res.body.token
        expect(token.length).toBeGreaterThan(10)
        res = await req(server).get('/api/jokes').set('Authorization',token)
        expect(res.body.length).toBeGreaterThan(0)
    })
})


jest.setTimeout(30000);

beforeEach(async () => {
    // this function executes and clears out the table before each test
    await db('users').truncate();
  });