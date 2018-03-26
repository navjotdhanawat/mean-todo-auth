var User = require('./models/user');
var Todo = require('./models/todo');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = function (app) {
    app.get('/todo', auth, function (req, res) {
        console.log('get-data called');
        Todo.find({}, function (err, todos) {
            if (!err) {
                res.json({ status: true, todos });
            } else {
                res.json({ status: false, err });
            }
        })

    });

    app.post('/todo', auth, function (req, res) {
        console.log('POST....');
        var todo = req.body;
        console.log(todo);
        Todo.create(todo, function (err, response) {
            if (!err) {
                res.json({ status: true, response });
            } else {
                res.json({ status: false, err });
            }
        });
    });

    app.put('/todo/:id', auth, function (req, res) {
        console.log('PUT....');
        var title = req.body.title;
        var status = req.body.status;
        var desc = req.body.desc;
        var id = req.params.id;
        Todo.findById(id, function (err, todo) {
            todo.title = title;
            todo.status = status;
            todo.desc = desc;
            todo.save(function (err, response) {
                if (!err) {
                    res.json({ status: true, response });
                } else {
                    res.json({ status: false, err });
                }
            });
        })
    });

    app.delete('/todo/:id', auth, function (req, res) {
        console.log('DELETE...');

        var id = req.params.id;
        Todo.findByIdAndRemove(id, function (err, response) {
            if (!err) {
                res.json({ status: true, response });
            } else {
                res.json({ status: false, err });
            }
        });
    });

    app.post('/register', function (req, res) {
        console.log(req.body);
        createHash(req.body.password, function (hash) {
            var user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash
            });

            user.save(function (err, result) {
                if (!err) {
                    res.json({ status: true, result });
                } else {
                    res.json({ status: false, err });
                }
            });
        });
    });

    app.post('/login', function (req, res) {
        console.log(req.body);
        var email = req.body.email;
        var password = req.body.password;
        User.findOne({ email: email }, function (err, user) {
            if (user) {
                bcrypt.compare(password, user.password, function (err, hashRes) {
                    if (hashRes) {
                        res.json({ status: true, message: 'Login success', token: getToken({ email: user.email }) });
                    } else {
                        res.json({ status: false, message: 'Password does not match' });
                    }
                });
            } else {
                res.json({ status: false, message: 'User does not exist' });
            }
        });
    });

    function createHash(password, callback) {
        bcrypt.hash(password, 10, function (err, hash) {
            callback(hash);
        });
    }

    function getToken(user) {
        return jwt.sign(user, 'ertert', { expiresIn: '1h' });
    }

    function auth(req, res, next) {
        var token = req.headers.authorization;
        if (token) {
            jwt.verify(token, 'ertert', function (err, decoded) {
                if (err) {
                    res.json({ status: false, err: 'Token is not valid' });
                } else {
                    next();
                }
            });
        } else {
            res.json({ status: false, err: 'No token found' });
        }

    }
};