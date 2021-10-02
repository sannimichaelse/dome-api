import { expect } from 'chai';
import request from 'supertest';
import Connection from '../../config/database';

import app from '../../index';

describe('Base URL Test', () => {
  after(async () => {
    const connection = new Connection();
    connection.tearDown();
  });

  describe('Should Return base url message', () => {
    it('should return a message', (done) => {
      request(app)
        .get('/api/v1/')
        .end((err, res) => {
          expect(res.body.message).to.be.equal(
            'Welcome to Pdfgen. Powered by Soft Signatures Lab'
          );
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  describe('SIGNUP ROUTES', () => {
    it('should not signup without fullname', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          email: 'ddd',
          password: ''
        })
        .end((err, res) => {
          expect(res.body.message).to.be.equal('fullname is required');
          expect(res.body.code).to.be.equal(400);
          expect(res.body.status).to.be.equal('error');
          done();
        });
    });

    // it('length of fullname must be at least six characters', (done) => {
    //   request(app)
    //     .post('/api/v1/auth/signup')
    //     .send({
    //       fullname: 'San',
    //       password: ''
    //     })
    //     .end((err, res) => {
    //       expect(res.body.message).to.be.equal(
    //         'fullname length must be at least 6 characters long'
    //       );
    //       expect(res.body.code).to.be.equal(400);
    //       expect(res.body.status).to.be.equal('error');
    //       done();
    //     });
    // });

    it('try to signup without password less than length of 6', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'Sanni Michael Tomiwa',
          email: 'tomiwatech@gmail.com',
          password: 'kdjdj'
        })
        .end((err, res) => {
          expect(res.body.message).to.be.equal(
            'password length must be at least 6 characters long'
          );
          expect(res.body.code).to.be.equal(400);
          expect(res.body.status).to.be.equal('error');
          done();
        });
    });

    it('should signup a user', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullname: 'Sanni Michael Tomiwas',
          email: 'tomiwatech@gmail.com',
          password: '123456'
        })
        .end((err, res) => {
          expect(res.body.message).to.be.equal('User created Successfully');
          expect(res.body.code).to.be.equal(201);
          expect(res.body.status).to.be.equal('success');
          done();
        });
    });

    it('should not login with wrong email ', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'tomiwatechdd@gmail.com',
          password: '123456'
        })
        .end((err, res) => {
          expect(res.body.message).to.be.equal(
            'Wrong Email and Password Combination'
          );
          expect(res.body.code).to.be.equal(404);
          expect(res.body.status).to.be.equal('error');
          done();
        });
    });

    it('should not login with wrong password ', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'tomiwatech@gmail.com',
          password: '123456sddsdd'
        })
        .end((err, res) => {
          expect(res.body.message).to.be.equal(
            'Wrong Password and Email Combination'
          );
          expect(res.body.code).to.be.equal(404);
          expect(res.body.status).to.be.equal('error');
          done();
        });
    });

    it('should login user with right credentilas ', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'tomiwatech@gmail.com',
          password: '123456'
        })
        .end((err, res) => {
          expect(res.body.message).to.be.equal('Authentication Successful');
          expect(res.body.code).to.be.equal(200);
          expect(res.body.status).to.be.equal('success');
          done();
        });
    });
  });
});
