var MP3Recorder = function (config) {
    var recorder = this;
    config = config || {};
    config.sampleRate = config.sampleRate || 44100;
    config.bitRate = config.bitRate || 192;
    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {

            // First get ahold of the legacy getUserMedia, if present
            var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            // Some browsers just don't implement it - return a rejected promise with an error
            // to keep a consistent interface
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }

            // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
            return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        };
    }
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
                audio: true
            }).then(
            function (stream) {
                var AudioContext = window.AudioContext || window.webkitAudioContext;
                var context = new AudioContext(),
                    microphone = context.createMediaStreamSource(stream),
                    processor = context.createScriptProcessor(16384, 1, 1),
                    mp3ReceiveSuccess, currentErrorCallback;
                config.sampleRate = context.sampleRate;
                processor.onaudioprocess = function (event) {
                    var array = event.inputBuffer.getChannelData(0);
                    realTimeWorker.postMessage({cmd: 'encode', buf: array});
                };
                var realTimeWorker = new Worker('lib/work-realtime.js');
                window.audioRealTimeWorker=realTimeWorker;
                realTimeWorker.onmessage = function (e) {
                    switch (e.data.cmd) {
                        case 'init':
                            console.log('Initial Successful');
                            if (config.funOk) {
                                config.funOk();
                            }
                            break;
                        case 'end':
                            console.log('MP3 Size:', e.data.buf.length);
                            if (mp3ReceiveSuccess) {
                                mp3ReceiveSuccess(new Blob(e.data.buf, {type: 'audio/mp3'}));
                            }
                            e.data.buf = [];
                            break;
                        case 'error':
                            console.log('Error Msg:' + e.data.error);
                            if (currentErrorCallback) {
                                currentErrorCallback(e.data.error);
                            }
                            break;
                        default:
                            console.log('unknown:', e.data);
                    }
                };
                recorder.getMp3Blob = function (onSuccess, onError) {
                    currentErrorCallback = onError;
                    mp3ReceiveSuccess = onSuccess;
                    realTimeWorker.postMessage({cmd: 'finish'});
                };
                recorder.start = function () {
                    if (processor && microphone) {
                        microphone.connect(processor);
                        processor.connect(context.destination);
                    }
                };
                recorder.stop = function () {
                    if (processor && microphone) {
                        try {
                            microphone.disconnect(processor);
                            processor.disconnect(context.destination);
                            context.close();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                };
                recorder.clear = function () {
                    var track = stream.getTracks()[0];  // if only one media track
                    // ...
                    track.stop();
                    var track2 = microphone.mediaStream.getTracks()[0];
                    track2.stop();
                };
                realTimeWorker.postMessage({
                    cmd: 'init',
                    config: {
                        sampleRate: config.sampleRate,
                        bitRate: config.bitRate
                    }
                });
            },
            function (error) {
                //msg List
                //0:User not allow microphone
                //1:NotSupportedError
                //2:MandatoryUnsatisfiedError
                //8:NotFoundError
                var msg;
                switch (error.code || error.name) {
                    case 'PERMISSION_DENIED':
                    case 'PermissionDeniedError':
                        msg = 0;
                        break;
                    case 'NOT_SUPPORTED_ERROR':
                    case 'NotSupportedError':
                        msg = 1;
                        break;
                    case 'MANDATORY_UNSATISFIED_ERROR':
                    case 'MandatoryUnsatisfiedError':
                        msg = 2;
                        break;
                    default:
                        msg = error.code;
                        break;
                }
                if (config.funCancel) {
                    config.funCancel(msg);
                }
            });
    } else {
        if (config.funCancel) {
            config.funCancel('Your browser not support this feature! Please using newest Chrome or Firefox!');
        }
    }
    function log(str) {
        if (config.debug) {
            console.log(str);
        }
    }
};
exports.MP3Recorder = MP3Recorder;

