export function Server() {
  this.post = async function (url, data) {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  };
}
