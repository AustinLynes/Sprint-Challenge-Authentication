const db = require('../database/dbConfig')
const req = require('supertest')

const server = require('../api/server')
// const generateToken = require('../auth/auth-router')



describe('POST /api/auth/register ', () => {
    //first.. have to register a user..
    it('will return 201 on registration of a /GOOD/ user', async () => {
        //_mock_user will be the user data
        const mock_user = {
            'username': 'donkey_kong',
            'password': 'BiggestBananas'
        }
        //await on a response from a post request to the 'api/auth/register' endpoint with the given user info
        const register = await req(server).post('/api/auth/register').send(mock_user)
        //now I expect the status code of a successful add to be 201
        expect(register.status).toBe(201)

    })
    it('can register a user to the database', async () => {
        //_mock_user will be the user data
        const mock_user = {
            'username': 'donkey_kong',
            'password': 'BiggestBananas'
        }
        //await on a response from a post request to the 'api/auth/register' endpoint with the given user info
        const register = await req(server).post('/api/auth/register').send(mock_user)
        //expect the body of the response, called register in this case to Equal a json object with 
        //a confrirm messege that says users has been created
        expect(register.body).toEqual({ confirm: 'users has been created' })

    })
})

describe('POST /api/auth/login ', () => {
    it('will return 200 on login of a user', async () => {
        //first.. have to register a user..
        const mock_user = {
            'username': 'IronPatriot',
            'password': 'IamIronPatriot'
        }
        //await on a response from a post request to the 'api/auth/register' endpoint with the given user info
        let res = await req(server).post('/api/auth/register').send(mock_user)
        expect(res.status).toBe(201)
        //now that i have a user in the database i can login with my information... _mock_login will be my credentials...
        const mock_login = {
            "username": "IronPatriot",
            "password": "IamIronPatriot"
        }
        //await on a response from a post request to the 'api/auth/login' endpoint with the given credentials
        res = await req(server).post('/api/auth/login').send(mock_login)
        //now i expect the response to be 200 on a successfull Login
        expect(res.status).toBe(200)

    })
    it('can login a user to the database', async () => {
        //first... have to register a user..
        const mock_user = {
            "username": "IronPatriot",
            "password": "IamIronPatriot"
        }
        //await on a response from a post request to the 'api/auth/register' endpoint with the given user info
        let res = await req(server).post('/api/auth/register').send(mock_user)
        //make sure i did a good request.. 
        expect(res.status).toBe(201)
        // now that theres a user in the database.. we can use _mock_login_ to Log in
        const mock_login = {
            "username": "IronPatriot",
            "password": "IamIronPatriot"
        }
        //await on a response from a post request to the 'api/auth/login' endpoint with the given credentials
        res = await req(server).post('/api/auth/login').send(mock_login)
        //grab the expected token from the response...  using JWT 
        const token = res.body.token
        //now we expect the tokens length to be longer than 10 characters long...
        expect(token.length).toBeGreaterThan(10)

        // i counted getting the token as the user being signed in... further checks could go as...
        // check the token for the users username... to ensure that the the credentials are actually logging the user in.. 
        //
    })
})


describe('get /api/jokes ', () => {
    it('will return 200 after login of a user and get of jokes', async () => {
        //first.. have to register a user..
        const mock_user = {
            "username": "IronPatriot",
            "password": "IamIronPatriot"
        }
        //await on a response from a post request to the 'api/auth/register' endpoint with the given user info
        let res = await req(server).post('/api/auth/register').send(mock_user)
        //make sure i did a good request.. 
        expect(res.status).toBe(201)
        // now that theres a user in the database.. we can use _mock_login_ to Log in
        const mock_login = {
            "username": "IronPatriot",
            "password": "IamIronPatriot"
        }
        //await on a response from a post request to the 'api/auth/login' endpoint with the given credentials
        res = await req(server).post('/api/auth/login').send(mock_login)
        //grab the expected token from the response...  using JWT 
        const token = res.body.token
        //now we expect the tokens length to be longer than 10 characters long...
        expect(token.length).toBeGreaterThan(10)
        //await a response from a GET reqest to the 'api/jokes' endpoint with the token as Authorization headers
        res = await req(server).get('/api/jokes').set('Authorization', token)
        //now i expect the status to be 200 on a GOOD GET reqest..
        expect(res.status).toBe(200)
    })
    it('after login... user can see the jokes', async () => {
        //first.. have to register a user..
        const mock_user = {
            "username": "IronPatriot",
            "password": "IamIronPatriot"
        }
        //await on a response from a post request to the 'api/auth/register' endpoint with the given user info
        let res = await req(server).post('/api/auth/register').send(mock_user)
       //make sure i did a good request.. 
       expect(res.status).toBe(201)
       // now that theres a user in the database.. we can use _mock_login_ to Log in
        const mock_login = {
            "username": "IronPatriot",
            "password": "IamIronPatriot"
        }
        //await on a response from a post request to the 'api/auth/login' endpoint with the given credentials
        res = await req(server).post('/api/auth/login').send(mock_login)
        //grab the expected token from the response...  using JWT 
        const token = res.body.token
        //now we expect the tokens length to be longer than 10 characters long...
        expect(token.length).toBeGreaterThan(10)
        //await a response from a GET reqest to the 'api/jokes' endpoint with the token as Authorization headers
        res = await req(server).get('/api/jokes').set('Authorization', token)
        //now i expect that the responses body to have a length greater than zero! meaning i got something!!!
        expect(res.body.length).toBeGreaterThan(0)
    })
})

//sets a timeout to jest because i have a salt of 16 and that takes longer than 5000 ms and jest wants it to be that... 
//i set it to 10 secs but thats still feels abit too long... but after test... 10 seconds is the sweet spot...
const __timeout__ = 1000 * 11 
jest.setTimeout(__timeout__)

beforeEach(async () => {
    // clean the test.db3 file before each test so that they are correct
    await db('users').truncate()
})