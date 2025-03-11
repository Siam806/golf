export const mockData = [
  {
    // Daten aus Dokument von Herrn Lade
    userName: "John Doe",
    userEmail: "johnDoe@gmail.com",
    userRole: "Golfer",
    rounds: [
      { userEmail: "johnDoe@gmail.com", name: "Runde 1", slopeRating: 115, courseRating: 70.9, par: 72, scores: [5, 6, 8, 7, 6, 6, 6, 6, 6, 7, 6, 6, 5, 6, 6, 6, 5, 6], sd: 37.4 },
      { userEmail: "johnDoe@gmail.com", name: "Runde 2", slopeRating: 115, courseRating: 70.9, par: 72, scores: [4, 5, 5, 6, 6, 5, 6, 9, 5, 5, 6, 6, 5, 6, 6, 6, 5, 6], sd: 29.6 },
      { userEmail: "johnDoe@gmail.com", name: "Runde 3", slopeRating: 130, courseRating: 72.3, par: 72, scores: [4, 5, 5, 6, 6, 7, 4, 8, 4, 5, 6, 6, 5, 6, 6, 6, 5, 6], sd: 24.1 },
      { userEmail: "johnDoe@gmail.com", name: "Runde 5", slopeRating: 115, courseRating: 70.9, par: 72, scores: [4, 5, 5, 6, 5, 5, 4, 5, 5, 6, 5, 5, 4, 5, 5, 6, 5, 5], sd: 18.8 },
      { userEmail: "johnDoe@gmail.com", name: "Runde 4", slopeRating: 130, courseRating: 72.3, par: 72, scores: [5, 6, 6, 7, 6, 6, 4, 7, 6, 7, 6, 6, 5, 5, 6, 6, 5, 6], sd: 28.4 },
      { userEmail: "johnDoe@gmail.com", name: "Runde 6", slopeRating: 115, courseRating: 34.1, par: 35, scores: [5, 6, 6, 7, 6, 5, 5, 6, 6], sd: 31.1 },
      { userEmail: "johnDoe@gmail.com", name: "Runde 7", slopeRating: 115, courseRating: 34.1, par: 35, scores: [5, 7, 9, 7, 6, 6, 6, 6, 6], sd: 36 },
      { userEmail: "johnDoe@gmail.com", name: "Runde 8", slopeRating: 115, courseRating: 70.9, par: 72, scores: [4, 5, 5, 6, 6, 5, 4, 5, 5, 7, 5, 5, 4, 5, 5, 7, 5, 5], sd: 21.7 },
      { userEmail: "johnDoe@gmail.com", name: "Runde 9", slopeRating: 130, courseRating: 72.3, par: 72, scores: [4, 5, 5, 6, 5, 5, 4, 5, 5, 6, 5, 5, 4, 5, 5, 6, 5, 5], sd: 15.4 },
      { userEmail: "johnDoe@gmail.com", name: "Runde 10", slopeRating: 130, courseRating: 35.7, par: 35, scores: [4, 5, 5, 6, 5, 5, 4, 5, 5], sd: 21.7 },
      { userEmail: "johnDoe@gmail.com", name: "Runde 11", slopeRating: 130, courseRating: 35.7, par: 35, scores: [5, 6, 6, 7, 6, 6, 5, 6, 6], sd: 28.6 },
      { userEmail: "johnDoe@gmail.com", name: "Runde 12", slopeRating: 130, courseRating: 72.3, par: 72, scores: [6, 7, 7, 8, 7, 7, 6, 7, 10, 8, 7, 7, 6, 7, 7, 8, 7, 7], sd: 46.7 },
    ],
  },
  {
    // Daten aus Dokument von Herrn Lade
    userName: "Jane Smith",
    userEmail: "janeSmith@gmail.com",
    userRole: "Golfer",
    rounds: [
      { userEmail: "janeSmith@gmail.com", name: "Runde 1", slopeRating: 115, courseRating: 70.9, par: 72, scores: [5, 6, 8, 7, 6, 6, 6, 6, 6, 7, 6, 6, 5, 6, 6, 6, 5, 6], sd: 37.4 },
      { userEmail: "janeSmith@gmail.com", name: "Runde 2", slopeRating: 115, courseRating: 70.9, par: 72, scores: [4, 5, 5, 6, 6, 5, 6, 9, 5, 5, 6, 6, 5, 6, 6, 6, 5, 6], sd: 29.6 },
      { userEmail: "janeSmith@gmail.com", name: "Runde 3", slopeRating: 130, courseRating: 72.3, par: 72, scores: [4, 5, 5, 6, 6, 7, 4, 8, 4, 5, 6, 6, 5, 6, 6, 6, 5, 6], sd: 24.1 },
      { userEmail: "janeSmith@gmail.com", name: "Runde 4", slopeRating: 130, courseRating: 72.3, par: 72, scores: [5, 6, 6, 7, 6, 6, 4, 7, 6, 7, 6, 6, 5, 5, 6, 6, 5, 6], sd: 28.4 },
      { userEmail: "janeSmith@gmail.com", name: "Runde 5", slopeRating: 115, courseRating: 70.9, par: 72, scores: [4, 5, 5, 6, 5, 5, 4, 5, 5, 6, 5, 5, 4, 5, 5, 6, 5, 5], sd: 18.8 },
      { userEmail: "janeSmith@gmail.com", name: "Runde 6", slopeRating: 115, courseRating: 34.1, par: 35, scores: [5, 6, 6, 7, 6, 5, 5, 6, 6], sd: 31.1 },
      { userEmail: "janeSmith@gmail.com", name: "Runde 7", slopeRating: 115, courseRating: 34.1, par: 35, scores: [5, 7, 9, 7, 6, 6, 6, 6, 6], sd: 36 },
      { userEmail: "janeSmith@gmail.com", name: "Runde 8", slopeRating: 115, courseRating: 70.9, par: 72, scores: [4, 5, 5, 6, 6, 5, 4, 5, 5, 7, 5, 5, 4, 5, 5, 7, 5, 5], sd: 21.7 },
      { userEmail: "janeSmith@gmail.com", name: "Runde 9", slopeRating: 130, courseRating: 72.3, par: 72, scores: [4, 5, 5, 6, 5, 5, 4, 5, 5, 6, 5, 5, 4, 5, 5, 6, 5, 5], sd: 15.4 },
      { userEmail: "janeSmith@gmail.com", name: "Runde 10", slopeRating: 130, courseRating: 35.7, par: 35, scores: [4, 5, 5, 6, 5, 5, 4, 5, 5], sd: 21.7 },
      { userEmail: "janeSmith@gmail.com", name: "Runde 11", slopeRating: 130, courseRating: 35.7, par: 35, scores: [5, 6, 6, 7, 6, 6, 5, 6, 6], sd: 28.6 },
      { userEmail: "janeSmith@gmail.com", name: "Runde 12", slopeRating: 130, courseRating: 72.3, par: 72, scores: [6, 7, 7, 8, 7, 7, 6, 7, 10, 8, 7, 7, 6, 7, 7, 8, 7, 7], sd: 46.7 },
    ],
  },
  {
    // Der Rest ist erstellt via ChatGPT, kann inkorrekte Daten vorhanden sein.
    userName: "Michael Johnson",
    userEmail: "michaelJ@gmail.com",
    userRole: "Golfer",
    rounds: [
      { userEmail: "michaelJ@gmail.com", name: "Round 1", courseRating: 69.5, slopeRating: 110, par: 70, sd: 36.0, scores: ["4", "5", "6", "5", "5", "5", "4", "5", "6", "5", "5", "4", "5", "5", "6", "5", "4", "5"] },
      { userEmail: "michaelJ@gmail.com", name: "Round 2", courseRating: 70.0, slopeRating: 113, par: 70, sd: 36.5, scores: ["5", "5", "6", "5", "6", "4", "5", "5", "6", "5", "6", "4", "5", "6", "5", "4", "6", "5"] },
      { userEmail: "michaelJ@gmail.com", name: "Round 3", courseRating: 71.0, slopeRating: 115, par: 70, sd: 37.0, scores: ["4", "5", "6", "6", "5", "6", "4", "5", "5", "5", "5", "4", "5", "5", "6", "5", "6", "5"] },
      { userEmail: "michaelJ@gmail.com", name: "Round 4", courseRating: 71.5, slopeRating: 116, par: 70, sd: 37.2, scores: ["5", "5", "6", "6", "6", "4", "5", "6", "5", "5", "5", "5", "4", "5", "5", "6", "5", "4"] },
    ],
  },
  {
    userName: "Sarah Lee",
    userEmail: "sarahLee@gmail.com",
    userRole: "Golfer",
    rounds: [
      { userEmail: "sarahLee@gmail.com", name: "Round 1", courseRating: 71.0, slopeRating: 114, par: 72, sd: 37.8, scores: ["5", "5", "6", "6", "6", "7", "5", "5", "5", "6", "6", "5", "5", "6", "7", "6", "5", "6"] },
      { userEmail: "sarahLee@gmail.com", name: "Round 2", courseRating: 72.5, slopeRating: 119, par: 72, sd: 38.2, scores: ["6", "5", "6", "5", "5", "5", "6", "5", "6", "7", "6", "6", "6", "6", "5", "5", "6", "7"] },
      { userEmail: "sarahLee@gmail.com", name: "Round 3", courseRating: 73.0, slopeRating: 120, par: 72, sd: 38.5, scores: ["6", "7", "6", "5", "6", "6", "5", "5", "7", "6", "6", "6", "6", "6", "7", "6", "6", "5"] },
      { userEmail: "sarahLee@gmail.com", name: "Round 4", courseRating: 74.0, slopeRating: 123, par: 72, sd: 39.0, scores: ["6", "6", "7", "5", "5", "6", "5", "6", "5", "6", "5", "7", "6", "6", "5", "6", "7", "5"] },
      { userEmail: "sarahLee@gmail.com", name: "Round 5", courseRating: 72.2, slopeRating: 117, par: 72, sd: 37.8, scores: ["6", "6", "5", "6", "5", "5", "6", "7", "6", "5", "6", "5", "5", "6", "7", "6", "5", "5"] },
    ],
  },
  {
    userName: "Daniel Brown",
    userEmail: "danielBrown@gmail.com",
    userRole: "Golfer",
    rounds: [
      { userEmail: "danielBrown@gmail.com", name: "Round 1", courseRating: 70.5, slopeRating: 114, par: 70, sd: 36.6, scores: ["5", "6", "5", "5", "6", "5", "4", "5", "6", "6", "5", "5", "5", "6", "5", "6", "6", "5"] },
      { userEmail: "danielBrown@gmail.com", name: "Round 2", courseRating: 71.2, slopeRating: 116, par: 70, sd: 37.0, scores: ["6", "6", "5", "6", "6", "5", "5", "6", "5", "5", "5", "5", "6", "6", "4", "5", "5", "5"] },
      { userEmail: "danielBrown@gmail.com", name: "Round 3", courseRating: 72.0, slopeRating: 118, par: 70, sd: 37.2, scores: ["5", "6", "7", "6", "5", "6", "5", "5", "6", "5", "6", "6", "6", "5", "5", "6", "6", "5"] },
      { userEmail: "danielBrown@gmail.com", name: "Round 4", courseRating: 72.5, slopeRating: 120, par: 70, sd: 37.5, scores: ["6", "5", "6", "6", "6", "5", "6", "5", "6", "5", "6", "5", "5", "6", "5", "5", "5", "6"] },
      { userEmail: "danielBrown@gmail.com", name: "Round 5", courseRating: 73.0, slopeRating: 121, par: 70, sd: 37.7, scores: ["5", "6", "6", "5", "5", "5", "6", "5", "7", "6", "5", "5", "5", "5", "5", "6", "6", "6"] },
    ],
  },
  {
    userName: "Chris White",
    userEmail: "chrisWhite@gmail.com",
    userRole: "Golfer",
    rounds: [
      { userEmail: "chrisWhite@gmail.com", name: "Round 1", courseRating: 69.0, slopeRating: 112, par: 70, sd: 36.3, scores: ["4", "5", "6", "5", "5", "6", "6", "5", "6", "5", "5", "5", "5", "5", "4", "6", "5", "5"] },
      { userEmail: "chrisWhite@gmail.com", name: "Round 2", courseRating: 70.0, slopeRating: 113, par: 71, sd: 36.5, scores: ["5", "5", "5", "6", "6", "5", "5", "5", "6", "5", "5", "5", "6", "5", "6", "6", "5", "6"] },
      { userEmail: "chrisWhite@gmail.com", name: "Round 3", courseRating: 71.0, slopeRating: 115, par: 70, sd: 37.0, scores: ["5", "6", "5", "5", "5", "5", "5", "6", "5", "5", "6", "5", "6", "6", "5", "6", "5", "5"] },
      { userEmail: "chrisWhite@gmail.com", name: "Round 4", courseRating: 70.0, slopeRating: 113, par: 71, sd: 36.7, scores: ["6", "5", "5", "6", "6", "5", "5", "5", "6", "6", "6", "5", "6", "5", "5", "5", "6", "5"] },
      { userEmail: "chrisWhite@gmail.com", name: "Round 5", courseRating: 69.5, slopeRating: 110, par: 70, sd: 36.4, scores: ["4", "6", "6", "5", "5", "5", "4", "5", "5", "5", "6", "6", "5", "5", "6", "5", "4", "6"] },
    ],
  },
  {
    userName: "Robert Davis",
    userEmail: "robertDavis@gmail.com",
    userRole: "Golfer",
    rounds: [
      { userEmail: "robertDavis@gmail.com", name: "Round 1", courseRating: 70.9, slopeRating: 115, par: 72, sd: 37.44, scores: ["5", "6", "8", "7", "6", "6", "6", "6", "6", "7", "6", "6", "5", "6", "6", "6", "5", "6"] },
      { userEmail: "robertDavis@gmail.com", name: "Round 2", courseRating: 71.5, slopeRating: 120, par: 72, sd: 38.0, scores: ["4", "5", "6", "5", "6", "5", "5", "6", "5", "5", "6", "5", "5", "6", "6", "5", "4", "5"] },
    ],
  },
];
