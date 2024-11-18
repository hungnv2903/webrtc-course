// const socket = io();
const socket = io.connect('https://localhost:3000/');

const localVideoEl = document.getElementById("local-video");
const remoteVideoEl = document.getElementById("remote-video");

let localStream, remoteStream, peerConnection;

let peerConfiguration = {
    iceServers: [
        {
            urls: [
                "stun:stun.l.google.com:19302",
                "stun:stun1.l.google.com:19302",
            ],
        },
    ],
};

const call = async (e) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });

        localVideoEl.srcObject = stream;

        localStream = stream;

        await createPeerConnection();
        const offer = await peerConnection.createOffer();
        console.log(offer);
        peerConnection.setLocalDescription(offer);
    } catch (error) {
        alert(error.message);
        console.log(error);
    }
};

const createPeerConnection = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            peerConnection = await new RTCPeerConnection(peerConfiguration);
            peerConnection.addEventListener("icecandidate", (e) => {
                console.log("... ice candidate found!");
                console.log(e);
            });
            localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
            // peerConnection.createOffer({
            //     offerToReceiveAudio: true,
            //     offerToReceiveVideo: false,
            // });
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

document.getElementById("call").addEventListener("click", call);
