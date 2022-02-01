import proxiedFetch from "./proxiedFetch";

const fetchDownloadLink = (fileList) => {
  return proxiedFetch("/download", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fileList),
  })
}

export default fetchDownloadLink;