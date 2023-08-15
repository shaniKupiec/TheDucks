import axios from "axios";

export async function fetchRabbits(): Promise<any> {
  try {
    const response = await axios.get("/src/assets/data/rabbitList.json");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data: " + error);
  }
}
