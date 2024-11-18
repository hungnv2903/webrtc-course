// const socket = io();

const localVideoEl = document.getElementById('local-video');
const remoteVideoEl = document.getElementById('remote-video');

let localStream, remoteStream, peerConnection;

const call = async e => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });

        localVideoEl.srcObject = stream;
    } catch (error) {
        alert(error.message);
        console.log(error);
    }

};

document.getElementById('call').addEventListener('click', call);