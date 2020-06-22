const chai = require('chai')
const chaiHttp = require('chai-http')

const { app } = require('../app')

chai.should()
chai.use(chaiHttp)

const token = "token.token.token";
let id = "";

describe('Users tests', () => {


    before((done) => {
        chai
            .request(app)
            .post('/v1/users')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "name": "marius",
                "login": "maro",
                "age": 20,
                "password": "monMotDePass"
            })
            .end((err, res) => {
                if (err) console.log(err)
                id = res.body._id
                console.log(id)
                done();
            });
    })

    it('should add a user on /v1/users POST', done => {
        chai
            .request(app)
            .post('/v1/users')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "name": "rodrigue",
                "login": "drigo",
                "age": 30,
                "password": "motdepass",
            })
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(201)
                res.should.be.json
                res
                    .body
                    .should
                    .be
                    .a('object')
                res
                    .body
                    .name
                    .should
                    .equal("rodrigue")
                res
                    .body
                    .login
                    .should
                    .equal("drigo")
                res
                    .body
                    .age
                    .should
                    .equal(30)
                res
                    .body
                    .password
                    .should
                    .equal("motdepass")
                done()
            })
    });

    it('should add a user with invalid input on /v1/users POST', done => {
        chai
            .request(app)
            .post('/v1/users')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "input": "invalid"
            })
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(405)
                res.should.be.json
                done()
            })

    });

    it('should list ALL users on /v1/users GET', done => {
        chai
            .request(app)
            .get('/v1/users')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(200)
                res.should.be.json
                res
                    .body
                    .should
                    .be
                    .a('array')
                done()
            })
    })

    it('should list a SINGLE user with a valid id on /v1/users/<id> GET', done => {
        chai
            .request(app)
            .get('/v1/users/' + id)
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(200)
                res.should.be.json
                res
                    .should
                    .be
                    .a('object')
                res
                    .body
                    .should
                    .have
                    .property('_id')
                res
                    .body
                    ._id
                    .should
                    .equal(id)
                done()
            })
    });

    it('should list a SINGLE user with a invalid id on /v1/users/<id> GET', done => {
        chai
            .request(app)
            .get('/v1/users/{76767')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(404)
                res.should.be.json
                done()
            })
    });

    it('should list a SINGLE user with a UNKNOWN id on /v1/users/<id> GET', done => {
        chai
            .request(app)
            .get('/v1/users/id')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(404)
                res.should.be.json
                done()
            })
    });

    it('should update a SINGLE user on /v1/users/<id> PUT', done => {
        chai
            .request(app)
            .put('/v1/users/' + id)
            .set('Authorization', 'Bearer ' + token)
            .send({ "name": 'updateName' })
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(200)
                res.should.be.json
                res
                    .body
                    .should
                    .be
                    .a('object')
                res
                    .body
                    .should
                    .have
                    .property('_id')
                res
                    .body
                    ._id
                    .should
                    .equal(id)
                res
                    .body
                    .name
                    .should
                    .equal('updateName')
                done()
            })
    });

    it('should update a SINGLE user with invalid input on /v1/users/id PUT', done => {
        chai
            .request(app)
            .put('/v1/users/' + id)
            .set('Authorization', 'Bearer ' + token)
            .send({ error: 'invalid' })
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(405)
                res.should.be.json
                done()
            })
    });


    it('should delete a SINGLE user on /v1/users/<id> DELETE', done => {
        chai
            .request(app)
            .delete('/v1/users/' + id)
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(200)
                res.should.be.json
                done()
            })
    });


    it('should delete a UNKNOWN user on /v1/users/<id> DELETE', done => {
        chai
            .request(app)
            .delete('/v1/users/id')
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                res
                    .should
                    .have
                    .status(404)
                res.should.be.json
                done()
            })
    });
})