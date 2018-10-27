import axios from 'axios';

class TemperaturesApi {
    async query(from, to) {
        try {
            const response = await axios.get('/api/temperatures', {
                params: { from, to }
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    test(){
console.log("TemperaturesApi.test");
    }
}

export default TemperaturesApi;