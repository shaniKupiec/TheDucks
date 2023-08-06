import axios from "axios";

export async function fetchDucks(): Promise<any> {
  try {
    const response = await axios.get("/src/assets/data/duckList.json");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data: " + error);
  }
}
