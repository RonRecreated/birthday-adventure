// Customize all birthday activities, questions, and secret codes here.
window.BIRTHDAY_DATA = {
  title: "Your Birthday Adventure",
  greeting: "Hello, Beautiful! 💙",
  primaryCode: "BLUEHEART",
  stages: [
    { id: 1, title: "Welcome to Your Special Day", subtitle: "Your journey begins here.", tasks: [] },
    { id: 2, title: "A Sweet Beginning", subtitle: "A little sweetness, made with love.", tasks: [
      { id: "sweet-note", title: "Send your handsome boyfriend a morning selfie", description: "Let him see that bright smile of yours and that pretty face! 💙" },
      { id: "gift-message", title: "Solve this riddle and give your answer to your boyfriend", description: "I am the beginning of eternity, the end of time and space, the beginning of every end, and the end of every place. What am I?" }
    ], gate: { type: "code", code: "CUDDLES", hint: "Your next code comes with (or after) you answer the riddle correctly." } },
    { id: 3, title: "A Little About You And God", subtitle: "The best memories involves God.", tasks: [
      { id: "us", title: "A little moment of reflection", description: "Think of how blessed you are to reach this day and this age. Hold onto it—there are more blessings to experience." }
    ], gate: { type: "quiz", question: "What is one experience your boyfriend would love to do with you one day?", answers: ["Go on a cruise", "Go to Disney World", "Travel the world", "Preach a sermon together"], correct: 0, success: "YESSSS!!!! It would be nice to learn to swim first but I would definitely save up for it just so I can experience it with you; the woman I love so much. 💕" } },
    { id: 4, title: "Five Things From My Heart", subtitle: "Five little notes, one at a time.", tasks: [
      { id: "heart-cards", title: "Read five special message cards", description: "Each card contains a little piece of my heart.", kind: "cards" }
    ], gate: { type: "code", code: "STRAWBERRY", hint: "Send a pic of your breakfast to the Birthday Committee. Then await for the next code." } },
    { id: 5, title: "A Gift Chosen With Care", subtitle: "A thoughtful little surprise.", tasks: [
      { id: "gift", title: "Open your special gift bag", description: "These natural goodies were chosen with you in mind. What's funny is that you wanted to smell the products I got for Victor's fiancee; not realizing I ALREADY got some for you! 😄. I hope you like them. 🎁" },
      { id: "cake", title: "Enjoy your homemade vegan cake", description: "Something sweet was made especially for you for this day. Hope you like it! 🎂" },
      { id: "videocall", title: "Have a video call with your boyfriend", description: "For one, I would like to see your beautiful face. And also, I would like to share the moment of your birthday with you. 💙" }
    ], gate: { type: "quiz", question: "What's the secret ingredient that made your cake extra special?", answers: ["An emergency bakery run", "A whole lot of love 💙", "Organic Sugar", "October 29th"], correct: 1, success: "Exactly! Made with soooooooo much love. 💙" } },
    { id: 6, title: "An Evening Together", subtitle: "One more memory to make.", tasks: [
      { id: "anotherselfie", title: "Take a selfie of you in your dress", description: "Hey! You're not the only one that gets to enjoy your birthday. The Birthday Committee is here to make sure you have a memorable day.... AND your boyfriend wants to see your gorgeous self. 💙" },
      { id: "selfietogether", title: "Take a selfie together with your boyfriend", description: "Umm... this is for the Birthday Committee for documentation purposes. 😄" },
      { id: "dinner", title: "Enjoy our evening together", description: "Tonight, we celebrate making another memory over a delicious plant-based dinner. 💙" }
    ], gate: { type: "quiz", question: "Have you enjoyed today?", answers: ["Yes", "Yes, of course", "Absolutely, I don't want you to leave because you are the awesomest"], correct: 2, success: "Aww!!!! I feel the same way! I am filled with so much emotions because I get to spend your birthday with you. 💙" } },
    { id: 7, title: "The Birthday Finale", subtitle: "This day is worth remembering.", tasks: [
      { id: "final-letter", title: "Read my final message of the day to you", description: "Happy birthday, my sweet and beautiful Renee. I hope you enjoyed your day today. I'm not the most creative. But everything came from my heart. I'm really thankful for who you are and for the opportunity to share this journey with you. My heart beats even more because you are the love of my life. I love you with every part of me. My prayer is that year 34 of your life is filled with more of God's blessings and that you continue to thrive in His love. I don't want you to change except for the better in Christ. Thank you for being you. 💙" }
    ] }
  ],
  cards: [
    { title: "The Woman I See", text: "When I look at you, I see more than outward beauty. I see your character, your heart, and the beautiful person you are. I see someone that my heart doesn't get tired of having deep feelings for. Someone that my mind isn't tired of thinking about. Someone I am happy to be with. Someone that my eyes enjoys looking at (because of course I just love the outward beauty too. I mean come on! Have you seen yourself in the mirror!)" },
    { title: "The Things I Appreciate", text: "Your smile, our conversations, the way you keep me involved in your daily life, your meaningful hugs, and the thoughtful gestures you give--like when you think of me as you cook/bake something." },
    { title: "What You Mean to Me", text: "I'm grateful for the opportunity to know you, spend time with you, learn from you, and share meaningful moments together. You bring extra sunshine to my life. You add peace instead of issues to my life. You are a true blessing." },
    { title: "Our Courtship", text: "Had I not been in a relationship with you, I wonder how I would have ever experienced the depth of connection we share together. I have chosen to love you each day and I don't regret loving you. I am happy to spend your 33rd year on this earth together with you. I am looking forward to see what is in store for us on your 34th year." },
    { title: "My Prayer for You", text: "I pray that God continues to guide you, strengthen you, give you the desires of your heart, and fill your days with joy, wisdom, and peace. I pray I get to see and spend some more of your birthdays while being by your side." }
  ]
};
