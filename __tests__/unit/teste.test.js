require("dotenv").config({
    allowEmptyValues: true,
    path: '.env'
});

if (process.env.NODE_ENV && process.env.NODE_ENV === 'test'){
    require("dotenv").config({
        allowEmptyValues: true,
        path: '.env'
    });
}

describe('testando', () => {
    it('should teste', function () {
        const sum = process.env.TEST

        expect(sum).toBe(2)
    });
})
