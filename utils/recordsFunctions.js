export const getRecords = async (query = "") => {
  try {
    const res = await fetch(`/api/records?search=${encodeURIComponent(query)}`);
    const json = await res.json();
    console.log("📦 Response from API:", json);

    if (!res.ok || !Array.isArray(json.data)) {
      throw new Error("Invalid response");
    }

    return json.data;
  } catch (error) {
    console.error("Error in getRecords:", error);
    return [];
  }
};

export const getRecord = async (id) => {
  try {
    const response = await fetch(`/api/records/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createRecord = async (entry) => {
  try {
    const response = await fetch(`/api/records`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(entry)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateRecord = async (id, entry) => {
  try {
    const response = await fetch(`/api/records/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(entry)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteRecord = async (id) => {
  try {
    const response = await fetch(`/api/records/${id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
