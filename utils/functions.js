
import * as XLSX from "xlsx";

export const generateSessionId = async () => {
  const array = new Uint8Array(16); // 16 bytes = 128 bits
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Function to calculate distance between two points using the Haversine formula
function calculateHaversineDistance(lat1, lon1, lat2, lon2, accuracy1 = 0, accuracy2 = 0) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let distance = R * c; // Distance in kilometers

  // Incorporate accuracy
  const accuracyInKm1 = accuracy1 / 1000; // Convert accuracy from meters to kilometers
  const accuracyInKm2 = accuracy2 / 1000; // Convert accuracy from meters to kilometers
  distance += accuracyInKm1 + accuracyInKm2; // Adjust distance by adding accuracies

  return distance;
}

// Helper function to convert degrees to radians
function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export  function encodeUser(user) {
  const encodedUser = JSON.parse(Buffer.from(user, "base64").toString())
  return encodedUser;
}

export function decodeUser(encodedUser) {

  const user = JSON.parse(Buffer.from(encodedUser, "base64").toString())
  return user;

}


export async function exportToExcel(students , headers, filename) {
  const worksheet = XLSX.utils.json_to_sheet(students, { header: headers });
          const workbook = XLSX.utils.book_new();
  
          const headerStyle = {
              fill: { fgColor: { rgb: "FFD700" } }, // Golden background
              font: { bold: true, color: { rgb: "000000" } }, // Bold Black Text
              alignment: { horizontal: "center", vertical: "center" }, // Center align
              border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } },
              },
            };
            
            // Apply styles to headers
            headers.forEach((header, colIndex) => {
              const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIndex }); // First row (header)
              if (!worksheet[cellAddress]) return;
              worksheet[cellAddress].s = headerStyle;
            });
  
          XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
          await XLSX.writeFile(workbook,  filename);
}