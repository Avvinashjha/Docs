export const getResponse = ({
  state = "false",
  message = "Default Message",
  data = [],
}) => {
  const item = {
    success: state,
    message: message,
    data: data,
  };
  return JSON.stringify(item);
};

export function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      try {
        const json = JSON.parse(data);
        console.log(json);

        resolve(json);
      } catch (err) {
        reject(new Error("Invalid JSON"));
      }
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
}

export function getUrlInfo(url){
    const urlParts =  url.split("/").filter(part => part.length > 0);
    
}