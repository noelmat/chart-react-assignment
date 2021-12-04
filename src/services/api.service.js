import axios from 'axios';

export const getChartData = async () => {
    return axios.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/chart2986176.json");
}

