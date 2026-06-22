export interface Sample {
  bookId: number
  chapterTitle: string
  readingTime: number // minutes
  content: string // markdown-ish paragraphs separated by \n\n
}

export const SAMPLES: Record<number, Sample> = {
  1: {
    bookId: 1,
    chapterTitle: 'Chapter One — The Impossibility of a Quiet Life',
    readingTime: 8,
    content: `The night before Nora Seed ended her life, she discovered something about the nature of regret.

It was a Tuesday, which felt appropriate — Tuesdays are the most forgettable day of the week, the day that contains the least ambition, the least dread. Mondays have weight. Fridays carry hope. But Tuesday is merely the space between, and it was in that space that Nora had been living for some time.

She sat in her flat in Bedford — a flat that felt simultaneously too large and too small, full of the wrong furniture and the ghost of decisions she'd stopped believing in — and she made a list. Not a suicide note. Lists had always steadied her, the way a tightrope walker uses a pole: not for movement, but for balance.

On the left side: what she had. On the right side: what she had wanted, once, before the wanting stopped.

The list on the left was very short.

---

The library, when she found it, was not what she expected. She had imagined the afterlife — if that was even the right word for it — as something vast and featureless, like a motorway at night. Instead she found books. Shelves that stretched in every direction, rows that vanished into a soft greenish light, the whole place smelling of old paper and possibility.

"You are between lives," said Mrs Elm, who had been Nora's school librarian and who was now, apparently, the curator of everything she had not done. "Each book here is a life you could have lived, given different choices."

Nora ran her finger along a spine. The leather was warm.

"What if I choose wrong again?"

Mrs Elm smiled the smile of someone who has heard that question ten thousand times and still believes it is worth answering. "There is no wrong. There is only the door you haven't opened yet."

Nora pulled the book from the shelf. It was heavier than it looked — they always are, the books that matter.`,
  },

  2: {
    bookId: 2,
    chapterTitle: 'Part One — The Cognitive Revolution',
    readingTime: 10,
    content: `About 13.5 billion years ago, matter, energy, time and space came into being in what is known as the Big Bang. The story of these fundamental features of our universe is called physics.

About 300,000 years after their appearance, matter and energy started to coalesce into complex structures, called atoms, which then combined into molecules. The story of atoms, molecules and their interactions is called chemistry.

About 3.8 billion years ago, on a planet called Earth, certain molecules combined to form particularly large and intricate structures called organisms. The story of organisms is called biology.

About 70,000 years ago, organisms belonging to the species Homo sapiens started to form even more elaborate structures called cultures. The subsequent development of these human cultures is called history.

---

The most important thing to know about the cognitive revolution is that it made Sapiens the most dangerous animal on Earth, and also the most confused.

For most of our evolutionary history we were a forgettable species — somewhere in the middle of the food chain, no more significant than gorillas or jellyfish. Then, about 70,000 years ago, something happened in Homo sapiens' brain that we still don't fully understand. We began to think in entirely new ways, and to communicate using an entirely new type of language. We call it the Cognitive Revolution.

What made it revolutionary was this: it allowed us to talk about things that don't exist at all.

You can never convince a chimpanzee to give you a banana by promising him limitless bananas after death. But you can absolutely convince a human to build a cathedral, die in battle, or pay taxes, using precisely that kind of story.

The secret of Sapiens' success is not our ability to use tools. It is our ability to believe in fictions — in gods, nations, money, human rights, corporations — and to convince millions of others to believe in the same fictions at the same time.`,
  },

  3: {
    bookId: 3,
    chapterTitle: 'Book One — Dune — Chapter I',
    readingTime: 9,
    content: `In the year 10,191, the known universe is ruled by the Padishah Emperor Shaddam Corrino IV, seated on the Golden Lion Throne of Kaitain. The empire is sustained by one substance above all others: the spice melange, found only on the desert planet Arrakis — known to its native people, the Fremen, simply as Dune.

The spice extends life. The spice expands consciousness. The spice is the most valuable substance in the known universe.

Paul Atreides, fifteen years old and heir to House Atreides, stands in a stone corridor in Castle Caladan and feels the future pressing against the present like water against a dam. His training under Duncan Idaho — swordmaster, ghola, loyal friend — has given him reflexes that border on prescience. His lessons with the Mentat Thufir Hawat have given him analytical capabilities that border on computational.

But it is his mother's training that frightens him.

Lady Jessica, his mother, is a Bene Gesserit — one of the great sisterhood whose subtle ways of voice and gesture can move emperors and topple dynasties. She has given Paul gifts that no fifteen-year-old should carry: the Weirding Way, the Voice, and an education in the genetic memory of ten thousand generations.

He knows, as few others do, that the universe is about to change.

---

"Tell me of your homeworld, Usul," said Stilgar, first naib of Sietch Tabr, many months later.

It was not the question Paul had expected. He had expected challenges, tests of skill, demands for proof that he was who the Fremen legends said he was. He had expected ceremony, ritual, the machinery of prophecy.

He had not expected a man who looked at him with eyes entirely blue — the blue of spice addiction, of desert water discipline — and asked a question that sounded almost like longing.

"My homeworld," Paul said, "was green."

Stilgar was quiet for a long time. Around them the sietch breathed, the rock walls warm from the sun stored all day in the stone.

"Green," he said at last. "Like the visions."

Paul looked at the man who would become, in ways he could not yet name, the closest thing he had to a father. He felt the familiar pull of the future: a golden path, a sandworm beneath him, and the cry of ten thousand Fremen voices.

He did not know yet whether that future was salvation or catastrophe.

He was beginning to suspect it was both.`,
  },

  4: {
    bookId: 4,
    chapterTitle: 'Chapter One — The Surprising Power of Atomic Habits',
    readingTime: 7,
    content: `In 2003, the British Cycling team was in crisis. The team had endured almost a century of mediocrity. British cyclists had never won the Tour de France. In 110 years of competition, they had won a single Olympic gold medal. Manufacturers of professional cycling equipment refused to sell their bikes to British teams, fearing that being associated with such persistent losers would be bad for their reputation.

Then the federation hired Dave Brailsford as its new performance director.

Brailsford's approach was simple. He called it "the aggregation of marginal gains." The idea was to search for a tiny margin of improvement in everything you do. If you broke down everything you could think of that goes into riding a bike, and then improved each thing by just 1 percent, you would get a significant increase when you put them all together.

The changes were embarrassingly small. The team switched to a lighter, thinner racing seat. They rubbed alcohol on the tyres for a better grip. They asked riders to wear electrically heated shorts to maintain ideal muscle temperature. They tested different types of massage gel to see which one led to the fastest recovery. They hired a surgeon to teach each rider the most effective way to wash their hands to reduce the chances of catching a cold.

---

The fate of British Cycling changed because of 1% improvements. Within five years of Brailsford's arrival, the team won sixty percent of the gold medals available at the 2008 Olympic Games. The following year they set seven world records. From 2012 onward, they dominated for a decade.

The same principle holds in your own life.

Habits are the compound interest of self-improvement. The same way that money multiplies through compound interest, the effects of your habits multiply as you repeat them. You won't notice much difference on any given day and yet the impact over months and years can be enormous. A 1% improvement every day for a year doesn't get you 365% better — it makes you 37 times better.

The challenge is that the math works in reverse too. A 1% decline every day compounds into something catastrophic.

The real question is not whether good habits or bad habits are more powerful. The question is whether you understand the system that creates them — and whether you're willing to redesign it.`,
  },

  9: {
    bookId: 9,
    chapterTitle: 'Chapter One',
    readingTime: 8,
    content: `I wake up.

I don't know where I am. I don't know who I am.

I'm confused by the ceiling. It's metal. The walls are metal. There is a faint hum that suggests I am inside something mechanical, something that draws power from somewhere and uses it to stay alive, the same way I am apparently doing.

I become aware of the smell: antiseptic, recycled air, that particular staleness of a place that has been sealed for a long time. I also become aware of pain — a general ache behind my eyes, a stiffness in my joints that suggests I have been horizontal for longer than is comfortable.

There are two objects attached to my arm. Tubes. I follow them upward to bags of clear liquid.

I am in an infirmary. Of some kind. Aboard something that moves — I can feel it, a faint vibration through the bed frame, through the floor. We are traveling.

---

After an hour — maybe two; time is strange when you have nothing to reference it against — I remember three things.

The first is my name. Ryland Grace.

The second is mathematics. I know that 8.7 multiplied by the speed of light is approximately 2.6 billion metres per second. I know how to calculate orbital decay. I know the chemical composition of the sun.

The third thing I remember is the Petrova line.

I don't know what that means yet. But it comes with a feeling I don't want: urgency, the compressed awareness of someone who has run out of time and knows it.

I look around the infirmary. There are two other beds. Both are occupied. Both occupants are motionless, connected to the same kind of tubes I am.

Neither of them is breathing.

I am alone on whatever this is. I am alone in whatever I am meant to be doing.

I try to remember why that is. I try very hard.

The ceiling hums.

Outside one of the ports, there is no Earth. There is no Moon. There is a star I don't recognise, larger and brighter than it should be.

I am a very long way from home.`,
  },

  10: {
    bookId: 10,
    chapterTitle: 'Book Two — Meditations — On the Self',
    readingTime: 6,
    content: `Begin the morning by saying to yourself: I shall meet with the busy, the meddling, the ungrateful, the arrogant, the deceitful, the envious. All of this is theirs because they have no knowledge of good and evil.

But I, who have seen the nature of the good that is beautiful, and of the bad that is ugly, and the nature of the wrongdoer — who is of the same kind as myself, not only in blood or seed, but sharing in the same intelligence and the same portion of the divine — I cannot be injured by any of them. For no one can fix upon me what is ugly.

---

Of time, only the present moment is ours. The past is gone. The future has not arrived. All that exists is now.

And now is enough.

I have often marvelled at this: how every person loves himself above all others, and yet sets less value on his own opinion of himself than on the opinions of everyone else. For if some god or wise teacher were to tell a man everything that he thought and said in private, he could not endure it for a single day. And yet we are more attentive to what our neighbours think of us than to what we think of ourselves.

---

Loss is nothing else but change, and change is nature's delight.

Everything you see will soon have perished and those who saw it perish will in turn perish, and he who outlived them will perish in his turn.

But the universe remains. The empire remains. And the present moment — this one, right now, while you read this — remains the only thing that ever belonged to you.

Use it well.

Do not live as though you had ten thousand years. Death hangs over you. While you have it, while you still can, make yourself good.

This is the entire lesson. Everything else is commentary.`,
  },

  14: {
    bookId: 14,
    chapterTitle: 'Preface — Experiences in a Concentration Camp',
    readingTime: 7,
    content: `In attempting to deal with this subject, I must warn the reader that this story is not concerned with the great horrors, which have already been described often enough — though perhaps not always comprehensibly — but with the multitude of small torments. In other words, I shall try to answer this question: How was everyday life in a concentration camp reflected in the mind of the average prisoner?

Most of the events described here did not take place in the large and famous camps, but in the small ones where the real grinding work was done. Nor is this a book about the great suffering of the great people. It is a book about the very small ones — the kind of suffering that goes unremarked because it happens to ordinary people in ordinary ways.

---

I do not know what triggered the thought. Perhaps it was the cold. Perhaps it was exhaustion.

We were marching from the camp to a work site in the predawn darkness, and I stumbled, and the guard yelled, and I felt the familiar convulsion of fear that had become my most reliable companion. And then, without warning, without any preparation — as if someone had simply changed the channel on the radio — I was thinking about my wife.

I had no idea whether she was alive. I would not know for months. But in that moment, on that frozen road, she was more present to me than anything else in the universe. More real than the cold, more immediate than the fear.

I understood something in that moment that I have never been able to unsay: that love is the ultimate and highest goal to which man can aspire. Even if he has nothing left, even if there is nothing left to give — the salvation of man is through love and in love.

A thought transfixed me: for the first time in my life I saw the truth as it is set into song by so many poets, proclaimed as the final wisdom by so many thinkers. The truth — that love is the ultimate and highest goal to which man can aspire.

The guard yelled again. I kept walking.

I was the richest man on the road.`,
  },

  27: {
    bookId: 27,
    chapterTitle: 'Chapter One',
    readingTime: 5,
    content: `In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.

"Whenever you feel like criticising anyone," he told me, "just remember that all the people in this world haven't had the advantages that you've had."

He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgements, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores.

---

The one on my right was a factual imitation of some Hotel de Ville in Normandy, with a tower on one side, spanking new under a thin beard of raw ivy, and a marble swimming pool and more than forty acres of lawn and garden. It was Gatsby's mansion.

I hadn't met Jay Gatsby yet. I was simply aware of him as someone who gave large parties. The parties were famous — enormous parties, as I gathered from the gossip of the women who had been there — where men and girls came and went like moths among the whisperings and the champagne and the stars.

There was music from my neighbor's house through the summer nights. In his blue gardens men and girls came and went like moths among the whisperings and the champagne and the stars.

I believed it was his green light that I saw first: that small green light at the end of Daisy's dock, the solitary gleam across the water, blinking.

I didn't know yet what it meant, that light. I only know that he reached for it with such extraordinary belief — such absolute certainty that if he stretched his hand far enough, he would touch it — that it seemed wrong to tell him it was just a lamp.

Some things should be left as promises.`,
  },
}

export function getSample(bookId: number): Sample | null {
  return SAMPLES[bookId] ?? null
}
