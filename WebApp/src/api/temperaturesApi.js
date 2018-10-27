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

    async updateNote(id, note){
        try {
            await axios.post(`/api/temperatures/${id}/note`, {
                value: note
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export default TemperaturesApi;