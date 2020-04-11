const k6 = require('k6/http');
const { check, sleep } = require('k6');

export const options = {
    stages: [
        { duration: '1s', target: 500 },
        { duration: '30s', target: 5000 },
    ],
};

export default function () {
    const res = k6.get('http://localhost:3001/api/neighborhoods/1');
    check(res, {
        'status was 200': (r) => r.status == 200,
        'transaction time OK': (r) => r.timings.duration < 200,
    });
    sleep(1);
}
