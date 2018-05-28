var WebAudioPlayer = function (src) {

    SL.EventDispatcher.call(this);

    this.isWebAudio = false;
    this.player = null;
    this.playingSource = null;
    if (WebAudioPlayer.contextClass != null) {
        this.isWebAudio = true;
        this.player = new WebAudioPlayer.contextClass();
        this.audioDataReady = false;
        
        var req = new XMLHttpRequest();
        req.addEventListener('readystatechange', function (evt) {
            if (evt.target.readyState == 1) {
                evt.target.send();
            }
        });
        req.addEventListener('load', (function (evt) {
            this.player.decodeAudioData(evt.target.response, (function (buffer) {
                this.audioDataReady = true;
                this.audioData = buffer;
            }).bind(this));
        }).bind(this));
        req.responseType = "arraybuffer";
        req.open('get', src, true);
    }
    else {
        this.isWebAudio = false;
        this.player = new Audio(src);
    }

    this.play = function () {
        if (this.isWebAudio) {
            var source = this.player.createBufferSource();
            source.buffer = this.audioData;
            source.connect(this.player.destination);
            source.start(0);
            this.playingSource = source;
        }
        else {
            this.player.play.apply(this.player, arguments);
        }
    };

    this.pause = function () {
        if (this.isWebAudio) {
            if (this.playingSource != null) {
                this.playingSource.stop(0);
            }
        }
        else {
            this.player.pause();
        }
    };
};

WebAudioPlayer.contextClass = (function () {
    return window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext ||
        window.oAudioContext ||
        window.msAudioContext || null;
})();