export function getCountries(lang = "en") {
   const A = 65;
   const Z = 90;
   const countryName = new Intl.DisplayNames([lang], { type: "region" });
   const countries = [];
   for (let i = A; i <= Z; ++i) {
      for (let j = A; j <= Z; ++j) {
         const code = String.fromCharCode(i) + String.fromCharCode(j);
         const name = countryName.of(code);
         if (code !== name) {
            countries.push({ name });
         }
      }
   }
   return countries;
}
