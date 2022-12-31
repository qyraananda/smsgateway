var sys = require('util'),
    childProcess = require('child_process'),
    gammu;
const con = require('../../db')

module.exports = {
    _command: function(cmd, callback) {
        gammu=childProcess.exec(cmd, function(error, stdout,stderr) {
            if(error){
                console.log(error.stack);
                console.log('Error code: '+error.code);
                console.log('Signal received: '+error.signal);
            }
        });
        gammu.on('exit', function(code){
            sys.log('Child process exited with exit code '+code)
          
        })
    },

    identify: function (callback) {

        this._command('gammu-detect', function(response){
console.log('response:'+callback)
            if (callback) callback(response);

        });

    },

    pin: function (pincode, callback) {

        this._command('gammu --entersecuritycode PIN ' + pincode, function(response){

            if (callback) callback(response);

        });

    },



    send: function (input, callback) {

//        this._command('echo "' + input.text + '" | gammu --sendsms TEXT ' + input.to, function(response){
    // console.log('callback :'+callback)
        this._command('gammu-smsd-inject TEXT ' + input.to + ' -text "' + input.text + '"', function(response){

            if (callback) callback(response);

        });

    },



    getsms: function (callback) {

        this._command('gammu --getallsms', function(response){

	        if (callback) callback(response);

        });

    },


    deletesms: function (callback) {

        this._command('gammu --deleteallsms', function(response){

                if (callback) callback(response);

        });

    },

    sqlQuery: async(sql, data) => {
        return new Promise((resolve, reject) => {
            con.query(sql, data, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    //console.log(rows)
                    resolve(rows);
                }
            })
        })
    },
}
