const k6 = require('k6/http');
const { check, sleep } = require('k6');

export const options = {
    stages: [
        { duration: '1s', target: 10 },
        { duration: '30s', target: 100 },
    ],
};

export default function () {
    const num = Math.floor(Math.random() * (200000 - 1 + 1)) + 1;
    const res = k6.get(`http://localhost:3001/api/neighborhoods/${num}`);
    check(res, {
        'status was 200': (r) => r.status === 200,
        'transaction time OK': (r) => r.timings.duration < 200,
    });
    sleep(0.001);
}
