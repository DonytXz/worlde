export const getWords = async() =>{
  const res = await fetch("https://gitlab.com/d2945/words/-/raw/main/words.txt");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  console.log( res, "res");
  
  return res.json();
}
