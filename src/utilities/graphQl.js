require("isomorphic-fetch");

const getData = async (url, headers, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

exports.getData = getData;
