export interface Review {
  id: string
  name: string
  date: string
  rating: number
  text: string
}

export const REVIEWS: Record<number, Review[]> = {
  1: [
    { id: 'r1-1', name: 'Sarah K.', date: 'Mar 2024', rating: 5, text: 'Changed the way I think about regret. I finished it in one sitting and cried twice.' },
    { id: 'r1-2', name: 'James R.', date: 'Jan 2024', rating: 4, text: 'The premise is simple but the execution is surprisingly profound. A book that stays with you.' },
    { id: 'r1-3', name: 'Priya M.', date: 'Feb 2024', rating: 5, text: 'A book I wish I could recommend to everyone going through a hard time. Gentle and powerful.' },
  ],
  2: [
    { id: 'r2-1', name: 'Alex T.', date: 'Dec 2023', rating: 5, text: 'The most ambitious history book I have ever read. Harari makes you question everything.' },
    { id: 'r2-2', name: 'Nina W.', date: 'Nov 2023', rating: 4, text: 'Dense at times but incredibly rewarding. Completely reshapes your view of human civilisation.' },
    { id: 'r2-3', name: 'Damien L.', date: 'Jan 2024', rating: 5, text: 'I gave this to my entire family. No other book has sparked as many dinner conversations.' },
  ],
  3: [
    { id: 'r3-1', name: 'Marco F.', date: 'Feb 2024', rating: 5, text: 'The worldbuilding is unmatched. I have read it four times and find new layers every time.' },
    { id: 'r3-2', name: 'Leila S.', date: 'Mar 2024', rating: 5, text: 'Frank Herbert created an entire living universe. Nothing in science fiction comes close.' },
    { id: 'r3-3', name: 'Tom H.', date: 'Dec 2023', rating: 4, text: 'Long and demanding, but the pay-off is worth every page. A genuine masterpiece.' },
  ],
  4: [
    { id: 'r4-1', name: 'Rina P.', date: 'Apr 2024', rating: 5, text: 'The 1% rule genuinely changed how I approach daily work. Read this before any productivity book.' },
    { id: 'r4-2', name: 'Carlos G.', date: 'Feb 2024', rating: 4, text: "Clear's writing is clear — no pun intended. Practical, evidence-based, immediately actionable." },
    { id: 'r4-3', name: 'Yuki T.', date: 'Mar 2024', rating: 5, text: 'I implemented the habit stacking method from chapter five and my mornings are unrecognisable.' },
  ],
  5: [
    { id: 'r5-1', name: 'Elena V.', date: 'Jan 2024', rating: 5, text: 'The Republic should be required reading for anyone who wants to understand justice and power.' },
    { id: 'r5-2', name: 'Oliver B.', date: 'Mar 2024', rating: 4, text: 'Challenging but worth it. Reading Socrates argue in real-time feels surprisingly modern.' },
  ],
  6: [
    { id: 'r6-1', name: 'Maya C.', date: 'Feb 2024', rating: 5, text: 'Kahneman dismantles the myth of rational thinking with surgical precision. Humbling and fascinating.' },
    { id: 'r6-2', name: 'Ben A.', date: 'Jan 2024', rating: 5, text: 'I now catch myself in cognitive biases I never knew I had. Changed how I make every decision.' },
    { id: 'r6-3', name: 'Fatima H.', date: 'Dec 2023', rating: 4, text: 'Dense in places but the insights are worth the effort. A landmark work.' },
  ],
  7: [
    { id: 'r7-1', name: 'Raj M.', date: 'Mar 2024', rating: 5, text: "Thiel's contrarian thinking will make you uncomfortable and then change how you see business." },
    { id: 'r7-2', name: 'Clara D.', date: 'Feb 2024', rating: 4, text: 'Short, punchy, and full of genuine insights. Not just for startup founders.' },
  ],
  8: [
    { id: 'r8-1', name: 'Sophie R.', date: 'Apr 2024', rating: 5, text: "Rothfuss writes prose like music. I don't want to finish it because I don't want it to end." },
    { id: 'r8-2', name: 'Kai N.', date: 'Mar 2024', rating: 5, text: 'The best fantasy novel I have ever read, and I have read hundreds. Kvothe is unforgettable.' },
    { id: 'r8-3', name: 'Amara J.', date: 'Jan 2024', rating: 4, text: 'The frame narrative is clever and the world-building is intricate. Deserves every award.' },
  ],
  9: [
    { id: 'r9-1', name: 'Chris P.', date: 'Apr 2024', rating: 5, text: "The best thing Weir has written. I stayed up until 3am. The science feels real, the emotion is realer." },
    { id: 'r9-2', name: 'Isabelle F.', date: 'Mar 2024', rating: 5, text: "Rocky is one of the most charming characters in all of fiction. I sobbed at the ending. Twice." },
    { id: 'r9-3', name: 'David K.', date: 'Feb 2024', rating: 5, text: 'Pure joy from beginning to end. Science fiction at its absolute best.' },
  ],
  10: [
    { id: 'r10-1', name: 'Anna L.', date: 'Jan 2024', rating: 5, text: 'Two thousand years old and every sentence still lands. Marcus Aurelius is the Stoic you need.' },
    { id: 'r10-2', name: 'Felix S.', date: 'Mar 2024', rating: 5, text: "The most personally useful book I own. I read a page every morning. It's better than therapy." },
  ],
  11: [
    { id: 'r11-1', name: 'Nadia R.', date: 'Feb 2024', rating: 4, text: "Tolle's message is simple: be here now. Harder than it sounds. This book helped me get there." },
    { id: 'r11-2', name: 'Sam B.', date: 'Mar 2024', rating: 4, text: 'Spiritual without being religious. A genuine guide to finding peace in the present moment.' },
  ],
  12: [
    { id: 'r12-1', name: 'Leo T.', date: 'Dec 2023', rating: 5, text: 'Hawking explains the universe as if he is having a conversation with you over coffee. Brilliant.' },
    { id: 'r12-2', name: 'Mia Z.', date: 'Feb 2024', rating: 4, text: 'Some sections are hard going but the wonder Hawking conveys is infectious. Inspired me to study physics.' },
  ],
  13: [
    { id: 'r13-1', name: 'Lucas M.', date: 'Jan 2024', rating: 5, text: 'Voss turned FBI negotiation tactics into life skills. My salary negotiations have never been better.' },
    { id: 'r13-2', name: 'Hannah G.', date: 'Mar 2024', rating: 5, text: 'The tactical empathy concept alone is worth the price. Compulsively readable.' },
  ],
  14: [
    { id: 'r14-1', name: 'Rena O.', date: 'Feb 2024', rating: 5, text: "Frankl's account is devastating and yet ultimately hopeful. One of the most important books ever written." },
    { id: 'r14-2', name: 'Peter V.', date: 'Jan 2024', rating: 5, text: 'Short enough to read in one sitting. Profound enough to take a lifetime to understand.' },
  ],
  27: [
    { id: 'r27-1', name: 'Theo C.', date: 'Mar 2024', rating: 5, text: "Fitzgerald's prose is flawless. The green light at the end of Daisy's dock still haunts me." },
    { id: 'r27-2', name: 'Grace A.', date: 'Jan 2024', rating: 4, text: 'Short but loaded. Every sentence earns its place. The definitive American novel.' },
  ],
}

export function getReviews(bookId: number): Review[] {
  return REVIEWS[bookId] ?? []
}

export function getAverageRating(bookId: number): number | null {
  const reviews = REVIEWS[bookId]
  if (!reviews || reviews.length === 0) return null
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
}
