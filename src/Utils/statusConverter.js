export function statusConverter(status) {
  switch (status) {
    case "v":
      return "Verified";
    case "p":
      return "Pending";
    case "n":
      return "Not Verified";
  }
}
