export function downloadFile(url: string, fileName: string) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  xhr.send();
  xhr.onload = function() {
    if (this.status === 200) {
      var blob = this.response;
      var type = blob.type;
      if (type === "application/pdf" || type === "application/vnd.ms-excel" || type === "text/csv") {
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      } else {
        console.error("The file type is not supported: " + type);
      }
    }
  };
}