const chai = require('chai')
const chaiHttp = require('chai-http')

const { app } = require('../app')

chai.should()
chai.use(chaiHttp)

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1OTI3ODQ4MTQsIl9sb2dpbiI6InBlZHJvIiwiaWF0IjoxNTkyNzgxMjE0fQ.DIpJGdjoaglwjDQjlebzflC8-ZvFI2Wm81jYooyuUVE";
let id = "";

describe('Alerts tests', () => {


    before((done) => {
        chai
            .request(app)
            .post('/v1/alerts')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "type": "transport",
                "label": "label1",
                "status": "warning",
                "from": "rennes",
                "to": "paris"
            })
            .end((err, res) => {
                if (err) console.log(err)
                id = res.body._id
                console.log(id)
                done();
            });
    })

    it('should add an alert on /v1/alerts POST', done => {
        chai
            .request(app)
            .post('/v1/alerts')
            .set('Authorization', 'Bearer ' + token)
            .send({
                "type": "weather",
                "label": "label2",
                "status": "danger",
                "from": "donzelot",
                "to": "mirabeau"
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
                    .type
                    .should
                    .equal('weather')
                res
                    .body
                    .label
                    .should
                    .equal('label2')
                res
                    .body
                    .status
                    .should
                    .equal('danger')
                res
                    .body
                    .from
                    .should
                    .equal('donzelot')
                res
                    .body
                    .to
                    .should
                    .equal('mirabeau')
                done()
            })
    });

    it('should add an alert with invalid input on /v1/alerts POST', done => {
        chai
            .request(app)
            .post('/v1/alerts')
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

    it('should list ALL alerts on /v1/alerts GET', done => {
        chai
            .request(app)
            .get('/v1/alerts')
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

    it('should list a SINGLE alert with a valid id on /v1/alerts/<id> GET', done => {
        chai
            .request(app)
            .get('/v1/alerts/' + id)
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

    it('should list a SINGLE alert with an invalid id on /v1/alerts/<id> GET', done => {
        chai
            .request(app)
            .get('/v1/alerts/{76767')
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

    it('should list a SINGLE alert with an UNKNOWN id on /v1/alerts/<id> GET', done => {
        chai
            .request(app)
            .get('/v1/alerts/id')
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

    it('should update a SINGLE alert on /v1/alerts/<id> PUT', done => {
        chai
            .request(app)
            .put('/v1/alerts/' + id)
            .set('Authorization', 'Bearer ' + token)
            .send({ "type": 'updateType' })
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
                    .type
                    .should
                    .equal('updateType')
                done()
            })
    });

    it('should update a SINGLE alert with invalid input on /v1/alerts/id PUT', done => {
        chai
            .request(app)
            .put('/v1/alerts/' + id)
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


    it('should delete a SINGLE alert on /v1/alerts/<id> DELETE', done => {
        chai
            .request(app)
            .delete('/v1/alerts/' + id)
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


    it('should delete an UNKNOWN alert on /v1/alerts/<id> DELETE', done => {
        chai
            .request(app)
            .delete('/v1/alerts/id')
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