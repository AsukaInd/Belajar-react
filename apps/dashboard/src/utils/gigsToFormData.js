export function gigsToFormData(dataGigs) {
  const formDataGigs = new FormData();

  Object.entries(dataGigs).forEach(([key, value]) => {
     if (key === "photo" || key === "image") {
        if (value instanceof File) {
           formDataGigs.append(key, value);
        }
     } else {
        formDataGigs.append(
           key,
           key === "country" ? dataGigs.country.name : value
        );
     }
  });

  return formDataGigs;
}